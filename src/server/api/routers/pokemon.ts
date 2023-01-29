import { z } from "zod"
import { pokemonSchema } from "../../../schema/pokemon"
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
      })
    }),

  create: publicProcedure
    .input(pokemonSchema)
    .mutation(async ({ ctx, input }) => {
      const pokemon = await ctx.prisma.pokemon.create({
        data: input,
      })

      return pokemon
    }),
})
