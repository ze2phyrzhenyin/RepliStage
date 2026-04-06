# 剧本数据规范

## 1. 顶层模型

项目当前以 `Play` 表示整部剧。

```ts
type Play = {
  id: string;
  title: string;
  scenes: ScriptDefinition[];
};
```

当前内置示例剧本来自：

- `lib/default-script.json`
- `lib/qinqiong-sample.json`

## 2. 场次模型

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

字段说明：

- `id`
  场次唯一标识
- `title`
  场次标题
- `subtitle`
  场次副标题
- `setting`
  场景说明
- `actors`
  当前场次参与角色
- `stage`
  舞台与道具配置
- `events`
  线性事件序列

## 3. 角色模型

```ts
type Actor = {
  id: string;
  name: string;
  color: string;
  shortLabel: string;
};
```

建议：

- `id` 用稳定英文或拼音
- `shortLabel` 控制在 2 到 4 个字符
- `color` 用于界面识别和高亮

## 4. 舞台模型

```ts
type StageConfig = {
  width: number;
  height: number;
  doorX?: number;
  doorY?: number;
  chairX?: number;
  chairY?: number;
  props?: StageProp[];
};
```

### 当前真实推荐写法

```ts
type StagePropKind = "door" | "chair";

type StageProp = {
  id: string;
  kind: StagePropKind;
  x: number;
  y: number;
};
```

说明：

- `props` 是当前推荐的统一道具模型
- `doorX/doorY/chairX/chairY` 仅为兼容旧数据保留
- 场次至少应显式配置一个 `door`

## 5. 事件模型

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

- 开黑幕

### `blackout_end`

- 关黑幕

### `enter`

- 角色入场
- 常用字段：`actorId`、`x`、`y`、`fromSide`

### `move`

- 角色走到目标点
- 常用字段：`actorId`、`x`、`y`

### `move_path`

- 角色按路径移动
- 常用字段：`actorId`、`path`

### `line`

- 台词
- 常用字段：`actorId`、`text`

### `action`

- 动作或说明
- 可带 `actorId`

### `exit`

- 角色退场
- 常用字段：`actorId`、`toSide`

### `pause`

- 节奏停顿

### `scene_end`

- 场次结束标记

## 7. 运行时派生状态

播放器不会直接渲染原始事件，而是派生出 `StageActorState`：

```ts
type StageActorState = {
  actorId: string;
  x: number;
  y: number;
  visible: boolean;
  facing: "left" | "right" | "front";
  expression: Expression;
  animationState: AnimationState;
  opacity: number;
  scale: number;
  variant: ActorVariant;
  pose: "stand" | "sit";
};
```

## 8. 当前工作剧本来源

运行时并不是只有“默认剧本”一个概念，而是：

```ts
type PlaySource =
  | { type: "sample"; sampleId: string }
  | { type: "imported" }
  | { type: "edited" };
```

这让界面能分辨：

- 当前来自哪个内置示例
- 当前是否由 JSON 导入
- 当前是否已被本地编辑

## 9. 导入校验重点

当前校验除了结构，还会检查：

- 场次 id 是否重复
- 角色 id 是否重复
- 事件 id 是否重复
- 道具 kind 是否重复
- `actorId` 是否存在
- `move_path` 是否为空
- `line` 是否有文本
- `enter` / `move` 是否有坐标
- 是否缺少 `scene_end`
- 是否缺少门道具

## 10. 编辑建议

- 大批量改动可直接编辑 JSON
- 小范围改动优先用导演模式
- 新增场次后务必手动过一遍 setup、选角、排练、导演流程
