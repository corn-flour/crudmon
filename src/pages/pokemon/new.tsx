import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Pokemon, pokemonSchema } from "../../schema/pokemon"
import { api } from "../../utils/api"
import { useRouter } from "next/router"
import Link from "next/link"

const AddPokemon = () => {
  const { register, handleSubmit } = useForm<Pokemon>({
    resolver: zodResolver(pokemonSchema),
  })

  const router = useRouter()

  const mutation = api.pokemon.create.useMutation({
    onSuccess: () => router.push("/"),
  })

  const onSubmit: SubmitHandler<Pokemon> = (data) => {
    console.log("submitting", data)
    return mutation.mutate(data)
  }

  return (
    <>
      <main className="container mx-auto mt-16 text-slate-700">
        <Link href="/">Back</Link>
        <h1 className="mb-16 text-center text-4xl">Add Pokemon</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="gap2 flex flex-col">
            <span>Name</span>
            <input
              {...register("name")}
              required
              className="rounded bg-slate-200 py-2 px-4"
            />
          </label>
          <label className="gap2 flex flex-col">
            <span>Ability</span>
            <input
              {...register("ability")}
              required
              className="rounded bg-slate-200 py-2 px-4"
            />
          </label>
          <label className="gap2 flex flex-col">
            <span>Type 1</span>
            <input
              {...register("typeOne")}
              required
              className="rounded bg-slate-200 py-2 px-4"
            />
          </label>

          <label className="gap2 flex flex-col">
            <span>Type 2</span>
            <input
              {...register("typeTwo")}
              className="rounded bg-slate-200 py-2 px-4"
            />
          </label>

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

export default AddPokemon
