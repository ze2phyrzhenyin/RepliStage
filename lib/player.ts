import {
  Actor,
  ActorPose,
  ActorVariant,
  Expression,
  ScriptDefinition,
  ScriptEvent,
  StageProp,
  StageActorState,
} from "@/types/script";
import { getStageProp, getStageProps } from "@/lib/stage-props";

export type DerivedStageState = {
  actors: Record<string, StageActorState>;
  props: StageProp[];
  blackoutVisible: boolean;
  currentEvent: ScriptEvent;
  currentLineText: string | null;
  currentActionText: string | null;
  sceneEnded: boolean;
  activeActorId: string | null;
};

export const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5] as const;

const ACTOR_VARIANTS: Record<string, ActorVariant> = {
  belle_mere: "lively",
  soeur_grande: "lively",
  soeur_petite: "steady",
  roi: "steady",
  garde_1: "steady",
  garde_2: "steady",
  tres_jeune_fille: "leaning",
};

const DEFAULT_EXPRESSIONS: Record<string, Expression> = {
  belle_mere: "anxious",
  soeur_grande: "annoyed",
  soeur_petite: "neutral",
  roi: "focused",
  garde_1: "focused",
  garde_2: "focused",
  tres_jeune_fille: "flustered",
};

export function getActorById(actors: Actor[], actorId?: string): Actor | undefined {
  return actors.find((actor) => actor.id === actorId);
}

function getDefaultExpression(actorId: string): Expression {
  return DEFAULT_EXPRESSIONS[actorId] ?? "neutral";
}

function getVariant(actorId: string): ActorVariant {
  return ACTOR_VARIANTS[actorId] ?? "steady";
}

function getExpressionForLine(actorId: string): Expression {
  if (actorId === "belle_mere") return "annoyed";
  if (actorId === "soeur_grande") return "anxious";
  if (actorId === "soeur_petite") return "neutral";
  if (actorId === "roi") return "focused";
  if (actorId === "tres_jeune_fille") return "flustered";
  return "focused";
}

function getExpressionForAction(text?: string, actorId?: string): Expression | null {
  const normalized = text?.toLowerCase() ?? "";

  if (
    normalized.includes("怒") ||
    normalized.includes("爆发") ||
    normalized.includes("危险") ||
    normalized.includes("menaç")
  ) {
    return "annoyed";
  }

  if (
    normalized.includes("踱步") ||
    normalized.includes("僵住") ||
    normalized.includes("stup") ||
    normalized.includes("危机")
  ) {
    return "anxious";
  }

  if (
    normalized.includes("吸尘器") ||
    normalized.includes("疲惫") ||
    normalized.includes("直率") ||
    normalized.includes("喘") ||
    normalized.includes("挤")
  ) {
    return "flustered";
  }

  if (
    normalized.includes("庄重") ||
    normalized.includes("镇定") ||
    normalized.includes("神秘") ||
    normalized.includes("机会")
  ) {
    return "focused";
  }

  if (
    normalized.includes("低头") ||
    normalized.includes("送别") ||
    normalized.includes("缓和") ||
    normalized.includes("释然")
  ) {
    return "relieved";
  }

  if (actorId) {
    return getDefaultExpression(actorId);
  }

  return null;
}

function getIdleScale(variant: ActorVariant) {
  if (variant === "steady") return 1;
  if (variant === "lively") return 1.02;
  return 0.99;
}

function getIdleOpacity(visible: boolean) {
  return visible ? 0.92 : 0;
}

function createActorState(actorId: string, x: number, y: number, visible: boolean): StageActorState {
  const variant = getVariant(actorId);

  return {
    actorId,
    x,
    y,
    visible,
    facing: "front",
    exiting: false,
    expression: getDefaultExpression(actorId),
    animationState: "idle",
    opacity: getIdleOpacity(visible),
    scale: getIdleScale(variant),
    variant,
    pose: "stand",
  };
}

function getInitialPosition(scene: ScriptDefinition, actorId: string) {
  const rightOffset = scene.stage.width + 90;
  const presets: Record<string, { x: number; y: number }> = {
    belle_mere: { x: -90, y: 332 },
    soeur_grande: { x: rightOffset, y: 292 },
    soeur_petite: { x: rightOffset, y: 344 },
    roi: { x: -90, y: 200 },
    garde_1: { x: -90, y: 235 },
    garde_2: { x: -90, y: 230 },
    tres_jeune_fille: { x: rightOffset, y: 404 },
  };

  return presets[actorId] ?? { x: rightOffset, y: 340 };
}

export function getInitialActorMap(scene: ScriptDefinition) {
  return Object.fromEntries(
    scene.actors.map((actor) => {
      const initial = getInitialPosition(scene, actor.id);
      return [actor.id, createActorState(actor.id, initial.x, initial.y, false)];
    }),
  ) as Record<string, StageActorState>;
}

function entryPosition(scene: ScriptDefinition, side: ScriptEvent["fromSide"], actorId: string) {
  const fallback = getInitialPosition(scene, actorId);
  const door = getStageProp(scene.stage, "door");

  switch (side) {
    case "left":
      return { x: -90, y: fallback.y, facing: "right" as const };
    case "right":
      return { x: scene.stage.width + 90, y: fallback.y, facing: "left" as const };
    case "top":
      return { x: fallback.x === door?.x ? door.x : fallback.x, y: -80, facing: "front" as const };
    default:
      return { x: fallback.x, y: scene.stage.height + 60, facing: "front" as const };
  }
}

function exitPosition(scene: ScriptDefinition, side: ScriptEvent["toSide"], current: StageActorState) {
  const door = getStageProp(scene.stage, "door");

  switch (side) {
    case "left":
      return { ...current, x: -90, facing: "left" as const };
    case "right":
      return { ...current, x: scene.stage.width + 90, facing: "right" as const };
    case "top":
      return { ...current, y: (door?.y ?? 98) + 22, facing: "front" as const };
    default:
      return { ...current, y: scene.stage.height + 60, facing: "front" as const };
  }
}

function applyActorFocus(
  actors: Record<string, StageActorState>,
  activeActorId: string | null,
  currentEvent: ScriptEvent,
) {
  const hasSpeaker = Boolean(activeActorId);

  for (const actor of Object.values(actors)) {
    if (!actor.visible && !actor.exiting) {
      actor.opacity = 0;
      continue;
    }

    const isActive = actor.actorId === activeActorId;
    const idleScale = getIdleScale(actor.variant);

    actor.opacity = hasSpeaker ? (isActive ? 1 : 0.42) : 0.9;
    actor.scale = isActive
      ? currentEvent.type === "line"
        ? 1.06
        : currentEvent.type === "action"
          ? 1.04
          : currentEvent.type === "exit"
            ? 0.94
            : 1.02
      : idleScale;

    if (!isActive && actor.animationState !== "exit") {
      actor.animationState = "idle";
    }
  }
}

function sitStandYShift(currentPose: ActorPose, newPose: ActorPose): number {
  if (currentPose === "sit" && newPose === "stand") return 35;
  if (currentPose === "stand" && newPose === "sit") return -35;
  return 0;
}

const SITTABLE_ACTORS = new Set(["belle_mere"]);

function inferPoseFromText(currentPose: ActorPose, actorId: string | undefined, text?: string): ActorPose {
  if (!actorId || !text || !SITTABLE_ACTORS.has(actorId)) return currentPose;
  const normalized = text.toLowerCase();

  if (
    normalized.includes("瘫坐") ||
    normalized.includes("坐回") ||
    normalized.includes("坐在") ||
    normalized.includes("restez assise") ||
    normalized.includes("assise")
  ) {
    return "sit";
  }

  if (
    normalized.includes("站起") ||
    normalized.includes("起身") ||
    normalized.includes("从椅子上站起来") ||
    normalized.includes("se lève")
  ) {
    return "stand";
  }

  return currentPose;
}

function applySceneDirection(
  actors: Record<string, StageActorState>,
  event: ScriptEvent,
  activeActorId: string | null,
) {
  const text = event.text?.toLowerCase() ?? "";

  if (text.includes("踱步")) {
    const grande = actors["soeur_grande"];
    if (grande?.visible) {
      grande.animationState = "move";
      grande.expression = "anxious";
      grande.pose = "stand";
      grande.opacity = activeActorId === "soeur_grande" ? 1 : Math.max(grande.opacity, 0.72);
    }
  }

  if (event.actorId === "roi" && (event.type === "line" || event.type === "action")) {
    for (const guardId of ["garde_1", "garde_2"] as const) {
      const guard = actors[guardId];
      if (!guard?.visible) continue;
      guard.facing = "front";
      guard.pose = "stand";
      if (guard.animationState !== "exit") {
        guard.animationState = "idle";
      }
      guard.expression = "focused";
      guard.scale = Math.max(guard.scale, 1);
      guard.opacity = activeActorId === "roi" ? 0.62 : Math.max(guard.opacity, 0.56);
    }
  }

  if (event.actorId === "belle_mere" && event.type === "line") {
    const mother = actors["belle_mere"];
    if (!mother) return;

    if (text.includes("majesté") || text.includes("monseigneur")) {
      mother.pose = "sit";
      mother.animationState = "talk";
      mother.expression = "focused";
    }

    if (
      text.includes("qu’est-ce que tu viens de dire") ||
      text.includes("fais bien attention") ||
      text.includes("tout est cassé")
    ) {
      mother.pose = "stand";
      mother.animationState = "action";
      mother.expression = "annoyed";
      mother.scale = Math.max(mother.scale, 1.08);
    }
  }
}

export function deriveStageState(
  scene: ScriptDefinition,
  currentEventIndex: number,
  events: ScriptEvent[] = scene.events,
): DerivedStageState {
  const actors = getInitialActorMap(scene);
  let props = getStageProps(scene.stage);
  let blackoutVisible = false;
  let currentLineText: string | null = null;
  let currentActionText: string | null = null;
  let sceneEnded = false;
  let activeActorId: string | null = null;

  const boundedIndex = Math.max(0, Math.min(currentEventIndex, events.length - 1));

  for (let i = 0; i <= boundedIndex; i += 1) {
    const event = events[i];

    switch (event.type) {
      case "blackout_start":
        blackoutVisible = true;
        break;
      case "blackout_end":
        blackoutVisible = false;
        break;
      case "enter":
        if (event.actorId && typeof event.x === "number" && typeof event.y === "number") {
          const base = entryPosition(scene, event.fromSide, event.actorId);
          const next = createActorState(event.actorId, event.x, event.y, true);
          next.facing = base.facing;
          next.animationState = "enter";
          next.expression = getDefaultExpression(event.actorId);
          next.opacity = 1;
          next.pose = event.actorId === "belle_mere" ? "sit" : "stand";
          actors[event.actorId] = next;
          activeActorId = event.actorId;
        }
        currentLineText = null;
        currentActionText = null;
        break;
      case "move":
        if (event.actorId && typeof event.x === "number" && typeof event.y === "number") {
          const current = actors[event.actorId];
          const facing =
            event.x > current.x ? "right" : event.x < current.x ? "left" : current.facing;

          actors[event.actorId] = {
            ...current,
            x: event.x,
            y: event.y,
            visible: true,
            facing,
            exiting: false,
            animationState: "move",
            opacity: 1,
            scale: 1.03,
            pose: "stand",
          };
          activeActorId = event.actorId;
        }
        currentLineText = null;
        currentActionText = null;
        break;
      case "move_path":
        if (event.actorId && event.path && event.path.length > 0) {
          const last = event.path[event.path.length - 1];
          const first = event.path[0];
          const current = actors[event.actorId];
          const facing =
            last.x > first.x ? "right" : last.x < first.x ? "left" : current.facing;
          actors[event.actorId] = {
            ...current,
            x: last.x,
            y: last.y,
            visible: true,
            facing,
            exiting: false,
            animationState: "move",
            opacity: 1,
            scale: 1.03,
            pose: "stand",
          };
          activeActorId = event.actorId;
        }
        currentLineText = null;
        currentActionText = null;
        break;
      case "line":
        currentLineText = event.text ?? null;
        currentActionText = null;
        activeActorId = event.actorId ?? null;
        if (event.actorId) {
          const current = actors[event.actorId];
          const newPoseLine = event.pose ?? inferPoseFromText(current.pose, event.actorId, event.text);
          actors[event.actorId] = {
            ...current,
            animationState: "talk",
            expression: getExpressionForLine(event.actorId),
            opacity: 1,
            scale: 1.06,
            pose: newPoseLine,
            y: current.y + sitStandYShift(current.pose, newPoseLine),
          };
        }
        break;
      case "action":
        currentActionText = event.text ?? null;
        currentLineText = null;
        activeActorId = event.actorId ?? null;
        if (event.actorId) {
          const current = actors[event.actorId];
          const newPoseAction = event.pose ?? inferPoseFromText(current.pose, event.actorId, event.text);
          actors[event.actorId] = {
            ...current,
            animationState: "action",
            expression: getExpressionForAction(event.text, event.actorId) ?? current.expression,
            opacity: 1,
            scale: 1.04,
            pose: newPoseAction,
            y: current.y + sitStandYShift(current.pose, newPoseAction),
          };
        }
        break;
      case "prop_show":
        if (event.propId) {
          const sceneProp = getStageProps(scene.stage).find((prop) => prop.id === event.propId);
          if (sceneProp && !props.some((prop) => prop.id === event.propId)) {
            props = [...props, { ...sceneProp }];
          }
        }
        currentActionText = event.text ?? null;
        currentLineText = null;
        activeActorId = null;
        break;
      case "prop_hide":
        if (event.propId) {
          props = props.filter((prop) => prop.id !== event.propId);
        }
        currentActionText = event.text ?? null;
        currentLineText = null;
        activeActorId = null;
        break;
      case "prop_swap":
        if (event.propId && event.nextPropKind) {
          const nextKind = event.nextPropKind;
          props = props.map((prop) => (
            prop.id === event.propId
              ? { ...prop, kind: nextKind }
              : prop
          ));
        }
        currentActionText = event.text ?? null;
        currentLineText = null;
        activeActorId = null;
        break;
      case "exit":
        if (event.actorId) {
          const current = actors[event.actorId];
          actors[event.actorId] = {
            ...exitPosition(scene, event.toSide, current),
            expression: event.actorId === "belle_mere" ? "focused" : "relieved",
            animationState: "exit",
            exiting: true,
            visible: true,
            opacity: 0,
            scale: 0.88,
          };
          activeActorId = event.actorId;
        }
        currentLineText = null;
        currentActionText = null;
        break;
      case "pause":
        currentLineText = null;
        currentActionText = null;
        activeActorId = null;
        break;
      case "scene_end":
        sceneEnded = true;
        currentLineText = null;
        currentActionText = null;
        activeActorId = null;
        break;
      default:
        break;
    }
  }

  applySceneDirection(actors, events[boundedIndex], activeActorId);
  applyActorFocus(actors, activeActorId, events[boundedIndex]);

  if (events[boundedIndex]?.type !== "exit") {
    for (const actor of Object.values(actors)) {
      if (!actor.visible) {
        actor.exiting = false;
      }
    }
  }

  return {
    actors,
    props,
    blackoutVisible,
    currentEvent: events[boundedIndex],
    currentLineText,
    currentActionText,
    sceneEnded,
    activeActorId,
  };
}

export function isOwnLine(event: ScriptEvent, selectedRoleId: string | null) {
  return event.type === "line" && event.actorId === selectedRoleId;
}

export function getVisibleLineText(
  event: ScriptEvent,
  selectedRoleId: string | null,
  showAllLines: boolean,
  revealedLineIds: Set<string>,
  hiddenPrompt = "轮到你了",
) {
  if (event.type !== "line") {
    return null;
  }

  if (showAllLines || event.actorId !== selectedRoleId || revealedLineIds.has(event.id)) {
    return event.text ?? null;
  }

  return hiddenPrompt;
}

export function getEventDurationMs(
  index: number,
  speed: number,
  events: ScriptEvent[],
) {
  const event = events[index];
  return ((event?.duration ?? 1) * 1000) / speed;
}
