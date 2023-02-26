import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"

import { api } from "../utils/api"

const Home: NextPage = () => {
    const { data: pokemons } = api.pokemon.list.useQuery()

    return (
        <>
            <Head>
                <title>Crudmon</title>
                <meta
                    name="description"
                    content="Sample CRUD app with pokemon"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mx-auto my-16 space-y-8 text-slate-700">
                <h1 className="text-4xl font-bold">Pokemon List</h1>
                <Link
                    href="/pokemon/new"
                    className="inline-block rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-800"
                >
                    Add Pokemon
                </Link>
                <div className="grid grid-cols-4 gap-4">
                    {!!pokemons?.length &&
                        pokemons.map((pokemon) => (
                            <Link
                                href={`/pokemon/${pokemon.id}`}
                                key={pokemon.id}
                                className="rounded-lg bg-slate-100 py-4 px-4 text-center font-semibold transition-all hover:-translate-y-2"
                            >
                                {pokemon.name}
                            </Link>
                        ))}
                </div>

                {!!pokemons && !pokemons.length && (
                    <div>No pokemon in the list</div>
                )}
            </main>
        </>
    )
}

export default Home
