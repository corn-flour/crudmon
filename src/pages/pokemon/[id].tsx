import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import TypeDisplay from "../../components/type-display"
import { api } from "../../utils/api"

const PokemonInfo = () => {
    const router = useRouter()
    const { id } = router.query

    const { data: pokemon, status } = api.pokemon.findOne.useQuery(
        {
            id: id as string,
        },
        {
            cacheTime: Infinity,
            staleTime: Infinity,
            enabled: !!id && typeof id === "string",
        }
    )

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "error") {
        return <div>Error!</div>
    }

    return (
        <>
            <main className="container mx-auto my-16 space-y-8 text-slate-700">
                <Link href="/">Back</Link>
                <h1>{pokemon.name}</h1>

                <div>
                    {pokemon.types
                        .sort((a, b) => a.slot - b.slot)
                        .map((type) => (
                            <TypeDisplay
                                type={type.type.name}
                                key={type.slot}
                            />
                        ))}
                </div>

                <Image
                    src={pokemon.artworkURL}
                    alt={`Official artwork of ${pokemon.name}`}
                    width={150}
                    height={150}
                />
            </main>
        </>
    )
}

export default PokemonInfo
