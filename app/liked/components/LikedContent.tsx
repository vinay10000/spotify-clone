"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
    songs: Song[]
}
const LikedContent: React.FC<LikedContentProps> = ({songs}) => {
    const router = useRouter()
    const {user, isLoading} = useUser()
    const onPlay = useOnPlay(songs)
    useEffect(() => {
        if(!isLoading && !user) {
            router.replace('/')
        }
    },[isLoading, user, router])
    if(songs.length === 0) {
        return (
            <div className="w-full flex flex-col gap-y-2 px-6 text-neutral-400 ">
                No liked songs found
            </div>
        )
    }
  return (
    <div className="w-full flex flex-col gap-y-2 p-6">{songs.map((item) => (
        <div
            key={item.id}
            className="flex items-center gap-x-4 w-full"
        >
            <div className="flex-1">
                <MediaItem data={item} onClick={(id: string) => {onPlay(id)}} />
            </div>
            <LikeButton songId={item.id} />
        </div>
    ))}</div>
  )
}

export default LikedContent