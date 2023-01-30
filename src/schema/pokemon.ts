import { z } from "zod"

export const pokemonSchema = z.object({
    name: z.string(),
    ability: z.string(),
    typeOne: z.string(),
    typeTwo: z.string().optional(),
})

export type Pokemon = z.infer<typeof pokemonSchema>
