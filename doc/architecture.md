# 架构说明

## 1. 总体架构

这是一个典型的“静态剧本驱动 UI”项目，而不是“前端调后端接口”的 CRUD 项目。

核心链路如下：

1. `lib/default-script.json` 提供完整剧目
2. `PlayProvider` 把“当前剧本”保存到浏览器
3. 页面根据 URL 角色参数选择排练身份
4. `RehearsalClient` 或 `DirectorClient` 持有当前事件指针和编辑状态
5. `deriveStageState()` 从事件序列推导舞台瞬时状态
6. `StageCanvas`、`ScriptPanel`、`SpeechBubble`、控制面板共同消费派生结果

## 2. 路由层设计

### `app/layout.tsx`

- 注入全局样式
- 包裹 `PlayProvider` 与 `CostumeProvider`
- 定义元信息

### `app/rehearsal/page.tsx`

- 读取 `searchParams`
- 把角色参数交给客户端排练组件

### `app/director/page.tsx`

- 直接进入导演工作台

## 3. 状态分层

### 3.1 剧本原始数据

- 类型：`Play` / `ScriptDefinition` / `ScriptEvent`
- 来源：`lib/default-script.json`

### 3.2 当前剧本状态

- 由 `PlayProvider` 管理
- 默认值来自示例剧本
- 导演导入 JSON 后写入浏览器 `localStorage`
- 本地存储使用版本化包装，读取时兼容旧格式迁移

### 3.3 UI 控制状态

主要存在于 `RehearsalClient` 和 `DirectorClient`：

- 当前事件索引
- 是否播放
- 自动播放开关
- 播放速度
- 当前模式
- 当前选中事件/演员
- 路径绘制状态

### 3.4 派生舞台状态

由 `deriveStageState()` 生成：

- 每个演员的位置
- 是否可见
- 表情、朝向、姿态
- 当前说话者
- 黑幕状态
- 当前动作文本与台词文本

## 4. 播放器引擎

### 4.1 核心思想

播放器不保存复杂中间状态，而是在每次事件索引变化时，重新从头遍历事件，生成当前舞台状态。

这带来的好处：

- 逻辑简单
- 可回放、可跳转
- 无需维护大量增量状态同步

### 4.2 `deriveStageState()` 做了什么

- 初始化所有角色的默认位置与默认表情
- 按顺序消费事件
- 根据事件类型更新角色状态或场景状态
- 在最后一步应用聚焦、站位和局部场面调度修正

### 4.3 支持的事件类型

- `blackout_start`
- `blackout_end`
- `enter`
- `move`
- `move_path`
- `line`
- `action`
- `exit`
- `pause`
- `scene_end`

## 5. 排练端架构

### `components/RehearsalClient.tsx`

这是排练端主控组件，负责：

- 三种模式切换：演出、台本、编排
- 播放器定时推进
- 本人台词隐藏与揭示
- 编排模式下的事件编辑、撤销/重做
- 本地自定义事件按场次保存到 `localStorage`
- 复用共享事件编辑内核

### 编排模式与导演模式的区别

- 编排模式：
  面向临时排练调整，只处理当前场次事件数组，按场次保存到浏览器
- 导演模式：
  面向完整剧目编辑，支持多场次和演员管理，可导入/导出完整 JSON

## 6. 导演模式架构

### `app/director/DirectorClient.tsx`

负责整个导演编辑工作台：

- 多场次切换
- 事件编辑
- 演员管理
- 舞台道具坐标编辑
- 路径绘制
- 撤销/重做
- 导入 / 导出 JSON
- 恢复示例剧本
- 复用共享事件编辑内核与导入校验

### 分栏结构

- 左栏：`SceneList`
- 中栏：`StageCanvas`
- 右栏：`EventEditor` / `ActorManager`

## 7. 舞台渲染架构

### `components/StageCanvas.tsx`

职责最重的可视化组件，负责：

- 舞台缩放与自适应
- 背景、门、椅子渲染
- 演员按 `y` 坐标排序，形成前后景层次
- 编辑态拖拽演员与道具
- 路径绘制与路径动画预览

### 渲染技术选择

虽然依赖中有 `react-konva`，但当前舞台主实现是：

- DOM 容器
- SVG 角色与道具
- Motion 动画

这意味着当前实现更易读、修改成本更低，但复杂碰撞和高级时间轴能力还没有引入。

## 8. 造型系统

造型系统由以下几部分组成：

- `CostumeContext`
  管理造型状态并持久化到 `localStorage`
- `CostumeSelector`
  弹层选择器
- `HumanActorSprite`
  根据角色、姿态和造型变体渲染最终精灵
- `CharacterSvgs` / `AnimalSvgs`
  角色/动物 SVG 资源

设计上支持三类造型：

- 角色原画
- 动物造型
- 剪影模式

## 9. 持久化策略

### 浏览器本地存储

- 当前剧本：`stagecue_current_play_v1`
- 自定义排练事件：`stagecue_custom_events_v1:<sceneId>`
- 角色造型：`stagecue_costumes_v1`

### 当前风险

- 还没有版本历史
- 当前剧本不会自动跨设备同步
- JSON 导入错误会直接影响当前会话

## 10. 架构优点与限制

### 优点

- 单体前端结构清晰
- 类型定义集中
- 可视化反馈强
- 编辑和播放共享同一套事件模型
- 排练编排与导演模式已经共享事件编辑核心逻辑

### 限制

- `demoScript` 别名仍然存在于 `lib/demo-script.ts`，但当前播放与编辑主流程已经不再依赖第一场耦合
- 没有测试保证复杂事件组合的稳定性
- 导演模式和排练端存在部分能力重叠
- 文件导入导出方式适合轻量协作，不适合多人实时协同
