import type { StageConfig, StageProp, StagePropKind } from "@/types/script";

export const STAGE_PROP_KINDS: StagePropKind[] = [
  "door",
  "chair",
  "magic_box",
  "carriage",
  "parade_umbrella",
  "microphone_stand",
  "shoe",
  "bed",
  "dance_light",
  "counter_table",
  "display_shelf",
  "plate_stand",
  "suitcase",
  "porcelain_plate",
  "broken_plate",
  "tea_set",
  "signboard_yiyuanzhai",
];

const DEFAULT_STAGE_PROPS: Record<StagePropKind, StageProp> = {
  door:                 { id: "door",                 kind: "door",                 x: 160, y:  98 },
  chair:                { id: "chair",                kind: "chair",                x: 460, y: 348 },
  // Cinderella
  magic_box:            { id: "magic_box",            kind: "magic_box",            x: 300, y: 400 },
  carriage:             { id: "carriage",             kind: "carriage",             x: 750, y: 430 },
  parade_umbrella:      { id: "parade_umbrella",      kind: "parade_umbrella",      x: 200, y: 360 },
  microphone_stand:     { id: "microphone_stand",     kind: "microphone_stand",     x: 460, y: 410 },
  shoe:                 { id: "shoe",                 kind: "shoe",                 x: 460, y: 460 },
  bed:                  { id: "bed",                  kind: "bed",                  x: 460, y: 450 },
  dance_light:          { id: "dance_light",          kind: "dance_light",          x: 460, y: 100 },
  // 秦琼卖马
  counter_table:        { id: "counter_table",        kind: "counter_table",        x: 460, y: 400 },
  display_shelf:        { id: "display_shelf",        kind: "display_shelf",        x: 800, y: 350 },
  plate_stand:          { id: "plate_stand",          kind: "plate_stand",          x: 520, y: 410 },
  suitcase:             { id: "suitcase",             kind: "suitcase",             x: 300, y: 452 },
  porcelain_plate:      { id: "porcelain_plate",      kind: "porcelain_plate",      x: 460, y: 420 },
  broken_plate:         { id: "broken_plate",         kind: "broken_plate",         x: 460, y: 455 },
  tea_set:              { id: "tea_set",              kind: "tea_set",              x: 380, y: 400 },
  signboard_yiyuanzhai: { id: "signboard_yiyuanzhai", kind: "signboard_yiyuanzhai", x: 460, y:  70 },
};

function cloneStageProp(prop: StageProp): StageProp {
  return { ...prop };
}

type NormalizeStagePropOptions = {
  includeDefaults?: boolean;
};

export function normalizeStageProps(stage: StageConfig, options: NormalizeStagePropOptions = {}): StageProp[] {
  const { includeDefaults = false } = options;
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
    props.push({
      ...cloneStageProp(DEFAULT_STAGE_PROPS.door),
      id: createStagePropId("door"),
    });
  }

  return props;
}

export function getStageProps(stage: StageConfig, kind?: StagePropKind): StageProp[] {
  const props = normalizeStageProps(stage);
  return kind ? props.filter((prop) => prop.kind === kind) : props;
}

export function getStageProp(stage: StageConfig, kind: StagePropKind): StageProp | null {
  return getStageProps(stage, kind)[0] ?? null;
}

export function hasStageProp(stage: StageConfig, kind: StagePropKind): boolean {
  return normalizeStageProps(stage, { includeDefaults: false }).some((prop) => prop.kind === kind);
}

export function upsertStageProp(stage: StageConfig, nextProp: StageProp): StageConfig {
  const props = normalizeStageProps(stage);
  const nextProps = props.some((prop) => prop.id === nextProp.id)
    ? props.map((prop) => (prop.id === nextProp.id ? cloneStageProp(nextProp) : prop))
    : [...props, cloneStageProp(nextProp)];

  return syncStageLegacyFields({ ...stage, props: nextProps });
}

export function removeStageProp(stage: StageConfig, propId: string): StageConfig {
  const nextProps = normalizeStageProps(stage).filter((prop) => prop.id !== propId);
  return syncStageLegacyFields({ ...stage, props: nextProps });
}

function createStagePropId(kind: StagePropKind): string {
  return `${kind}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createDefaultStageProp(kind: StagePropKind): StageProp {
  return {
    ...cloneStageProp(DEFAULT_STAGE_PROPS[kind]),
    id: createStagePropId(kind),
  };
}

export function syncStageLegacyFields(stage: StageConfig): StageConfig {
  const props = Array.isArray(stage.props)
    ? stage.props.map(cloneStageProp)
    : normalizeStageProps(stage);
  const door = props.find((prop) => prop.kind === "door") ?? null;
  const chair = props.find((prop) => prop.kind === "chair") ?? null;

  return {
    ...stage,
    doorX: door?.x,
    doorY: door?.y,
    chairX: chair?.x,
    chairY: chair?.y,
    props,
  };
}
