import { z } from "zod";
import type { Locale } from "@/lib/i18n";
import { translate } from "@/lib/i18n";
import type { Play } from "@/types/script";

export const pathPointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const actorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  color: z.string().min(1),
  shortLabel: z.string().min(1),
});

export const stagePropSchema = z.object({
  id: z.string().min(1),
  kind: z.enum([
    "door", "chair",
    "magic_box", "carriage", "parade_umbrella", "microphone_stand",
    "shoe", "bed", "dance_light",
    "counter_table", "display_shelf", "plate_stand", "suitcase",
    "porcelain_plate", "broken_plate", "tea_set", "signboard_yiyuanzhai",
  ]),
  x: z.number(),
  y: z.number(),
  label: z.string().optional(),
  locked: z.boolean().optional(),
  layerOrder: z.number().int().optional(),
});

export const stageConfigSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  doorX: z.number().optional(),
  doorY: z.number().optional(),
  chairX: z.number().optional(),
  chairY: z.number().optional(),
  props: z.array(stagePropSchema).optional(),
});

export const scriptEventSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    "blackout_start",
    "blackout_end",
    "enter",
    "move",
    "move_path",
    "line",
    "action",
    "prop_show",
    "prop_hide",
    "prop_swap",
    "exit",
    "pause",
    "scene_end",
  ]),
  duration: z.number().positive(),
  actorId: z.string().optional(),
  propId: z.string().optional(),
  propKind: stagePropSchema.shape.kind.optional(),
  nextPropKind: stagePropSchema.shape.kind.optional(),
  text: z.string().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  fromSide: z.enum(["left", "right", "top", "bottom"]).optional(),
  toSide: z.enum(["left", "right", "top", "bottom"]).optional(),
  pose: z.enum(["stand", "sit"]).optional(),
  path: z.array(pathPointSchema).optional(),
});

export const sceneSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  subtitle: z.string(),
  setting: z.string(),
  actors: z.array(actorSchema).min(1),
  stage: stageConfigSchema,
  events: z.array(scriptEventSchema).min(1),
});

export const playSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  scenes: z.array(sceneSchema).min(1),
}).superRefine((play, ctx) => {
  const playSceneIds = new Set<string>();

  play.scenes.forEach((scene, sceneIndex) => {
    if (playSceneIds.has(scene.id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["scenes", sceneIndex, "id"],
        message: translate("zh", "error.sceneDuplicate", { id: scene.id }),
      });
    }
    playSceneIds.add(scene.id);

    const actorIds = new Set<string>();
    const eventIds = new Set<string>();
    const propIds = new Set<string>();
    const propsById = new Map<string, z.infer<typeof stagePropSchema>>();

    scene.stage.props?.forEach((prop, propIndex) => {
      if (propIds.has(prop.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["scenes", sceneIndex, "stage", "props", propIndex, "id"],
          message: `场次 "${scene.title || scene.id}" 中道具 ID "${prop.id}" 重复`,
        });
      }
      propIds.add(prop.id);
      propsById.set(prop.id, prop);
    });

    scene.actors.forEach((actor, actorIndex) => {
      if (actorIds.has(actor.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["scenes", sceneIndex, "actors", actorIndex, "id"],
          message: translate("zh", "error.actorDuplicate", { scene: scene.title || scene.id, id: actor.id }),
        });
      }
      actorIds.add(actor.id);
    });

    scene.events.forEach((event, eventIndex) => {
      const eventPath = ["scenes", sceneIndex, "events", eventIndex] as const;

      if (eventIds.has(event.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...eventPath, "id"],
          message: translate("zh", "error.eventDuplicate", { scene: scene.title || scene.id, id: event.id }),
        });
      }
      eventIds.add(event.id);

      if (event.actorId && !actorIds.has(event.actorId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...eventPath, "actorId"],
          message: translate("zh", "error.actorMissing", { scene: scene.title || scene.id, id: event.actorId }),
        });
      }

      if ((event.type === "line" || event.type === "enter" || event.type === "move" || event.type === "move_path" || event.type === "exit") && !event.actorId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...eventPath, "actorId"],
          message: translate("zh", "error.actorRequired", { type: event.type }),
        });
      }

      if (event.type === "line" && !event.text?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...eventPath, "text"],
          message: translate("zh", "error.lineTextRequired"),
        });
      }

      if ((event.type === "prop_show" || event.type === "prop_hide" || event.type === "prop_swap") && !event.propId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...eventPath, "propId"],
          message: "道具事件必须指定 propId",
        });
      }

      if (event.propId && !propsById.has(event.propId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...eventPath, "propId"],
          message: `场次 "${scene.title || scene.id}" 中不存在道具 ID "${event.propId}"`,
        });
      }

      if (event.type === "prop_swap" && !event.nextPropKind) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...eventPath, "nextPropKind"],
          message: "prop_swap 事件必须指定 nextPropKind",
        });
      }

      if (event.type === "enter" || event.type === "move") {
        if (typeof event.x !== "number") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [...eventPath, "x"],
            message: translate("zh", "error.xRequired", { type: event.type }),
          });
        }
        if (typeof event.y !== "number") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [...eventPath, "y"],
            message: translate("zh", "error.yRequired", { type: event.type }),
          });
        }
      }

      if (event.type === "move_path" && (!event.path || event.path.length === 0)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...eventPath, "path"],
          message: translate("zh", "error.pathRequired"),
        });
      }
    });

    if (!scene.events.some((event) => event.type === "scene_end")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["scenes", sceneIndex, "events"],
        message: translate("zh", "error.sceneEndRequired", { scene: scene.title || scene.id }),
      });
    }
  });
});

export function parsePlay(input: unknown): Play {
  return playSchema.parse(input) as Play;
}

export function summarizePlay(play: Play) {
  return {
    title: play.title,
    playId: play.id,
    sceneCount: play.scenes.length,
    totalActors: play.scenes.reduce((sum, scene) => sum + scene.actors.length, 0),
    totalEvents: play.scenes.reduce((sum, scene) => sum + scene.events.length, 0),
    scenes: play.scenes.map((scene) => ({
      id: scene.id,
      title: scene.title,
      subtitle: scene.subtitle,
      actors: scene.actors.length,
      events: scene.events.length,
    })),
  };
}

export function formatPlayImportError(error: unknown, locale: Locale = "zh") {
  if (error instanceof z.ZodError) {
    return error.issues.slice(0, 8).map((issue) => {
      const path = formatIssuePath(issue.path, locale);
      const message = localizeIssueMessage(issue.message, locale);
      return path ? `${path}: ${message}` : message;
    });
  }

  if (error instanceof SyntaxError) {
    return [translate(locale, "error.jsonInvalid")];
  }

  return [String(error)];
}

function formatIssuePath(path: readonly PropertyKey[], locale: Locale) {
  if (path.length === 0) return "";

  const parts: string[] = [];

  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    const next = path[i + 1];

    if (segment === "scenes" && typeof next === "number") {
      parts.push(translate(locale, "error.sceneIndex", { count: next + 1 }));
      i++;
      continue;
    }

    if (segment === "actors" && typeof next === "number") {
      parts.push(translate(locale, "error.actorIndex", { count: next + 1 }));
      i++;
      continue;
    }

    if (segment === "events" && typeof next === "number") {
      parts.push(translate(locale, "error.eventIndex", { count: next + 1 }));
      i++;
      continue;
    }

    parts.push(String(segment));
  }

  return parts.join(" / ");
}

function localizeIssueMessage(message: string, locale: Locale) {
  const candidates = [
    { key: "error.sceneDuplicate", pattern: /场次 ID "(.+)" 重复/u, vars: (m: RegExpMatchArray) => ({ id: m[1] }) },
    { key: "error.actorDuplicate", pattern: /场次 "(.+)" 中角色 ID "(.+)" 重复/u, vars: (m: RegExpMatchArray) => ({ scene: m[1], id: m[2] }) },
    { key: "error.eventDuplicate", pattern: /场次 "(.+)" 中事件 ID "(.+)" 重复/u, vars: (m: RegExpMatchArray) => ({ scene: m[1], id: m[2] }) },
    { key: "error.actorMissing", pattern: /角色 ID "(.+)" 不存在于场次 "(.+)" 的角色列表中/u, vars: (m: RegExpMatchArray) => ({ id: m[1], scene: m[2] }) },
    { key: "error.actorRequired", pattern: /(.+) 事件必须指定 actorId/u, vars: (m: RegExpMatchArray) => ({ type: m[1] }) },
    { key: "error.lineTextRequired", pattern: /^line 事件必须提供非空台词文本$/u, vars: () => ({}) },
    { key: "error.xRequired", pattern: /(.+) 事件必须提供 x 坐标/u, vars: (m: RegExpMatchArray) => ({ type: m[1] }) },
    { key: "error.yRequired", pattern: /(.+) 事件必须提供 y 坐标/u, vars: (m: RegExpMatchArray) => ({ type: m[1] }) },
    { key: "error.pathRequired", pattern: /^move_path 事件必须至少包含一个路径节点$/u, vars: () => ({}) },
    { key: "error.sceneEndRequired", pattern: /场次 "(.+)" 缺少 scene_end 事件/u, vars: (m: RegExpMatchArray) => ({ scene: m[1] }) },
  ] as const;

  for (const candidate of candidates) {
    const match = message.match(candidate.pattern);
    if (match) {
      return translate(locale, candidate.key, candidate.vars(match));
    }
  }

  return message;
}
