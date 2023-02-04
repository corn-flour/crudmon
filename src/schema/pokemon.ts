import { z } from "zod"

export const pokemonSchema = z.object({
    name: z.string(),
    abilityOneId: z.string().min(1),
    abilityTwoId: z.string().optional(),
    hiddenAbilityId: z.string().optional(),
    typeOne: z.string(),
    typeTwo: z.string().optional(),
})

export type Pokemon = z.infer<typeof pokemonSchema>
