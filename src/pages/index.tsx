import { type NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useAutoAnimate } from "@formkit/auto-animate/react"

import { api } from "../utils/api"

const Home: NextPage = () => {
    const { ref: endContainer, inView } = useInView()
    const [animationParent] = useAutoAnimate()

    const {
        data: pokemonResponse,
        fetchNextPage: fetchMorePokemon,
        status,
    } = api.pokemon.list.useInfiniteQuery(
        {
            limit: 48,
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

            <main className="min-h-screen space-y-8 bg-[url(/wood-bg.jpeg)]">
                <h1 className="pt-16 text-center text-4xl font-bold uppercase tracking-widest text-white">
                    Pokédex
                </h1>

                {status === "loading" ? (
                    <div className="fixed top-1/2 left-1/2 flex w-72 -translate-y-1/2 -translate-x-1/2 flex-col items-center gap-8 rounded-xl border-2 border-black bg-slate-300/90 py-6">
                        <Image
                            src="/book.png"
                            width={40}
                            height={40}
                            alt=""
                            priority
                        />
                        <p className="text-lg text-slate-700">Loading...</p>
                    </div>
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
                            ref={animationParent}
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

                            <div
                                ref={endContainer}
                                id="page-bottom-indicator"
                                className="h-[100px] w-[250px]"
                            />
                        </div>
                    </>
                )}
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
        <Link
            href={`/pokemon/${id}`}
            className="group relative transition-all hover:-translate-y-4 focus:-translate-y-4 focus:outline-none"
        >
            <div
                className="relative flex h-[300px] w-[250px] flex-col items-center justify-end overflow-hidden bg-purple-900 group-hover:outline group-focus:outline"
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
                <div className="absolute top-5 left-4 -right-2 bottom-5 rounded-bl-3xl border-2 border-[#B6E12A] border-r-transparent bg-gradient-to-b from-black/30 to-transparent p-2 text-[#B6E12A]">
                    <p className="font-mono text-2xl font-bold capitalize tracking-wider">
                        {name}
                    </p>
                    <p className="font-mono text-xl font-bold">{id}</p>
                </div>
            </div>
            <TriangleCaret className=" absolute left-1/2 -top-16 -translate-x-1/2 scale-y-[50%] scale-x-[60%] opacity-0 transition-all group-hover:-top-8 group-hover:opacity-100 group-focus:-top-8 group-focus:opacity-100" />
        </Link>
    )
}

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
