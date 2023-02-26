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

            <main className="space-y-8 bg-[url(/wood-bg.jpeg)]">
                <h1 className="pt-16 text-center text-4xl font-bold uppercase tracking-widest text-white">
                    Pokedex
                </h1>

                {status === "loading" ? (
                    <p>Loading...</p>
                ) : status === "error" ? (
                    <span>Error</span>
                ) : (
                    <>
                        <div
                            className="mx-auto flex w-[95%] max-w-6xl flex-wrap justify-center gap-[10rem_1rem]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(transparent, transparent 300px, white 300px, white 302px, #dddddd 304px, #dddddd 332px, #00000080 332px, transparent 400px)",
                                backgroundRepeat: "repeat",
                                backgroundSize: "100% 460px",
                            }}
                        >
                            {pokemonResponse.pages.map((page) => (
                                <Fragment key={page.nextCursor}>
                                    {page.entries.map((pokemon) => (
                                        <PokemonCard
                                            {...pokemon}
                                            key={pokemon.id}
                                        />
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

const PokemonCard = ({
    artworkURL,
    id,
    name,
}: {
    artworkURL: string
    id: string
    name: string
}) => {
    return (
        <Link href={`/pokemon/${id}`} className="group relative">
            <div
                className="relative flex h-[300px] w-[250px] flex-col items-center justify-end overflow-hidden bg-purple-900"
                style={{
                    boxShadow: "12px 0 12px -8px #000000dd",
                }}
            >
                <div className="absolute top-1/2 aspect-square w-[95%] -translate-y-1/2">
                    <Image
                        src="/pokeball.png"
                        fill
                        alt=""
                        className="object-contain"
                        style={{
                            filter: "invert(14%) sepia(76%) saturate(4613%) hue-rotate(271deg) brightness(79%) contrast(91%)",
                        }}
                    />
                </div>
                <div className="relative h-4/5 w-full">
                    <Image
                        src={artworkURL}
                        fill
                        alt={name}
                        className="object-cover"
                    />
                </div>
                <div className="absolute top-5 left-4 -right-2 bottom-5 rounded-bl-3xl border-2 border-[#B6E12A] border-r-transparent p-2 text-[#B6E12A]">
                    <p className="font-mono text-2xl font-bold capitalize tracking-wider">
                        {name}
                    </p>
                    <p className="font-mono text-xl font-bold">{id}</p>
                </div>
            </div>
        </Link>
    )
}

// TODO:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TriangleCaret = ({ className }: { className?: string }) => {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={64}
            height={64}
            className={className}
        >
            <defs>
                <linearGradient id="fill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop
                        offset="0%"
                        style={{
                            stopColor: "#E7F426",
                            stopOpacity: 1,
                        }}
                    />
                    <stop
                        offset="100%"
                        style={{
                            stopColor: "#31A9A5",
                            stopOpacity: 1,
                        }}
                    />
                </linearGradient>
            </defs>

            <path
                d="M 0 0 L 64 0 L 32 64 z"
                stroke="colourname"
                fill="url(#fill)"
            />
        </svg>
    )
}

export default Home
