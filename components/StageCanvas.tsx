"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { useLocale } from "@/components/locale/LocaleContext";
import { HumanActorSprite } from "@/components/HumanActorSprite";
import { getActorById, DerivedStageState } from "@/lib/player";
import { getStageProps } from "@/lib/stage-props";
import { useCostumes } from "@/components/costumes/CostumeContext";
import type { Actor, StageConfig, ScriptEvent, PathPoint, StageProp, StagePropKind } from "@/types/script";
import { PROP_ANCHORS, PROP_DIMS, PROP_LAYERS, PropSvgForKind } from "@/components/props/PropSvgs";

// Sprite base dims
const SPRITE_W = 56;
const SPRITE_H = 84;

const CHAIR_W = 64;
const CHAIR_H = 100;

const DOOR_FRAME_W = 126;
const DOOR_FLOOR_RATIO = 0.38;

type PropDragState = {
  propId: string;
  kind: StageProp["kind"];
  stageX: number;
  stageY: number;
};

type StageCanvasProps = {
  stageState: DerivedStageState;
  actors: Actor[];
  selectedRoleId: string | null;
  compact?: boolean;
  editMode?: boolean;
  selectedActorId?: string | null;
  onActorDrop?: (actorId: string, stageX: number, stageY: number) => void;
  stageConfig: StageConfig;
  onPropDrop?: (propId: string, stageX: number, stageY: number) => void;
  /** When set, stage enters path-drawing mode for this actor */
  drawingPathFor?: string | null;
  onPathDrawn?: (path: PathPoint[]) => void;
  /** Current event for path visualization */
  currentEvent?: ScriptEvent | null;
};

function getPropLabelMetrics(prop: StageProp, scale: number, stageH: number) {
  if (prop.kind === "door") {
    return {
      left: prop.x * scale,
      top: Math.max(18, prop.y * scale - 14),
    };
  }

  if (prop.kind === "chair") {
    const { left, w } = chairPosition(scale, prop.x, prop.y, stageH);
    return {
      left: left + w / 2,
      top: prop.y * scale - CHAIR_H * scale - 8,
    };
  }

  const dims = PROP_DIMS[prop.kind];
  if (!dims) {
    return {
      left: prop.x * scale,
      top: prop.y * scale,
    };
  }

  const anchor = PROP_ANCHORS[prop.kind] ?? "floor";
  return {
    left: prop.x * scale,
    top: anchor === "top"
      ? prop.y * scale + dims.h * scale + 10
      : prop.y * scale - dims.h * scale - 8,
  };
}

function PropLabel({
  prop,
  scale,
  stageH,
}: {
  prop: StageProp;
  scale: number;
  stageH: number;
}) {
  if (!prop.label?.trim()) return null;
  const pos = getPropLabelMetrics(prop, scale, stageH);
  return (
    <div
      style={{
        position: "absolute",
        left: pos.left,
        top: pos.top,
        transform: "translate(-50%, -100%)",
        pointerEvents: "none",
      }}
    >
      <span
        className="rounded-full border px-2 py-0.5 text-[10px] leading-none"
        style={{
          color: "rgba(255,255,255,0.82)",
          background: prop.locked ? "rgba(18,22,32,0.84)" : "rgba(8,10,18,0.72)",
          borderColor: prop.locked ? "rgba(241,194,125,0.28)" : "rgba(255,255,255,0.14)",
          backdropFilter: "blur(8px)",
          whiteSpace: "nowrap",
        }}
      >
        {prop.label}
      </span>
    </div>
  );
}

// ── Door prop ────────────────────────────────────────────────
function DoorProp({
  scale, doorX, doorY, stageH, editMode, onStartDrag,
}: {
  scale: number;
  doorX: number;
  doorY: number;
  stageH: number;
  editMode?: boolean;
  onStartDrag?: (e: React.PointerEvent) => void;
}) {
  const doorStageFloorY = Math.round(stageH * DOOR_FLOOR_RATIO);
  const w = DOOR_FRAME_W * scale;
  const h = doorStageFloorY * scale;
  const panelBottom = doorY + 18;
  const thresholdH = 7;
  const archH = doorStageFloorY - panelBottom - thresholdH;

  return (
    <div
      onPointerDown={editMode ? onStartDrag : undefined}
      style={{
        position: "absolute",
        left: (doorX - DOOR_FRAME_W / 2) * scale,
        top: 0,
        cursor: editMode ? "grab" : undefined,
        width: w,
        height: h,
        pointerEvents: editMode ? "auto" : "none",
      }}
    >
      <svg
        viewBox={`0 0 126 ${doorStageFloorY}`}
        width={w}
        height={h}
        style={{ display: "block" }}
      >
        <defs>
          <radialGradient id="door-glow" cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="rgba(255,210,110,0.13)" />
            <stop offset="100%" stopColor="rgba(255,210,110,0)" />
          </radialGradient>
          <linearGradient id="glass-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,215,130,0.09)" />
            <stop offset="100%" stopColor="rgba(180,200,220,0.04)" />
          </linearGradient>
          {/* Light bleeding down from the doorway onto the floor approach */}
          <linearGradient id="door-entry-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,200,90,0.07)" />
            <stop offset="100%" stopColor="rgba(255,200,90,0)" />
          </linearGradient>
        </defs>

        {/* Outer glow */}
        <rect x="0" y="0" width="126" height={doorStageFloorY} fill="url(#door-glow)" />

        {/* ── Stone wall surround that frames the whole doorway ── */}
        {/* Left jamb */}
        <rect x="0" y="0" width="7" height={doorStageFloorY} fill="#0f0810" />
        {/* Right jamb */}
        <rect x="119" y="0" width="7" height={doorStageFloorY} fill="#0f0810" />

        {/* ── Main frame — dark iron (glass panel section) ── */}
        <rect x="1" y="1" width="124" height={panelBottom + 2} rx="3" fill="#12090a" />
        <rect x="5" y="5" width="116" height={panelBottom - 2} rx="2" fill="#0d0607" />

        {/* — Left door panel — */}
        <rect x="7" y="7" width="51" height="101" rx="1" fill="#110708" stroke="#1f1009" strokeWidth="2.5" />
        <rect x="9" y="9" width="47" height="97" fill="url(#glass-l)" />
        {/* Left panes: 2 cols × 3 rows */}
        <rect x="10" y="10" width="20" height="27" rx="1" fill="rgba(255,215,120,0.055)" stroke="#1e1009" strokeWidth="1.2" />
        <rect x="10" y="40" width="20" height="27" rx="1" fill="rgba(255,215,120,0.04)"  stroke="#1e1009" strokeWidth="1.2" />
        <rect x="10" y="70" width="20" height="34" rx="1" fill="rgba(255,215,120,0.035)" stroke="#1e1009" strokeWidth="1.2" />
        <rect x="34" y="10" width="20" height="27" rx="1" fill="rgba(255,215,120,0.05)"  stroke="#1e1009" strokeWidth="1.2" />
        <rect x="34" y="40" width="20" height="27" rx="1" fill="rgba(255,215,120,0.038)" stroke="#1e1009" strokeWidth="1.2" />
        <rect x="34" y="70" width="20" height="34" rx="1" fill="rgba(255,215,120,0.032)" stroke="#1e1009" strokeWidth="1.2" />

        {/* — Right door panel — */}
        <rect x="68" y="7" width="51" height="101" rx="1" fill="#110708" stroke="#1f1009" strokeWidth="2.5" />
        <rect x="70" y="9" width="47" height="97" fill="url(#glass-l)" />
        <rect x="71" y="10" width="20" height="27" rx="1" fill="rgba(255,215,120,0.06)"  stroke="#1e1009" strokeWidth="1.2" />
        <rect x="71" y="40" width="20" height="27" rx="1" fill="rgba(255,215,120,0.04)"  stroke="#1e1009" strokeWidth="1.2" />
        <rect x="71" y="70" width="20" height="34" rx="1" fill="rgba(255,215,120,0.035)" stroke="#1e1009" strokeWidth="1.2" />
        <rect x="95" y="10" width="20" height="27" rx="1" fill="rgba(255,215,120,0.055)" stroke="#1e1009" strokeWidth="1.2" />
        <rect x="95" y="40" width="20" height="27" rx="1" fill="rgba(255,215,120,0.038)" stroke="#1e1009" strokeWidth="1.2" />
        <rect x="95" y="70" width="20" height="34" rx="1" fill="rgba(255,215,120,0.032)" stroke="#1e1009" strokeWidth="1.2" />

        {/* Center mullion */}
        <rect x="60" y="1" width="6" height={panelBottom + 1} fill="#12090a" />

        {/* Door handles */}
        <rect x="57" y="48" width="12" height="18" rx="4" fill="#0e0706" />
        <rect x="58.5" y="50" width="4" height="14" rx="2" fill="#a87c28" />
        <rect x="63.5" y="50" width="4" height="14" rx="2" fill="#a87c28" />
        <circle cx="60.5" cy="55" r="2.5" fill="#c9982e" />
        <circle cx="65.5" cy="55" r="2.5" fill="#c9982e" />

        {/* Top transom divider */}
        <rect x="5" y="5" width="116" height="5" fill="#12090a" />

        {/* ── Stone wall between panel bottom and threshold ── */}
        <rect x="7" y={panelBottom} width="112" height={archH} fill="#0e0a10" />
        {/* Left stone reveal */}
        <rect x="7" y={panelBottom} width="10" height={archH} fill="#120e14" />
        {/* Right stone reveal */}
        <rect x="109" y={panelBottom} width="10" height={archH} fill="#120e14" />
        {/* Stone mortar lines (horizontal) */}
        {Array.from({ length: Math.floor(archH / 18) }, (_, i) => (
          <line
            key={i}
            x1="7" y1={panelBottom + (i + 1) * 18}
            x2="119" y2={panelBottom + (i + 1) * 18}
            stroke="rgba(0,0,0,0.3)" strokeWidth="1"
          />
        ))}
        {/* Entry light bleeding down through the opening */}
        <rect x="7" y={panelBottom} width="112" height={archH} fill="url(#door-entry-light)" />

        {/* ── Threshold / step at floor seam ── */}
        <rect
          x="-3" y={doorStageFloorY - thresholdH}
          width="132" height={thresholdH}
          rx="1" fill="#1a1010"
        />
        {/* Gold threshold strip */}
        <rect
          x="-3" y={doorStageFloorY - thresholdH}
          width="132" height="2"
          rx="1" fill="rgba(190,130,40,0.35)"
        />
        {/* Floor glow at base of door */}
        <ellipse
          cx="63" cy={doorStageFloorY - 1}
          rx="42" ry="4"
          fill="rgba(200,140,50,0.1)"
        />
      </svg>
    </div>
  );
}

// ── Chair prop — split into two layers ───────────────────────
// ChairBack renders BEHIND actors: legs, seat, floor shadow.
// ChairFront renders IN FRONT of actors: back posts, top rail, arm rests.
// This makes a seated actor visibly "inside" the chair.

function chairPosition(scale: number, chairX: number, chairY: number, stageH: number) {
  return {
    left: (chairX - CHAIR_W / 2) * scale,
    bottom: (stageH - chairY) * scale,
    w: CHAIR_W * scale,
    h: CHAIR_H * scale,
  };
}

function ChairBack({
  scale, chairX, chairY, stageH, editMode, onStartDrag,
}: {
  scale: number;
  chairX: number;
  chairY: number;
  stageH: number;
  editMode?: boolean;
  onStartDrag?: (e: React.PointerEvent) => void;
}) {
  const { left, bottom, w, h } = chairPosition(scale, chairX, chairY, stageH);
  return (
    <div
      onPointerDown={editMode ? onStartDrag : undefined}
      style={{
        position: "absolute", left, bottom, width: w, height: h,
        pointerEvents: editMode ? "auto" : "none",
        cursor: editMode ? "grab" : undefined,
      }}
    >
      <svg viewBox="0 0 88 138" width={w} height={h} style={{ display: "block" }}>
        <defs>
          <linearGradient id="ch-cushion" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a2828" />
            <stop offset="100%" stopColor="#4a1616" />
          </linearGradient>
          <linearGradient id="ch-wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2e1a0c" />
            <stop offset="100%" stopColor="#1c0e06" />
          </linearGradient>
        </defs>

        {/* Back posts + crest (behind actor — actor always renders on top) */}
        <rect x="20" y="2"  width="9" height="80" rx="4" fill="#2e1a0c" />
        <rect x="59" y="2"  width="9" height="80" rx="4" fill="#2e1a0c" />
        <rect x="18" y="2"  width="52" height="10" rx="5" fill="#3a2010" />
        <ellipse cx="44" cy="42" rx="14" ry="22" fill="none" stroke="#160b04" strokeWidth="2.5" />
        <ellipse cx="44" cy="42" rx="10" ry="17" fill="#1c0d06" opacity="0.5" />
        <rect x="40" y="12" width="8" height="62" rx="4" fill="#2a1608" />
        <rect x="18" y="70" width="52" height="7" rx="3" fill="#2e1a0c" />

        {/* Arm rest posts */}
        <rect x="12" y="68" width="11" height="6" rx="3" fill="#3a2010" />
        <rect x="65" y="68" width="11" height="6" rx="3" fill="#3a2010" />
        <rect x="15" y="73" width="7" height="20" rx="3" fill="url(#ch-wood)" />
        <rect x="66" y="73" width="7" height="20" rx="3" fill="url(#ch-wood)" />

        {/* Back legs */}
        <rect x="24" y="90" width="6" height="47" rx="3" fill="#160b04" opacity="0.75" />
        <rect x="58" y="90" width="6" height="47" rx="3" fill="#160b04" opacity="0.75" />

        {/* Seat frame */}
        <rect x="14" y="88" width="60" height="8" rx="3" fill="#2a1608" />
        <rect x="14" y="88" width="60" height="2" rx="1" fill="rgba(200,155,45,0.25)" />

        {/* Seat cushion */}
        <rect x="17" y="80" width="54" height="14" rx="4" fill="url(#ch-cushion)" />
        <rect x="17" y="80" width="54" height="5"  rx="4" fill="rgba(255,255,255,0.06)" />
        <circle cx="44" cy="87" r="2" fill="#3a1010" />

        {/* Front legs */}
        <rect x="16" y="95" width="8" height="43" rx="4" fill="url(#ch-wood)" />
        <rect x="64" y="95" width="8" height="43" rx="4" fill="url(#ch-wood)" />
        <rect x="16" y="95" width="8" height="3"  rx="1.5" fill="rgba(200,155,45,0.3)" />
        <rect x="64" y="95" width="8" height="3"  rx="1.5" fill="rgba(200,155,45,0.3)" />

        {/* Floor shadow */}
        <ellipse cx="44" cy="137" rx="24" ry="3.5" fill="rgba(0,0,0,0.38)" />
      </svg>
    </div>
  );
}

function ChairFront({
  scale, chairX, chairY, stageH,
}: {
  scale: number;
  chairX: number;
  chairY: number;
  stageH: number;
}) {
  const { left, bottom, w, h } = chairPosition(scale, chairX, chairY, stageH);
  return (
    <div style={{ position: "absolute", left, bottom, width: w, height: h, pointerEvents: "none" }}>
      <svg viewBox="0 0 88 138" width={w} height={h} style={{ display: "block" }}>
        <rect x="17" y="77" width="54" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
        <rect x="10" y="66" width="14" height="6" rx="3" fill="#2a1608" />
        <rect x="64" y="66" width="14" height="6" rx="3" fill="#2a1608" />
      </svg>
    </div>
  );
}

// ── Generic prop (all non-door / non-chair kinds) ────────────
const SPECIAL_KINDS = new Set<StagePropKind>(["door", "chair"]);

function GenericProp({
  prop, scale, stageH, editMode, onStartDrag,
}: {
  prop: StageProp;
  scale: number;
  stageH: number;
  editMode?: boolean;
  onStartDrag?: (e: React.PointerEvent) => void;
}) {
  const dims = PROP_DIMS[prop.kind];
  if (!dims) return null;
  const w = dims.w * scale;
  const h = dims.h * scale;
  const anchor = PROP_ANCHORS[prop.kind] ?? "floor";
  return (
    <div
      onPointerDown={editMode ? onStartDrag : undefined}
      style={{
        position: "absolute",
        left: (prop.x - dims.w / 2) * scale,
        ...(anchor === "top"
          ? { top: prop.y * scale }
          : { bottom: (stageH - prop.y) * scale }),
        width: w,
        height: h,
        cursor: editMode ? (prop.locked ? "default" : "grab") : undefined,
        pointerEvents: editMode ? "auto" : "none",
        opacity: prop.locked ? 0.78 : 1,
        filter: prop.locked ? "grayscale(0.12)" : undefined,
      }}
    >
      <PropSvgForKind kind={prop.kind} />
    </div>
  );
}

// ── Stage background ─────────────────────────────────────────
function TheatricalBackground({
  scale, canvasWidth, canvasHeight, spotX, spotY,
}: {
  scale: number;
  canvasWidth: number;
  canvasHeight: number;
  spotX: number | null;
  spotY: number | null;
  stageH: number;
}) {
  const floorTop = canvasHeight * 0.38;

  return (
    <>
      {/* Base */}
      <div className="absolute inset-0" style={{ background: "#07060d" }} />

      {/* Back wall — deep plum */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: floorTop + 8,
          background: "linear-gradient(to bottom, #0e0610 0%, #140a16 55%, #100d15 100%)",
        }}
      />

      {/* Floor — warm wood perspective */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          top: floorTop,
          background: [
            "repeating-linear-gradient(0deg, transparent, transparent 13px, rgba(0,0,0,0.09) 14px)",
            "linear-gradient(to bottom, #1e0f09 0%, #2c1b0e 40%, #3a2314 75%, #432a17 100%)",
          ].join(", "),
        }}
      />

      {/* Floor/wall seam glow */}
      <div
        className="absolute inset-x-[7%]"
        style={{
          top: floorTop - 1,
          height: 2,
          background:
            "linear-gradient(to right, transparent, rgba(190,110,55,0.14) 20%, rgba(190,110,55,0.14) 80%, transparent)",
        }}
      />
      {/* Dynamic spotlight */}
      {spotX !== null && spotY !== null && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse ${250 * scale}px ${210 * scale}px at ${spotX}px ${spotY}px, rgba(255,200,100,0.1), transparent 70%)`,
          }}
        />
      )}

      {/* Left wing curtain */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: canvasWidth * 0.12,
          background: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}
      />

      {/* Right wing curtain */}
      <div
        className="absolute inset-y-0 right-0 pointer-events-none"
        style={{
          width: canvasWidth * 0.12,
          background: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}
      />

      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: canvasHeight * 0.18,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, transparent 100%)",
        }}
      />

      {/* Bottom grounding shadow */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: canvasHeight * 0.05,
          background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
        }}
      />

      {/* Ambient ceiling glow */}
      <motion.div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: canvasHeight * 0.45,
          background: `radial-gradient(ellipse ${canvasWidth * 0.5}px ${canvasHeight * 0.35}px at 50% 0%, rgba(255,185,80,0.04), transparent 80%)`,
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

// ── Main export ──────────────────────────────────────────────
export function StageCanvas({
  stageState,
  actors,
  selectedRoleId,
  compact = false,
  editMode = false,
  selectedActorId,
  onActorDrop,
  stageConfig,
  onPropDrop,
  drawingPathFor,
  onPathDrawn,
  currentEvent,
}: StageCanvasProps) {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(stageConfig.width);
  const [dragState, setDragState] = useState<{ actorId: string; stageX: number; stageY: number } | null>(null);
  const [propDrag, setPropDrag] = useState<PropDragState | null>(null);
  const [recordingPath, setRecordingPath] = useState<PathPoint[] | null>(null);
  const { getCostume } = useCostumes();

  const stageW = stageConfig.width;
  const stageH = stageConfig.height;
  const stageProps = useMemo(
    () => (editMode ? getStageProps(stageConfig) : stageState.props).map((prop) => (
      propDrag?.propId === prop.id
        ? { ...prop, x: propDrag.stageX, y: propDrag.stageY }
        : prop
    )),
    [editMode, propDrag, stageConfig, stageState.props],
  );
  const orderedProps = useMemo(
    () => [...stageProps].sort((a, b) => (a.layerOrder ?? 0) - (b.layerOrder ?? 0)),
    [stageProps],
  );
  const doorProps    = orderedProps.filter((prop) => prop.kind === "door");
  const chairProps   = orderedProps.filter((prop) => prop.kind === "chair");
  const genericProps = orderedProps.filter((prop) => !SPECIAL_KINDS.has(prop.kind));
  const hangingProps = genericProps.filter((prop) => PROP_LAYERS[prop.kind] === "hanging");
  const backProps = genericProps.filter((prop) => (PROP_LAYERS[prop.kind] ?? "back") === "back");
  const frontProps = genericProps.filter((prop) => PROP_LAYERS[prop.kind] === "front");

  useEffect(() => {
    function measure() {
      if (!containerRef.current) return;
      const w = Math.min(stageW, Math.max(compact ? 200 : 320, containerRef.current.clientWidth));
      setCanvasWidth(w);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [compact, stageW]);

  const scale = canvasWidth / stageW;
  const canvasHeight = stageH * scale;

  const actorsOnStage = useMemo(
    () =>
      Object.values(stageState.actors)
        .filter((a) => a.visible || a.exiting)
        .sort((a, b) => a.y - b.y),
    [stageState.actors],
  );

  const spotPos = useMemo(() => {
    const active = stageState.activeActorId ? stageState.actors[stageState.activeActorId] : null;
    if (!active || !active.visible) return null;
    return {
      x: active.x * scale,
      y: canvasHeight - (stageH - active.y) * scale - (SPRITE_H * scale) / 2,
    };
  }, [stageState.activeActorId, stageState.actors, scale, canvasHeight, stageH]);

  // ── drag helpers ──
  function toStageCoords(clientX: number, clientY: number) {
    if (!stageRef.current) return { x: 0, y: 0 };
    const rect = stageRef.current.getBoundingClientRect();
    return {
      x: Math.round(Math.max(0, Math.min(stageW, (clientX - rect.left) / scale))),
      y: Math.round(Math.max(0, Math.min(stageH, (clientY - rect.top) / scale))),
    };
  }

  const PATH_POINT_DISTANCE = 12; // min stage-unit distance between recorded points

  function handleStagePointerDown(e: React.PointerEvent) {
    if (!editMode) return;
    if (drawingPathFor) {
      e.stopPropagation();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      const pos = toStageCoords(e.clientX, e.clientY);
      // Start path from actor's current stage position so animation is seamless
      const actorState = stageState.actors[drawingPathFor];
      const startPoint = actorState ? { x: actorState.x, y: actorState.y } : pos;
      setRecordingPath([startPoint]);
    }
  }

  function handleStagePointerMove(e: React.PointerEvent) {
    if (!editMode) return;
    const pos = toStageCoords(e.clientX, e.clientY);
    if (drawingPathFor && recordingPath) {
      const last = recordingPath[recordingPath.length - 1];
      const dx = pos.x - last.x;
      const dy = pos.y - last.y;
      if (Math.sqrt(dx * dx + dy * dy) >= PATH_POINT_DISTANCE) {
        setRecordingPath((p) => p ? [...p, pos] : [pos]);
      }
      return;
    }
    if (dragState) setDragState((prev) => prev ? { ...prev, stageX: pos.x, stageY: pos.y } : null);
    if (propDrag) setPropDrag((prev) => prev ? { ...prev, stageX: pos.x, stageY: pos.y } : null);
  }

  function handleStagePointerUp(e: React.PointerEvent) {
    if (!editMode) return;
    const pos = toStageCoords(e.clientX, e.clientY);
    if (drawingPathFor && recordingPath) {
      const finalPath = recordingPath.length < 2 ? [...recordingPath, pos] : recordingPath;
      onPathDrawn?.(finalPath);
      setRecordingPath(null);
      return;
    }
    if (dragState) {
      onActorDrop?.(dragState.actorId, pos.x, pos.y);
      setDragState(null);
    }
    if (propDrag) {
      onPropDrop?.(propDrag.propId, pos.x, pos.y);
      setPropDrag(null);
    }
  }

  function startPropDrag(prop: StageProp) {
    return (e: React.PointerEvent) => {
      if (prop.locked) return;
      e.stopPropagation();
      e.preventDefault();
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      const pos = toStageCoords(e.clientX, e.clientY);
      setPropDrag({ propId: prop.id, kind: prop.kind, stageX: pos.x, stageY: pos.y });
    };
  }

  return (
    <div ref={containerRef} className="w-full">
      <div
        ref={stageRef}
        className="relative overflow-hidden rounded-xl"
        style={{
          width: canvasWidth,
          height: canvasHeight,
          cursor: drawingPathFor
            ? (recordingPath ? "crosshair" : "cell")
            : dragState ? "grabbing" : editMode ? "crosshair" : "default",
        }}
        onPointerDown={handleStagePointerDown}
        onPointerMove={handleStagePointerMove}
        onPointerUp={handleStagePointerUp}
        onPointerCancel={() => { setDragState(null); setPropDrag(null); if (recordingPath) { onPathDrawn?.(recordingPath); setRecordingPath(null); } }}
        onMouseLeave={() => { setDragState(null); setPropDrag(null); if (recordingPath) { onPathDrawn?.(recordingPath); setRecordingPath(null); } }}
      >
        <TheatricalBackground
          scale={scale}
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          stageH={stageH}
          spotX={editMode ? null : (spotPos?.x ?? null)}
          spotY={editMode ? null : (spotPos?.y ?? null)}
        />

        {hangingProps.map((prop) => (
          <GenericProp
            key={prop.id}
            prop={prop}
            scale={scale}
            stageH={stageH}
            editMode={editMode}
            onStartDrag={editMode ? startPropDrag(prop) : undefined}
          />
        ))}

        {(editMode ? orderedProps : orderedProps.filter((prop) => prop.label)).map((prop) => (
          <PropLabel
            key={`${prop.id}-label`}
            prop={prop}
            scale={scale}
            stageH={stageH}
          />
        ))}

        {doorProps.map((prop) => (
          <DoorProp
            key={prop.id}
            scale={scale}
            doorX={prop.x}
            doorY={prop.y}
            stageH={stageH}
            editMode={editMode}
            onStartDrag={editMode ? startPropDrag(prop) : undefined}
          />
        ))}

        {chairProps.map((prop) => (
          <ChairBack
            key={prop.id}
            scale={scale}
            chairX={prop.x}
            chairY={prop.y}
            stageH={stageH}
            editMode={editMode}
            onStartDrag={editMode ? startPropDrag(prop) : undefined}
          />
        ))}

        {backProps.map((prop) => (
          <GenericProp
            key={prop.id}
            prop={prop}
            scale={scale}
            stageH={stageH}
            editMode={editMode}
            onStartDrag={editMode ? startPropDrag(prop) : undefined}
          />
        ))}

        {/* Edit mode: grid overlay */}
        {editMode && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: [
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              ].join(","),
              backgroundSize: `${80 * scale}px ${80 * scale}px`,
            }}
          />
        )}

        {/* Path overlay — only in edit mode */}
        {editMode && (() => {
          const showPath = currentEvent?.type === "move_path" && currentEvent.path && currentEvent.path.length > 1
            ? currentEvent.path
            : null;
          const activePath = recordingPath && recordingPath.length > 1 ? recordingPath : null;
          if (!showPath && !activePath) return null;

          // Stage y=0 is top, y increases downward — matches SVG natural direction
          function toSvgPts(pts: PathPoint[]) {
            return pts.map((p) => `${p.x * scale},${p.y * scale}`).join(" ");
          }

          return (
            <svg
              className="absolute inset-0 pointer-events-none"
              style={{ width: canvasWidth, height: canvasHeight }}
            >
              {showPath && (
                <>
                  <polyline
                    points={toSvgPts(showPath)}
                    fill="none"
                    stroke="#e0a4f8"
                    strokeWidth={2 * scale}
                    strokeDasharray={`${6 * scale},${4 * scale}`}
                    strokeOpacity={0.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {showPath.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x * scale}
                      cy={p.y * scale}
                      r={i === 0 || i === showPath.length - 1 ? 4 * scale : 2.5 * scale}
                      fill={i === showPath.length - 1 ? "#e0a4f8" : "#e0a4f866"}
                    />
                  ))}
                </>
              )}
              {activePath && (
                <>
                  <polyline
                    points={toSvgPts(activePath)}
                    fill="none"
                    stroke="#e0a4f8"
                    strokeWidth={2.5 * scale}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity={0.9}
                  />
                  {activePath.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x * scale}
                      cy={p.y * scale}
                      r={2 * scale}
                      fill="#e0a4f8"
                      opacity={0.8}
                    />
                  ))}
                </>
              )}
            </svg>
          );
        })()}

        {actorsOnStage.map((actor) => {
          const actorData = getActorById(actors, actor.actorId);
          if (!actorData) return null;

          const spriteW = SPRITE_W * scale;
          const spriteH = SPRITE_H * scale;

          // Use drag position if dragging this actor
          const isDragging = dragState?.actorId === actor.actorId;
          const displayX = isDragging ? dragState!.stageX : actor.x;
          const displayY = isDragging ? dragState!.stageY : actor.y;

          const targetLeft = displayX * scale - spriteW / 2;
          const targetBottom = (stageH - displayY) * scale;
          const isSelected = actor.actorId === selectedRoleId;
          const isSpeaking = !editMode && actor.actorId === stageState.activeActorId;
          const isEditSelected = editMode && actor.actorId === selectedActorId;

          const isPathAnim =
            !editMode &&
            !isDragging &&
            currentEvent?.type === "move_path" &&
            currentEvent.actorId === actor.actorId &&
            !!currentEvent.path &&
            currentEvent.path.length > 1;

          const pathAnimateProps = isPathAnim
            ? {
                left: currentEvent!.path!.map((p) => p.x * scale - spriteW / 2),
                bottom: currentEvent!.path!.map((p) => (stageH - p.y) * scale),
                opacity: actor.opacity,
              }
            : null;

          const pathTransitionProps = isPathAnim
            ? {
                duration: currentEvent!.duration,
                ease: "linear" as const,
                times: currentEvent!.path!.map((_, i) =>
                  i / Math.max(1, currentEvent!.path!.length - 1),
                ),
              }
            : null;

          return (
            <motion.div
              key={isPathAnim ? `${actor.actorId}_path_${currentEvent!.id}` : actor.actorId}
              animate={
                isDragging
                  ? { left: targetLeft, bottom: targetBottom, opacity: 1 }
                  : pathAnimateProps
                    ?? { left: targetLeft, bottom: targetBottom, opacity: editMode ? 1 : actor.opacity }
              }
              transition={
                isDragging
                  ? { duration: 0 }
                  : pathTransitionProps
                    ?? {
                        left: { type: "spring", damping: 32, stiffness: 110 },
                        bottom: { type: "spring", damping: 32, stiffness: 110 },
                        opacity: { duration: 0.4 },
                      }
              }
              style={{
                position: "absolute",
                width: spriteW,
                height: spriteH,
                cursor: editMode ? "grab" : "default",
                zIndex: isDragging ? 50 : undefined,
              }}
              onPointerDown={
                editMode
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                      const pos = toStageCoords(e.clientX, e.clientY);
                      setDragState({ actorId: actor.actorId, stageX: pos.x, stageY: pos.y });
                    }
                  : undefined
              }
            >
              {/* Edit selection ring */}
              {isEditSelected && (
                <div
                  className="absolute inset-0 rounded-sm pointer-events-none"
                  style={{ boxShadow: `0 0 0 2px ${actorData.color}, 0 0 12px ${actorData.color}60` }}
                />
              )}

              <motion.div
                animate={{ scaleX: actor.facing === "left" ? -1 : 1, scale: editMode ? 1 : actor.scale }}
                transition={{ type: "spring", damping: 26, stiffness: 130 }}
                style={{ width: "100%", height: "100%", transformOrigin: "bottom center" }}
              >
                <HumanActorSprite
                  actorId={actor.actorId}
                  actorColor={actorData.color}
                  animationState={editMode ? "idle" : actor.animationState}
                  expression={actor.expression}
                  pose={actor.pose}
                  isSpeaking={isSpeaking}
                  isSelected={isSelected}
                  scale={scale}
                  costume={getCostume(actor.actorId)}
                />
              </motion.div>

              {/* Edit mode: name label + coordinates */}
              {editMode && (
                <div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-medium pointer-events-none"
                  style={{ color: actorData.color }}
                >
                  {actorData.shortLabel}
                  {isDragging && (
                    <span className="ml-1 text-white/50">
                      ({dragState!.stageX},{dragState!.stageY})
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}

        {chairProps.map((prop) => (
          <ChairFront
            key={`${prop.id}-front`}
            scale={scale}
            chairX={prop.x}
            chairY={prop.y}
            stageH={stageH}
          />
        ))}

        {frontProps.map((prop) => (
          <GenericProp
            key={prop.id}
            prop={prop}
            scale={scale}
            stageH={stageH}
            editMode={editMode}
            onStartDrag={editMode ? startPropDrag(prop) : undefined}
          />
        ))}

        {/* Path drawing mode banner */}
        {drawingPathFor && (
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{ border: "2px solid #e0a4f855", boxShadow: "inset 0 0 24px rgba(224,164,248,0.07)" }}
          >
            <div
              className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-medium"
              style={{ background: "rgba(224,164,248,0.15)", color: "#e0a4f8", border: "1px solid rgba(224,164,248,0.3)" }}
            >
              {recordingPath ? t("stage.drawingPath", { count: recordingPath.length }) : t("stage.drawPathHint")}
            </div>
          </div>
        )}

        {/* Actor drag tooltip */}
        {editMode && dragState && (
          <div
            className="absolute pointer-events-none rounded bg-black/80 border border-white/20 px-2 py-1 text-[10px] text-white/80 z-50"
            style={{
              left: dragState.stageX * scale + 12,
              bottom: (stageH - dragState.stageY) * scale + 12,
            }}
          >
            ({dragState.stageX}, {dragState.stageY})
          </div>
        )}

        {/* Prop drag tooltip */}
        {editMode && propDrag && (
          <div
            className="absolute pointer-events-none rounded bg-black/80 border border-yellow-400/30 px-2 py-1 text-[10px] text-yellow-300/80 z-50"
            style={{
              left: propDrag.stageX * scale + 12,
              bottom: (stageH - propDrag.stageY) * scale + 12,
            }}
          >
            {t(`stage.${propDrag.kind}` as never)} ({propDrag.stageX}, {propDrag.stageY})
          </div>
        )}
      </div>
    </div>
  );
}
