import type { StageConfig, StageProp, StagePropKind } from "@/types/script";

const DEFAULT_STAGE_PROPS: Record<StagePropKind, StageProp> = {
  door: { id: "door", kind: "door", x: 160, y: 98 },
  chair: { id: "chair", kind: "chair", x: 460, y: 348 },
};

function cloneStageProp(prop: StageProp): StageProp {
  return { ...prop };
}

type NormalizeStagePropOptions = {
  includeDefaults?: boolean;
};

export function normalizeStageProps(stage: StageConfig, options: NormalizeStagePropOptions = {}): StageProp[] {
  const { includeDefaults = true } = options;
  if (Array.isArray(stage.props) && stage.props.length > 0) {
    return stage.props.map(cloneStageProp);
  }

  const props: StageProp[] = [];
  if (typeof stage.doorX === "number" || typeof stage.doorY === "number") {
    props.push({
      id: "door",
      kind: "door",
      x: stage.doorX ?? DEFAULT_STAGE_PROPS.door.x,
      y: stage.doorY ?? DEFAULT_STAGE_PROPS.door.y,
    });
  }

  if (typeof stage.chairX === "number" && typeof stage.chairY === "number") {
    props.push({
      id: "chair",
      kind: "chair",
      x: stage.chairX,
      y: stage.chairY,
    });
  }

  if (props.length === 0 && includeDefaults) {
    props.push(cloneStageProp(DEFAULT_STAGE_PROPS.door));
  }

  return props;
}

export function getStageProp(stage: StageConfig, kind: StagePropKind): StageProp | null {
  return normalizeStageProps(stage).find((prop) => prop.kind === kind) ?? null;
}

export function hasStageProp(stage: StageConfig, kind: StagePropKind): boolean {
  return normalizeStageProps(stage, { includeDefaults: false }).some((prop) => prop.kind === kind);
}

export function upsertStageProp(stage: StageConfig, nextProp: StageProp): StageConfig {
  const props = normalizeStageProps(stage);
  const nextProps = props.some((prop) => prop.kind === nextProp.kind)
    ? props.map((prop) => (prop.kind === nextProp.kind ? cloneStageProp(nextProp) : prop))
    : [...props, cloneStageProp(nextProp)];

  return syncStageLegacyFields({ ...stage, props: nextProps });
}

export function removeStageProp(stage: StageConfig, kind: StagePropKind): StageConfig {
  const nextProps = normalizeStageProps(stage).filter((prop) => prop.kind !== kind);
  return syncStageLegacyFields({ ...stage, props: nextProps });
}

export function createDefaultStageProp(kind: StagePropKind): StageProp {
  return cloneStageProp(DEFAULT_STAGE_PROPS[kind]);
}

export function syncStageLegacyFields(stage: StageConfig): StageConfig {
  const props = Array.isArray(stage.props) ? stage.props.map(cloneStageProp) : normalizeStageProps(stage);
  const door = props.find((prop) => prop.kind === "door") ?? DEFAULT_STAGE_PROPS.door;
  const chair = props.find((prop) => prop.kind === "chair") ?? null;

  return {
    ...stage,
    doorX: door.x,
    doorY: door.y,
    chairX: chair?.x,
    chairY: chair?.y,
    props,
  };
}
