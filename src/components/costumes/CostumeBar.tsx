"use client";

import type { Actor } from "@/types/script";
import { CostumeTrigger } from "./CostumeSelector";

export default function CostumeBar({ actors }: { actors: Actor[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {actors.map((actor) => (
        <CostumeTrigger key={actor.id} actor={actor} />
      ))}
    </div>
  );
}
