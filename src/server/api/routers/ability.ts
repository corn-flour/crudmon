import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const abilityRouter = createTRPCRouter({
    list: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.ability.findMany()
    }),

    findOne: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) =>
            ctx.prisma.ability.findUnique({
                where: {
                    id: input.id,
                },
            })
        ),
})
