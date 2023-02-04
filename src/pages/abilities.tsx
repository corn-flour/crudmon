import Head from "next/head"
import Link from "next/link"
import { api } from "../utils/api"

const AbilitiesPage = () => {
    const { data: abilities } = api.abilities.list.useQuery()

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
                <h1 className="text-4xl font-bold">Abilities List</h1>
                <Link
                    href="/abilities/new"
                    className="inline-block rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-800"
                >
                    Add Ability
                </Link>
                <div className="grid grid-cols-4 gap-4">
                    {!!abilities?.length &&
                        abilities.map((ability) => (
                            <Link
                                href={`/abilities/${ability.id}`}
                                key={ability.id}
                                className="rounded-lg bg-slate-100 py-4 px-4 text-center font-semibold transition-all hover:-translate-y-2"
                            >
                                {ability.name}
                            </Link>
                        ))}
                </div>

                {!!abilities && !abilities.length && (
                    <div>No ability in the list</div>
                )}
            </main>
        </>
    )
}

export default AbilitiesPage
