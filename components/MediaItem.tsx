"use client"

import useLoadImage from "@/hooks/useLoadImage"
import usePlayer from "@/hooks/usePlayer"
import { Song } from "@/types"
import Image from "next/image"

interface MediaItemProps {
    onClick?: (id: string) => void,
    data : Song
}
const MediaItem: React.FC<MediaItemProps> = ({data , onClick}) => {
    const imageUrl = useLoadImage(data)
    const player = usePlayer()
    const handleClick = () => {
        if(onClick) {
            return onClick(data.id)
        }
        return player.setId(data.id)
    }
  return (
    <div onClick={handleClick} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 px-2 py-2 rounded-md w-full">
        <div className="relative rounded-md min-h-[40px] min-w-[40px] overflow-hidden">
            <Image fill src={imageUrl || "/images/liked.png"} alt="Media Item" className="object-cover" />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
            <h3 className="text-white truncate">{data.title}</h3>
            <p className="text-neutral-400 text-sm truncate">{data.author}</p>
        </div>
    </div>
  )
}

export default MediaItem