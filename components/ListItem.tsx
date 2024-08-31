"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}
const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();
  const onClick = () => {
    // Add authentication before pushing
    router.push(href);
  };
  return (
    <button
      className="relative group flex items-center gap-x-4 overflow-hidden bg-neutral-100/10 rounded-md   hover:bg-neutral-100/20 transition pr-4"
      onClick={onClick}
      draggable="false"
    >
      <div className="relative min-h-[64px] min-w-[64px] rounded-md overflow-hidden">
        <Image src={image} alt="image" className="object-cover"  width={64} height={64} />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute right-1 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md opacity-0 group-hover:opacity-100 scale-75 hover:scale-90 transition">
        <FaPlay className="text-black" size={30} />
      </div>
    </button>
  );
};

export default ListItem;
