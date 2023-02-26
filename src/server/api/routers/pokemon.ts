import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const pokemonRouter = createTRPCRouter({
    list: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.pokemon.findMany()
        return data
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
