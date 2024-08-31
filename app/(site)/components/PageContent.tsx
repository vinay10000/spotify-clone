"use client"

import SongItem from "@/components/SongItem"
import useOnPlay from "@/hooks/useOnPlay"
import { Song } from "@/types"

interface PageContentProps {
    songs: Song[]
}

const PageContent: React.FC<PageContentProps> = ({ songs, onSongClick }) => {
    const onPlay  = useOnPlay(songs)
    if (songs.length === 0) {
        return (
            <div className="w-full h-full flex flex-col gap-y-2 items-center justify-center">
                No songs found
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
            {songs.map((item) => (
                <SongItem 
                    key={item.id} 
                    data={item} 
                    onClick={(id: string) => onPlay(id)} 
                />
            ))}
        </div>
    )
}

export default PageContent
