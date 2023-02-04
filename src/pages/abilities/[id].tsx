import Link from "next/link"
import { useRouter } from "next/router"
import { api } from "../../utils/api"

const AbilityInfo = () => {
    const router = useRouter()
    const { id } = router.query

    const { data: ability, isLoading } = api.abilities.findOne.useQuery({
        id: String(id),
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <main className="container mx-auto my-16 space-y-8 text-slate-700">
                <Link href="/abilities">Back</Link>
                <h1 className="text-4xl font-bold">{ability?.name}</h1>
                <p>{ability?.description}</p>
            </main>
        </>
    )
}

export default AbilityInfo
