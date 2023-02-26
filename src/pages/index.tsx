import { type NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { api } from "../utils/api"

const Home: NextPage = () => {
    const { ref, inView } = useInView()

    const {
        data: pokemonResponse,
        fetchNextPage: fetchMorePokemon,
        status,
        isFetchingNextPage,
    } = api.pokemon.list.useInfiniteQuery(
        {
            limit: 50,
        },
        {
            getNextPageParam: (query) => query.nextCursor,
        }
    )

    // fetch more pokemon if we reached the bottom of the list
    useEffect(() => {
        if (inView) {
            void fetchMorePokemon()
        }
    }, [fetchMorePokemon, inView])

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

                {status === "loading" ? (
                    <p>Loading...</p>
                ) : status === "error" ? (
                    <span>Error</span>
                ) : (
                    <>
                        <div className="flex flex-col gap-4 ">
                            {pokemonResponse.pages.map((page) => (
                                <Fragment key={page.nextCursor}>
                                    {page.entries.map((pokemon) => (
                                        <Link
                                            href={`/pokemon/${pokemon.id}`}
                                            key={pokemon.id}
                                        >
                                            <Image
                                                src={pokemon.artworkURL}
                                                width={50}
                                                height={50}
                                                alt={pokemon.name}
                                            />
                                            {pokemon.name}
                                        </Link>
                                    ))}
                                </Fragment>
                            ))}
                        </div>
                    </>
                )}
                <div ref={ref} id="page-bottom-indicator" />
                <div className={isFetchingNextPage ? "" : "hidden"}>
                    Loading...
                </div>
            </main>
        </>
    )
}

export default Home
