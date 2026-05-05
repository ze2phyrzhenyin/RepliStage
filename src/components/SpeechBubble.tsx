"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLocale } from "@/components/locale/LocaleContext";
import { Actor, ScriptEvent } from "@/types/script";
import { getActorById } from "@/lib/player";

type SubtitleBarProps = {
  actors: Actor[];
  event: ScriptEvent | null;
  text: string | null;
  actionText: string | null;
  isOwnLine: boolean;
  revealed: boolean;
  onToggleReveal: () => void;
};

export function SpeechBubble({
  actors,
  event,
  text,
  actionText,
  isOwnLine,
  revealed,
  onToggleReveal,
}: SubtitleBarProps) {
  const { t } = useLocale();
  const actor = event?.actorId ? getActorById(actors, event.actorId) : null;
  const hasLine = event?.type === "line" && text;
  const hasAction = Boolean(actionText);

  return (
    <AnimatePresence mode="wait">
      {(hasLine || hasAction) ? (
        <motion.div
          key={event?.id ?? "action"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0"
          style={{ pointerEvents: isOwnLine ? "auto" : "none" }}
          onClick={isOwnLine ? onToggleReveal : undefined}
        >
          {/* Gradient fade behind text */}
          <div
            className="absolute inset-0 rounded-b-xl"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)",
            }}
          />

          <div className="relative px-5 pt-8 pb-4 pointer-events-none">
            {/* Action text */}
            {hasAction && !hasLine && (
              <p className="text-xs italic text-white/45">（{actionText}）</p>
            )}

            {/* Dialogue */}
            {hasLine && (
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.25em] block mb-1"
                    style={{ color: actor?.color ?? "#f1c27d" }}
                  >
                    {actor?.name}
                  </span>
                  <p className="text-white text-sm leading-6 sm:text-base sm:leading-7">{text}</p>
                </div>
                {isOwnLine && (
                  <span
                    className="shrink-0 pointer-events-none rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/60"
                  >
                    {revealed ? t("speech.hide") : t("speech.show")}
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
