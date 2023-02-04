import { z } from "zod"
import { pokemonSchema } from "../../../schema/pokemon"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const pokemonRouter = createTRPCRouter({
    list: protectedProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.pokemon.findMany()
        return data
    }),

    findOne: protectedProcedure
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

    create: protectedProcedure
        .input(pokemonSchema)
        .mutation(async ({ ctx, input }) => {
            const pokemon = await ctx.prisma.pokemon.create({
                data: {
                    ...input,
                    name: input.name.trim().toLowerCase(),
                },
            })

            return pokemon
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const pokemon = await ctx.prisma.pokemon.delete({
                where: {
                    id: input.id,
                },
            })
            return {
                success: true,
                pokemon,
            }
        }),

    update: protectedProcedure
        .input(z.object({ id: z.string(), data: pokemonSchema.partial() }))
        .mutation(async ({ ctx, input }) => {
            const pokemon = await ctx.prisma.pokemon.update({
                where: {
                    id: input.id,
                },
                data: input.data,
            })
            return {
                success: true,
                pokemon,
            }
        }),
})
