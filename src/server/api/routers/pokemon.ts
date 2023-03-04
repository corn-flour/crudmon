import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { pokemonTypes } from "../../../utils/consts"
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

const statNames = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
] as const

const pokemonEntrySchema = z.object({
    id: z.number(),
    name: z.string(),
    types: z
        .object({
            slot: z.number(),
            type: z.object({
                name: z.enum(pokemonTypes),
                url: z.string(),
            }),
        })
        .array(),
    weight: z.number().transform((weight) => weight / 10), // convert from hectogram to kilogram
    height: z.number().transform((height) => height / 10), // convert from decimeter to meter
    stats: z
        .object({
            base_stat: z.number(),
            effort: z.number(),
            stat: z.object({
                name: z.enum(statNames),
                url: z.string(),
            }),
        })
        .array()
        .transform((stats) => {
            const obj = stats.reduce(
                (prev, cur) => {
                    return {
                        ...prev,
                        [cur.stat.name]: {
                            value: cur.base_stat,
                            ev: cur.effort,
                        },
                    }
                },
                {} as {
                    [k in (typeof statNames)[number]]: {
                        value: number
                        ev: number
                    }
                }
            )
            return obj
        }),
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
        .query(async ({ input }) => {
            try {
                const response = await fetch(`${POKE_API}/pokemon/${input.id}`)
                const pokemon = pokemonEntrySchema.parse(await response.json())
                return {
                    ...pokemon,
                    artworkURL: `${OFFICIAL_ART_URL}/${input.id}.png`,
                }
            } catch (e) {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
            }
        }),
})
