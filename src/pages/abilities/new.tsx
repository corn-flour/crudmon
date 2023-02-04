import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import TextInput from "../../components/text-input"
import { api } from "../../utils/api"

const abilitySchema = z.object({
    name: z.string(),
    description: z.string(),
})

type Ability = z.infer<typeof abilitySchema>

const AddAbility = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Ability>({
        resolver: zodResolver(abilitySchema),
    })

    const router = useRouter()
    const { mutate } = api.abilities.create.useMutation({
        onSuccess: () => router.push("/abilities"),
    })

    const onSubmit: SubmitHandler<Ability> = (data) => {
        return mutate(data)
    }

    return (
        <>
            <main className="container mx-auto mt-16 text-slate-700">
                <Link href="/">Back</Link>
                <h1 className="mb-16 text-center text-4xl">Add Ability</h1>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextInput
                        label="Name"
                        {...register("name")}
                        required
                        errorMessage={errors?.name?.message}
                    />

                    <TextInput
                        label="Description"
                        {...register("description")}
                        required
                        errorMessage={errors?.description?.message}
                    />
                    <button
                        type="submit"
                        className="self-center rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </main>
        </>
    )
}

export default AddAbility
