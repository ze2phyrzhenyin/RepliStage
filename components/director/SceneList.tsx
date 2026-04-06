"use client";

import { useLocale } from "@/components/locale/LocaleContext";
import type { Play } from "@/types/script";

type Props = {
  play: Play;
  activeSceneId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function SceneList({ play, activeSceneId, onSelect, onAdd, onDuplicate, onDelete }: Props) {
  const { t } = useLocale();

  return (
    <aside
      className="flex flex-col shrink-0 border-r border-white/[0.07] bg-[linear-gradient(180deg,#09071a_0%,#0b0a1f_100%)]"
      style={{ width: 196 }}
    >
      <div className="flex items-center justify-between px-3 py-3 border-b border-white/[0.07]">
        <span className="text-[10px] uppercase tracking-widest text-white/30">{t("director.sceneLabel")}</span>
        <button
          onClick={onAdd}
          title={t("director.addScene")}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-base leading-none text-white/40 transition hover:border-[#f1c27d]/20 hover:text-[#f1c27d]"
        >
          +
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {play.scenes.map((scene) => {
          const active = scene.id === activeSceneId;
          return (
            <div
              key={scene.id}
              className="group relative mb-1.5"
            >
              <button
                onClick={() => onSelect(scene.id)}
                className="w-full rounded-2xl text-left px-3 py-3 text-xs transition"
                style={{
                  background: active ? "rgba(241,194,125,0.1)" : "rgba(255,255,255,0.02)",
                  color: active ? "#f1c27d" : "rgba(255,255,255,0.5)",
                  border: active ? "1px solid rgba(241,194,125,0.22)" : "1px solid rgba(255,255,255,0.04)",
                  boxShadow: active ? "inset 0 0 0 1px rgba(241,194,125,0.08)" : "none",
                }}
              >
                <div className="font-medium truncate">{scene.title || t("common.untitled")}</div>
                {scene.subtitle && (
                  <div className="text-[10px] truncate mt-0.5 opacity-60">{scene.subtitle}</div>
                )}
                <div className="text-[10px] mt-0.5 opacity-40">{t("director.eventsCount", { count: scene.events.length })}</div>
              </button>
              {/* Context actions */}
              <div className="absolute right-2 top-2 hidden group-hover:flex gap-1">
                <button
                  onClick={() => onDuplicate(scene.id)}
                  title={t("director.duplicate")}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0c1020]/88 text-[10px] text-white/34 transition hover:text-white/70 hover:bg-white/10"
                >
                  ⎘
                </button>
                {play.scenes.length > 1 && (
                  <button
                    onClick={() => onDelete(scene.id)}
                    title={t("director.delete")}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0c1020]/88 text-[10px] text-white/34 transition hover:text-red-400 hover:bg-red-400/10"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
