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
      })
    }),

  create: protectedProcedure
    .input(pokemonSchema)
    .mutation(async ({ ctx, input }) => {
      const pokemon = await ctx.prisma.pokemon.create({
        data: input,
      })

      return pokemon
    }),
})
