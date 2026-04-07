"use client";

import { useCallback, useRef } from "react";
import { useLocale } from "@/components/locale/LocaleContext";
import { SPEED_OPTIONS } from "@/lib/player";
import { eventColor } from "@/lib/eventMeta";
import type { ScriptEvent } from "@/types/script";

type PlaybackControlsProps = {
  currentEventIndex: number;
  totalEvents: number;
  isPlaying: boolean;
  autoplay: boolean;
  speed: number;
  showAllLines: boolean;
  events?: ScriptEvent[];
  onSeek: (index: number) => void;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  onToggleAutoplay: () => void;
  onSpeedChange: (s: number) => void;
  onToggleShowAllLines: () => void;
};

function Scrubber({
  value,
  max,
  events,
  onChange,
}: {
  value: number;
  max: number;
  events?: ScriptEvent[];
  onChange: (v: number) => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const seek = useCallback(
    (clientX: number) => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      onChange(Math.round(pct * max));
    },
    [max, onChange],
  );

  const pct = max > 0 ? (value / max) * 100 : 0;
  const total = max + 1;

  return (
    <div
      ref={barRef}
      className="relative h-6 flex items-center cursor-pointer group"
      style={{ touchAction: "none" }}
      onMouseDown={(e) => { dragging.current = true; seek(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) seek(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => { dragging.current = true; e.preventDefault(); seek(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (dragging.current) { e.preventDefault(); seek(e.touches[0].clientX); } }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* Track */}
      <div className="absolute inset-x-0 h-[3px] rounded-full bg-white/8">
        {/* Event-type colored segments */}
        {events && events.length > 1 ? (
          events.map((evt, i) => {
            const segLeft = (i / total) * 100;
            const segWidth = (1 / total) * 100;
            const color = eventColor(evt.type);
            const isCurrent = i === value;
            return (
              <div
                key={evt.id ?? i}
                className="absolute top-0 h-full"
                style={{
                  left: `${segLeft}%`,
                  width: `${segWidth}%`,
                  backgroundColor: color,
                  opacity: i <= value ? (isCurrent ? 0.95 : 0.55) : 0.18,
                }}
              />
            );
          })
        ) : (
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-[#f1c27d]/60"
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
      {/* Thumb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-90 shadow-md transition-opacity"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

export function PlaybackControls({
  currentEventIndex,
  totalEvents,
  isPlaying,
  autoplay,
  speed,
  showAllLines,
  events,
  onSeek,
  onTogglePlay,
  onPrev,
  onNext,
  onReset,
  onToggleAutoplay,
  onSpeedChange,
  onToggleShowAllLines,
}: PlaybackControlsProps) {
  const { t } = useLocale();
  const total = Math.max(0, totalEvents - 1);

  return (
    <div className="border-t border-white/[0.06] bg-[#060912]/90 backdrop-blur-md shrink-0">
      {/* Scrubber */}
      <div className="px-4 pt-2">
        <Scrubber value={currentEventIndex} max={total} events={events} onChange={onSeek} />
      </div>

      {/* Controls row */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 gap-1">
        {/* Transport */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={onReset}
            className="p-2.5 rounded-lg text-white/30 transition hover:text-white/65 hover:bg-white/5"
            title={t("playback.reset")}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7a4.5 4.5 0 1 0 1.4-3.2L2.5 2.5v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={onPrev}
            className="p-2.5 rounded-lg text-white/55 transition hover:text-white hover:bg-white/5"
            title={`${t("playback.prev")} ←`}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#0a0c14] transition hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#f1c27d" }}
            title={`${t("playback.playPause")} Space`}
          >
            {isPlaying ? (
              <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                <rect x="2" y="2" width="4" height="10" rx="1"/>
                <rect x="8" y="2" width="4" height="10" rx="1"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor">
                <path d="M3 2.5l9 4.5-9 4.5V2.5z"/>
              </svg>
            )}
          </button>
          <button
            onClick={onNext}
            className="p-2.5 rounded-lg text-white/55 transition hover:text-white hover:bg-white/5"
            title={`${t("playback.next")} →`}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Counter */}
        <span className="text-xs text-white/30 tabular-nums">
          {currentEventIndex + 1} <span className="text-white/18">/</span> {total + 1}
        </span>

        {/* Options */}
        <div className="flex items-center gap-1 flex-wrap justify-center sm:flex-nowrap sm:justify-end">
          {/* Speed */}
          {(SPEED_OPTIONS as readonly number[]).map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className="px-2.5 py-1.5 rounded text-xs transition"
              style={{
                color: speed === s ? "#f1c27d" : "rgba(255,255,255,0.28)",
                background: speed === s ? "rgba(241,194,125,0.1)" : "transparent",
              }}
            >
              {s}×
            </button>
          ))}

          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* Autoplay */}
          <button
            onClick={onToggleAutoplay}
            className="px-2.5 py-1 rounded-lg text-xs transition"
            style={{
              color: autoplay ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.28)",
              background: autoplay ? "rgba(255,255,255,0.07)" : "transparent",
            }}
          >
            {t("playback.autoplay")}
          </button>

          {/* Show all lines */}
          <button
            onClick={onToggleShowAllLines}
            className="px-2.5 py-1 rounded-lg text-xs transition"
            style={{
              color: showAllLines ? "#f1c27d" : "rgba(255,255,255,0.28)",
              background: showAllLines ? "rgba(241,194,125,0.1)" : "transparent",
            }}
          >
            {t("playback.showAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
