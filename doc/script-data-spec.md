# 剧本数据模型

## 1. 顶层结构

项目当前使用 `Play` 表示整部剧目。

```ts
type Play = {
  id: string;
  title: string;
  scenes: ScriptDefinition[];
};
```

默认数据文件是 `lib/default-script.json`。

## 2. 场次结构

每个场次使用 `ScriptDefinition`：

```ts
type ScriptDefinition = {
  id: string;
  title: string;
  subtitle: string;
  setting: string;
  actors: Actor[];
  stage: StageConfig;
  events: ScriptEvent[];
};
```

字段含义：

- `id`
  场次唯一标识
- `title`
  场次标题
- `subtitle`
  副标题
- `setting`
  场景说明
- `actors`
  本场参与角色
- `stage`
  舞台尺寸和道具配置
- `events`
  线性事件序列

## 3. 角色结构

```ts
type Actor = {
  id: string;
  name: string;
  color: string;
  shortLabel: string;
};
```

建议：

- `id` 使用稳定英文或拼音标识
- `shortLabel` 尽量控制在 2 到 4 个字符
- `color` 用于 UI 高亮和身份识别

## 4. 舞台结构

```ts
type StageConfig = {
  width: number;
  height: number;
  doorX: number;
  doorY: number;
  chairX?: number;
  chairY?: number;
};
```

说明：

- 坐标是舞台坐标，不是屏幕像素
- `width` / `height` 用于整体缩放
- `doorX` / `doorY` 是门位置
- `chairX` / `chairY` 是椅子位置

## 5. 事件结构

所有事件共用一套结构：

```ts
type ScriptEvent = {
  id: string;
  type:
    | "blackout_start"
    | "blackout_end"
    | "enter"
    | "move"
    | "move_path"
    | "line"
    | "action"
    | "exit"
    | "pause"
    | "scene_end";
  duration: number;
  actorId?: string;
  text?: string;
  x?: number;
  y?: number;
  fromSide?: "left" | "right" | "top" | "bottom";
  toSide?: "left" | "right" | "top" | "bottom";
  pose?: "stand" | "sit";
  path?: { x: number; y: number }[];
};
```

## 6. 事件类型说明

### `blackout_start`

- 打开黑幕
- 不要求 `actorId`

### `blackout_end`

- 关闭黑幕

### `enter`

- 角色入场
- 常用字段：`actorId`、`x`、`y`、`fromSide`

### `move`

- 角色走位到某个坐标
- 常用字段：`actorId`、`x`、`y`

### `move_path`

- 角色按路径走位
- 常用字段：`actorId`、`path`

### `line`

- 角色说出台词
- 常用字段：`actorId`、`text`
- 可选 `pose` 覆盖自动姿态判断

### `action`

- 角色动作或舞台说明
- 可有 `actorId`
- 可有 `text`

### `exit`

- 角色退场
- 常用字段：`actorId`、`toSide`

### `pause`

- 用于节奏停顿

### `scene_end`

- 场次结束标记

## 7. 运行时派生状态

播放器不会直接渲染原始事件，而是先生成 `StageActorState`：

```ts
type StageActorState = {
  actorId: string;
  x: number;
  y: number;
  visible: boolean;
  facing: "left" | "right" | "front";
  exiting?: boolean;
  expression: Expression;
  animationState: AnimationState;
  opacity: number;
  scale: number;
  variant: ActorVariant;
  pose: "stand" | "sit";
};
```

## 8. 数据编辑建议

### 推荐做法

- 优先用导演模式修改
- 大批量改动时直接编辑 JSON
- 每次修改后至少手工回放一遍关键场次

### 避免的问题

- `actorId` 填写不存在的角色
- `move_path` 没有路径点
- `duration` 为 0 或负数
- 删除 `blackout_start`、`blackout_end`、`scene_end` 等结构性事件

## 9. 当前默认剧目说明

`lib/default-script.json` 当前包含：

- 1 部剧目：`Cendrillon`
- 多个场次
- `lib/demo-script.ts` 额外导出了第一场次别名 `demoScript`

这个别名主要用于兼容旧代码；当前首页、选角页、排练页和导演模式都已经基于 `Play.scenes` 读取当前场次。
