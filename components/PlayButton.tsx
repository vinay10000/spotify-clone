"use client";

import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button className="bg-green-500 flex items-center transition opacity-0 rounded-full p-4 justify-center drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaPlay className="w-4 mr-1 text-black" />
    </button>
  );
};

export default PlayButton;
