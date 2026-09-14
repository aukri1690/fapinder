"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type Item = {
  title: string;
  url: string;
  image: string;
};

type Props = {
  items: Item[];
};

const SwipeDeck = ({ items }: Props) => {
  const [index, setIndex] = useState(0);
  const current = items[index];

  const handleLike = () => {
    window.open(current.url, "_blank");
    setIndex((prev) => prev + 1);
  };

  const handleNope = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
  {current ? (
    <div className="flex flex-col items-center gap-4">
      <div className="w-96 aspect-[800/536] overflow-hidden flex items-center justify-center">
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="h-12 w-96 line-clamp-2 text-center break-words font-bold">{current.title}</p>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="border-gray-500 text-gray-500 hover:bg-gray-50 hover:text-gray-500 font-bold"
          onClick={handleNope}
        >
          Nope
        </Button>
        <Button
          variant="outline"
          className="border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-500 font-bold"
          onClick={handleLike}
        >
          Like
        </Button>
      </div>
    </div>
  ) : (
    <p>表示できる作品がありません</p>
  )}
</div>
  );
};

export default SwipeDeck;