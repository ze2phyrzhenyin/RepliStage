"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale/LocaleContext";
import type { Actor } from "@/types/script";

const PRESET_COLORS = [
  "#f08c78","#ffcb6b","#7fd1b9","#7ea6ff","#95a0b8","#c4a8ff","#80d4a0","#ff9eb0","#f0d080","#80c8ff",
];

type Props = {
  actors: Actor[];
  onChange: (actors: Actor[]) => void;
};

export default function ActorManager({ actors, onChange }: Props) {
  const { t } = useLocale();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(PRESET_COLORS[0]);
  const [newLabel, setNewLabel] = useState("");

  function addActor() {
    if (!newName.trim()) return;
    const id = `actor_${Date.now()}`;
    const label = newLabel.trim() || newName.slice(0, 3).toUpperCase();
    onChange([...actors, { id, name: newName.trim(), color: newColor, shortLabel: label }]);
    setNewName("");
    setNewLabel("");
    setAdding(false);
  }

  function removeActor(id: string) {
    onChange(actors.filter((a) => a.id !== id));
  }

  function updateActor(id: string, updates: Partial<Actor>) {
    onChange(actors.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  }

  return (
    <div className="p-4 space-y-3">
      {actors.map((actor) => (
        <div key={actor.id} className="flex items-center gap-2 group">
          {/* Color picker */}
          <div className="relative">
            <div
              className="w-5 h-5 rounded-full cursor-pointer border border-white/20"
              style={{ background: actor.color }}
              onClick={() => {
                const next = PRESET_COLORS[(PRESET_COLORS.indexOf(actor.color) + 1) % PRESET_COLORS.length];
                updateActor(actor.id, { color: next });
              }}
            />
          </div>
          {/* Name */}
          <input
            value={actor.name}
            onChange={(e) => updateActor(actor.id, { name: e.target.value })}
            className="flex-1 bg-transparent text-sm text-white/80 outline-none border-b border-transparent focus:border-white/30 transition px-1"
          />
          {/* Short label */}
          <input
            value={actor.shortLabel}
            onChange={(e) => updateActor(actor.id, { shortLabel: e.target.value.slice(0, 4) })}
            className="w-12 bg-white/5 rounded px-1.5 text-[10px] text-white/50 outline-none text-center"
            placeholder={t("actor.tag")}
          />
          {/* Actor ID (readonly) */}
          <span className="text-[10px] text-white/20 font-mono hidden group-hover:block">{actor.id}</span>
          {/* Delete */}
          {actors.length > 1 && (
            <button
              onClick={() => removeActor(actor.id)}
              className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition text-sm px-1"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {/* Add actor form */}
      {adding ? (
        <div className="mt-3 p-3 rounded-lg space-y-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex gap-2 items-center">
            {/* Color swatches */}
            <div className="flex flex-wrap gap-1">
              {PRESET_COLORS.map((c) => (
                <div
                  key={c}
                  onClick={() => setNewColor(c)}
                  className="w-4 h-4 rounded-full cursor-pointer transition"
                  style={{
                    background: c,
                    outline: newColor === c ? `2px solid ${c}` : "none",
                    outlineOffset: 2,
                  }}
                />
              ))}
            </div>
          </div>
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addActor(); if (e.key === "Escape") setAdding(false); }}
            placeholder={t("actor.namePlaceholder")}
            className="w-full bg-transparent text-sm text-white/80 outline-none border-b border-white/20 px-1 py-0.5"
          />
          <div className="flex gap-2">
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value.slice(0, 4))}
              placeholder={t("actor.labelPlaceholder")}
              className="w-28 bg-white/5 rounded px-2 py-0.5 text-xs text-white/50 outline-none"
            />
            <button
              onClick={addActor}
              disabled={!newName.trim()}
              className="ml-auto px-3 py-1 rounded text-xs disabled:opacity-40"
              style={{ background: "rgba(241,194,125,0.2)", color: "#f1c27d" }}
            >
              {t("actor.add")}
            </button>
            <button onClick={() => setAdding(false)} className="px-2 py-1 rounded text-xs text-white/30 hover:text-white/60">
              {t("common.cancel")}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition mt-2"
        >
          <span className="text-lg leading-none">+</span> {t("actor.addActor")}
        </button>
      )}
    </div>
  );
}
