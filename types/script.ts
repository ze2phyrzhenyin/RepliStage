export type Facing = "left" | "right" | "front";

export type Expression =
  | "neutral"
  | "focused"
  | "anxious"
  | "flustered"
  | "annoyed"
  | "relieved";

export type AnimationState = "idle" | "enter" | "move" | "talk" | "action" | "exit";

export type ActorVariant = "steady" | "lively" | "leaning";
export type ActorPose = "stand" | "sit";

// ── Costume system ───────────────────────────────────────────
export type SkinTone = "fair" | "tan" | "dark";
export type AnimalType = "tiger" | "rabbit" | "panda";

export type CostumeVariant =
  | { kind: "character"; skinTone: SkinTone }
  | { kind: "animal"; animal: AnimalType }
  | { kind: "silhouette" };

// ── Core actor/stage types ───────────────────────────────────
export type Actor = {
  id: string;
  name: string;
  color: string;
  shortLabel: string;
};

export type StagePropKind =
  | "door" | "chair"
  // Cinderella / Cendrillon
  | "magic_box" | "carriage" | "parade_umbrella" | "microphone_stand"
  | "shoe" | "bed" | "dance_light"
  // 秦琼卖马
  | "counter_table" | "display_shelf" | "plate_stand" | "suitcase"
  | "porcelain_plate" | "broken_plate" | "tea_set" | "signboard_yiyuanzhai";

export type StageProp = {
  id: string;
  kind: StagePropKind;
  x: number;
  y: number;
  label?: string;
  locked?: boolean;
  layerOrder?: number;
};

export type StageConfig = {
  width: number;
  height: number;
  doorX?: number;
  doorY?: number;
  /** Chair center X in stage units (default 460) */
  chairX?: number;
  /** Chair floor Y in stage units (default 348) */
  chairY?: number;
  props?: StageProp[];
};

export type StageActorState = {
  actorId: string;
  x: number;
  y: number;
  visible: boolean;
  facing: Facing;
  exiting?: boolean;
  expression: Expression;
  animationState: AnimationState;
  opacity: number;
  scale: number;
  variant: ActorVariant;
  pose: ActorPose;
};

export type PathPoint = { x: number; y: number };

type BaseEvent = {
  id: string;
  type:
    | "blackout_start"
    | "blackout_end"
    | "enter"
    | "move"
    | "move_path"
    | "line"
    | "action"
    | "prop_show"
    | "prop_hide"
    | "prop_swap"
    | "exit"
    | "pause"
    | "scene_end";
  duration: number;
  actorId?: string;
  propId?: string;
  propKind?: StagePropKind;
  nextPropKind?: StagePropKind;
  text?: string;
  x?: number;
  y?: number;
  fromSide?: "left" | "right" | "top" | "bottom";
  toSide?: "left" | "right" | "top" | "bottom";
  /** Explicit pose override — set by director panel to bypass text inference */
  pose?: ActorPose;
  /** Waypoints for move_path events */
  path?: PathPoint[];
};

export type ScriptEvent = BaseEvent;

export type ScriptDefinition = {
  id: string;
  title: string;
  subtitle: string;
  setting: string;
  actors: Actor[];
  stage: StageConfig;
  events: ScriptEvent[];
};

/** A full play with multiple scenes */
export type Play = {
  id: string;
  title: string;
  scenes: ScriptDefinition[];
};

export type PlaySource =
  | { type: "sample"; sampleId: string }
  | { type: "imported" }
  | { type: "edited" };
