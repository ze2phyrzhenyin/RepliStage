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
      className="flex flex-col shrink-0 border-r border-white/[0.07]"
      style={{ width: 180, background: "#09071a" }}
    >
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/[0.07]">
        <span className="text-[10px] uppercase tracking-widest text-white/30">{t("director.sceneLabel")}</span>
        <button
          onClick={onAdd}
          title={t("director.addScene")}
          className="text-white/40 hover:text-[#f1c27d] transition text-lg leading-none"
        >
          +
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        {play.scenes.map((scene) => {
          const active = scene.id === activeSceneId;
          return (
            <div
              key={scene.id}
              className="group relative"
            >
              <button
                onClick={() => onSelect(scene.id)}
                className="w-full text-left px-3 py-2.5 text-xs transition"
                style={{
                  background: active ? "rgba(241,194,125,0.08)" : "transparent",
                  color: active ? "#f1c27d" : "rgba(255,255,255,0.5)",
                  borderLeft: active ? "2px solid #f1c27d" : "2px solid transparent",
                }}
              >
                <div className="font-medium truncate">{scene.title || t("common.untitled")}</div>
                {scene.subtitle && (
                  <div className="text-[10px] truncate mt-0.5 opacity-60">{scene.subtitle}</div>
                )}
                <div className="text-[10px] mt-0.5 opacity-40">{t("director.eventsCount", { count: scene.events.length })}</div>
              </button>
              {/* Context actions */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-0.5">
                <button
                  onClick={() => onDuplicate(scene.id)}
                  title={t("director.duplicate")}
                  className="px-1.5 py-0.5 text-[10px] rounded text-white/30 hover:text-white/70 hover:bg-white/10 transition"
                >
                  ⎘
                </button>
                {play.scenes.length > 1 && (
                  <button
                    onClick={() => onDelete(scene.id)}
                    title={t("director.delete")}
                    className="px-1.5 py-0.5 text-[10px] rounded text-white/30 hover:text-red-400 hover:bg-red-400/10 transition"
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
