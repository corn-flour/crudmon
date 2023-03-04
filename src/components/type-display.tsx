import { cva } from "cva"
import Image from "next/image"
import { type pokemonTypes } from "../utils/consts"

type PokemonType = (typeof pokemonTypes)[number]

const typeDisplayCVA = cva(
    "rounded-full inline-flex w-32 items-center text-white px-2 uppercase",
    {
        variants: {
            type: {
                normal: "bg-gray-500",
                fighting: "bg-orange-500",
                flying: "bg-sky-500",
                poison: "bg-fuchsia-900",
                ground: "bg-amber-600",
                rock: "bg-[#92874B]",
                bug: "bg-lime-700",
                ghost: "bg-purple-900",
                steel: "bg-cyan-600",
                fire: "bg-red-500",
                water: "bg-blue-600",
                grass: "bg-green-600",
                electric: "bg-yellow-600",
                psychic: "bg-pink-600",
                ice: "bg-cyan-500",
                dragon: "bg-indigo-600",
                dark: "bg-[#50413F]",
                fairy: "bg-fuchsia-600",
            },
        },
    }
)

const TypeDisplay = ({ type }: { type: PokemonType }) => {
    return (
        <span
            className={typeDisplayCVA({
                type,
            })}
        >
            <Image src={`/types/${type}.png`} alt="" width={20} height={20} />
            <span className="flex-1 px-1 text-center">{type}</span>
        </span>
    )
}

export default TypeDisplay
