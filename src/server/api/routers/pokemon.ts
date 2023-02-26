import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

const POKE_API = "https://pokeapi.co/api/v2"
const OFFICIAL_ART_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

// zod schema for pokemon list pokeAPI response
const pokemonListApiSchema = z.object({
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z
        .object({
            name: z.string(),
            url: z.string(),
        })
        .transform(({ name, url }) => {
            // get the pokemon ID from its URL
            const splitted = url.split("/")

            // id is the last segment of the URL, length -2 because the URL ends in "/"
            // TODO: can this ever be wrong?
            const id = splitted[splitted.length - 2] ?? ""
            const artworkURL = `${OFFICIAL_ART_URL}/${id}.png`
            return {
                id,
                name,
                url,
                artworkURL,
            }
        })
        .array(),
})

export const pokemonRouter = createTRPCRouter({
    list: publicProcedure
        .input(
            z.object({
                limit: z.number(),
                // cursor is the "next" prop from previous api response
                cursor: z.string().nullish(),
            })
        )
        .query(async ({ input }) => {
            try {
                const { cursor: nextURL, limit } = input

                // if cursor is not set, then this is the first
                const fetchURL = nextURL
                    ? nextURL
                    : `${POKE_API}/pokemon?limit=${limit.toString()}`

                const response = await fetch(fetchURL)
                const data = pokemonListApiSchema.parse(await response.json())

                return {
                    entries: data.results,
                    nextCursor: data.next,
                }
            } catch (e) {
                //
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
            }
        }),

    findOne: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            return ctx.prisma.pokemon.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    abilityOne: true,
                    abilityTwo: true,
                    hiddenAbility: true,
                },
            })
        }),
})
