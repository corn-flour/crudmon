import Link from "next/link"
import { useRouter } from "next/router"
import { api } from "../../utils/api"

const PokemonInfo = () => {
    const router = useRouter()
    const { id } = router.query

    const { data: pokemon, isLoading } = api.pokemon.findOne.useQuery({
        id: String(id),
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <main className="container mx-auto my-16 space-y-8 text-slate-700">
                <Link href="/">Back</Link>
                <h1 className="text-4xl font-bold">{pokemon?.name}</h1>
                <div className="space-y-4">
                    <p>Id: {pokemon?.id}</p>
                    <p>
                        Ability: {pokemon?.abilityOne.name}{" "}
                        {!!pokemon?.abilityTwo &&
                            `, ${pokemon.abilityTwo.name}`}
                    </p>
                    <p>
                        Hidden ability: {pokemon?.hiddenAbility?.name ?? "None"}
                    </p>
                    <p>
                        Type: {pokemon?.typeOne}
                        {!!pokemon?.typeTwo && `, ${pokemon.typeTwo}`}
                    </p>
                </div>
            </main>
        </>
    )
}

export default PokemonInfo
