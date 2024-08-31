"use client"

import LikeButton from "@/components/LikeButton"
import MediaItem from "@/components/MediaItem"
import useOnPlay from "@/hooks/useOnPlay"
import { Song } from "@/types"

interface SearchContentProps {
    songs: Song[]
}
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs)
  if (songs.length === 0) {
    return (
      <div className="w-full flex flex-col gap-y-2 px-6 text-neutral-400 items-center justify-center">
        No songs found
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col gap-y-2 px-6">
      {songs.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem data={item} onClick={(id: string) => {onPlay(id)}} />
          </div>
          <LikeButton songId={item.id} />
        </div>
      ))}
    </div>
  )
}

export default SearchContent