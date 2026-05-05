"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale/LocaleContext";
import { Actor } from "@/types/script";

export function RoleCard({ actor, sceneId }: { actor: Actor; sceneId: string }) {
  const { t } = useLocale();

  return (
    <Link
      href={`/rehearsal?scene=${encodeURIComponent(sceneId)}&role=${encodeURIComponent(actor.id)}`}
      className="glass-panel raise-on-hover group relative flex flex-col rounded-2xl p-5 transition"
    >
      {/* Color bar */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full opacity-60"
        style={{ backgroundColor: actor.color }}
      />

      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold text-[#0a0c14] mb-6 mt-3"
        style={{ backgroundColor: actor.color }}
      >
        {actor.shortLabel}
      </div>

      {/* Info */}
      <h2 className="text-base font-medium text-white">{actor.name}</h2>
      <p className="mt-0.5 text-[11px] text-white/30 uppercase tracking-wider">{actor.id}</p>

      {/* Arrow */}
      <div className="mt-auto pt-5 flex items-center justify-between">
        <span className="text-xs text-white/30">{t("role.start")}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-white/25 transition group-hover:text-white/60 group-hover:translate-x-0.5"
        >
          <path
            d="M3 7h8M8 4l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}
