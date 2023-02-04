import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const abilityRouter = createTRPCRouter({
    list: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.ability.findMany()
    }),

    findOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) =>
            ctx.prisma.ability.findUnique({
                where: {
                    id: input.id,
                },
            })
        ),

    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const result = await ctx.prisma.ability.create({
                data: {
                    name: input.name.trim().toLowerCase(),
                    description: input.description,
                },
            })
            return {
                success: true,
                data: result,
            }
        }),
})
