"use client";

import clsx from "clsx";
import { useLocale } from "@/components/locale/LocaleContext";
import type { Actor, ActorPose, ScriptEvent } from "@/types/script";
import { canDeleteEvent, getMoveTypePatch, getSideOptionLabel } from "@/lib/event-editor-core";

type Props = {
  event: ScriptEvent;
  index: number;
  actors: Actor[];
  onUpdate: (updates: Partial<ScriptEvent>) => void;
  onDelete: () => void;
  onDrawPath?: (index: number) => void;
  variant?: "panel" | "compact";
};

const SIDES = ["left", "right", "top", "bottom"] as const;

export function SharedEventForm({
  event,
  index,
  actors,
  onUpdate,
  onDelete,
  onDrawPath,
  variant = "panel",
}: Props) {
  const { locale, t } = useLocale();
  const isMove = event.type === "move" || event.type === "move_path";
  const showActor = ["line", "action", "enter", "exit", "move", "move_path"].includes(event.type);
  const showText = event.type === "line" || event.type === "action";
  const showPos = event.type === "enter" || event.type === "move";
  const showFrom = event.type === "enter";
  const showTo = event.type === "exit";
  const showPose = event.type === "line";

  const labelClassName = variant === "panel" ? "text-white/30" : "text-[10px] text-white/35";
  const inputClassName = variant === "panel"
    ? "bg-white/5 rounded px-2 py-0.5 text-white/70 outline-none"
    : "rounded bg-white/[0.06] border border-white/10 px-2 py-1 text-xs text-white/80 focus:outline-none focus:border-white/25";
  const textareaClassName = variant === "panel"
    ? "w-full bg-white/5 rounded px-2 py-1.5 text-white/80 outline-none resize-none text-xs leading-relaxed"
    : "w-full rounded bg-white/[0.06] border border-white/10 px-2 py-1.5 text-xs text-white/85 resize-none focus:outline-none focus:border-white/25 leading-5";

  return (
    <div
      className={clsx(
        variant === "panel"
          ? "mx-2 mb-2 rounded-lg p-3 space-y-2.5 text-xs"
          : "px-3 pb-3 space-y-2.5 border-t border-white/[0.06]",
      )}
      style={variant === "panel" ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" } : undefined}
    >
      {isMove && (
        <div className={clsx("flex items-center gap-2", variant === "compact" && "pt-2")}>
          <span className={clsx(labelClassName, "shrink-0")}>{t("editor.moveType")}</span>
          {(["move", "move_path"] as const).map((type) => (
            <button
              key={type}
              onClick={() => onUpdate(getMoveTypePatch(event, type))}
              className="px-2.5 py-0.5 rounded text-[10px] transition"
              style={{
                background: event.type === type ? "rgba(184,164,240,0.25)" : "rgba(255,255,255,0.05)",
                color: event.type === type ? "#b8a4f0" : "rgba(255,255,255,0.4)",
                border: `1px solid ${event.type === type ? "rgba(184,164,240,0.5)" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {type === "move" ? t("editor.move") : t("editor.movePath")}
            </button>
          ))}
        </div>
      )}

      <div className={clsx("flex gap-3 flex-wrap", variant === "compact" && "items-center")}>
        <label className="flex flex-col gap-1">
          <span className={labelClassName}>
            {t("editor.duration")}{variant === "panel" ? ` (${t("editor.seconds")})` : ""}
          </span>
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={event.duration}
            onChange={(e) => onUpdate({ duration: parseFloat(e.target.value) || 1 })}
            className={clsx(inputClassName, "w-20")}
          />
        </label>

        {showActor && (
          <label className="flex flex-col gap-1">
            <span className={labelClassName}>{t("editor.actor")}</span>
            <select
              value={event.actorId ?? ""}
              onChange={(e) => onUpdate({ actorId: e.target.value || undefined })}
              className={clsx(inputClassName, variant === "compact" && "flex-1")}
              style={variant === "panel" ? { minWidth: 80 } : undefined}
            >
              <option value="">{t("editor.none")}</option>
              {actors.map((actor) => (
                <option key={actor.id} value={actor.id}>{actor.name}</option>
              ))}
            </select>
          </label>
        )}

        {showPose && (
          <label className="flex flex-col gap-1">
            <span className={labelClassName}>{t("editor.pose")}</span>
            <select
              value={event.pose ?? ""}
              onChange={(e) => onUpdate({ pose: (e.target.value as ActorPose) || undefined })}
              className={inputClassName}
            >
              <option value="">{t("editor.auto")}</option>
              <option value="stand">{t("editor.stand")}</option>
              <option value="sit">{t("editor.sit")}</option>
            </select>
          </label>
        )}

        {showFrom && (
          <label className="flex flex-col gap-1">
            <span className={labelClassName}>{t("editor.enterSide")}</span>
            <select
              value={event.fromSide ?? "left"}
              onChange={(e) => onUpdate({ fromSide: e.target.value as ScriptEvent["fromSide"] })}
              className={inputClassName}
            >
              {SIDES.map((side) => <option key={side} value={side}>{getSideOptionLabel(locale, side)}</option>)}
            </select>
          </label>
        )}

        {showTo && (
          <label className="flex flex-col gap-1">
            <span className={labelClassName}>{t("editor.exitSide")}</span>
            <select
              value={event.toSide ?? "right"}
              onChange={(e) => onUpdate({ toSide: e.target.value as ScriptEvent["toSide"] })}
              className={inputClassName}
            >
              {SIDES.map((side) => <option key={side} value={side}>{getSideOptionLabel(locale, side)}</option>)}
            </select>
          </label>
        )}

        {showPos && (
          <>
            <label className="flex flex-col gap-1">
              <span className={labelClassName}>{t("editor.stageX")}</span>
              <input
                type="number"
                value={event.x ?? 460}
                onChange={(e) => onUpdate({ x: Number(e.target.value) || 0 })}
                className={clsx(inputClassName, "w-20")}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className={labelClassName}>{t("editor.stageY")}</span>
              <input
                type="number"
                value={event.y ?? 300}
                onChange={(e) => onUpdate({ y: Number(e.target.value) || 0 })}
                className={clsx(inputClassName, "w-20")}
              />
            </label>
          </>
        )}
      </div>

      {event.type === "action" && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className={labelClassName}>{t("editor.action")}</span>
          {([
            { label: t("editor.sitDown"), pose: "sit" as ActorPose, text: t("editor.sitDown") },
            { label: t("editor.standUp"), pose: "stand" as ActorPose, text: t("editor.standUp") },
          ]).map(({ label, pose, text }) => (
            <button
              key={label}
              onClick={() => onUpdate({ pose, text })}
              className="px-2.5 py-0.5 rounded text-[10px] transition"
              style={{
                background: event.pose === pose ? "rgba(157,213,255,0.2)" : "rgba(255,255,255,0.05)",
                color: event.pose === pose ? "#9dd5ff" : "rgba(255,255,255,0.45)",
                border: `1px solid ${event.pose === pose ? "rgba(157,213,255,0.4)" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              {label}
            </button>
          ))}
          {variant === "panel" && <span className="text-white/20 text-[10px]">{t("editor.customAction")}</span>}
        </div>
      )}

      {showText && (
        <label className="flex flex-col gap-1">
          <span className={labelClassName}>{event.type === "line" ? t("editor.line") : t("editor.actionDescription")}</span>
          <textarea
            value={event.text ?? ""}
            onChange={(e) => onUpdate({ text: e.target.value })}
            rows={event.type === "line" ? 3 : 2}
            className={textareaClassName}
            placeholder={event.type === "line" ? t("editor.linePlaceholder") : t("editor.actionPlaceholder")}
          />
        </label>
      )}

      {event.type === "move_path" && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onDrawPath?.(index)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition"
            style={{
              background: "rgba(224,164,248,0.15)",
              color: "#e0a4f8",
              border: "1px solid rgba(224,164,248,0.3)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10 Q4 2 6 6 Q8 10 10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
            {t("editor.drawPath")}
          </button>
          <span className="text-[10px] text-white/30">
            {event.path && event.path.length > 0 ? t("editor.pathReady", { count: event.path.length }) : t("editor.pathEmpty")}
          </span>
        </div>
      )}

      {canDeleteEvent(event) && (
        <div className={clsx(variant === "panel" ? "flex justify-end pt-1" : "")}>
          <button
            onClick={onDelete}
            className={variant === "panel"
              ? "text-[10px] text-white/25 hover:text-red-400 transition px-2 py-0.5 rounded hover:bg-red-400/10"
              : "text-[11px] text-red-400/60 hover:text-red-400 transition border border-red-400/20 hover:border-red-400/40 rounded px-2.5 py-1"}
          >
            {t("editor.deleteEvent")}
          </button>
        </div>
      )}
    </div>
  );
}
