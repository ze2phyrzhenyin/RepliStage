# 架构说明

## 1. 总体结构

StageCue 是一个“剧本 JSON 驱动 UI”的前端应用。

核心链路：

1. `sample-plays.ts` 提供内置示例剧本库
2. `PlayProvider` 管理当前工作剧本
3. setup 页面选择剧本来源与场次
4. 排练页或导演页消费当前场次
5. `deriveStageState()` 从事件序列推导舞台状态
6. `StageCanvas`、`ScriptPanel`、导演编辑器渲染和编辑同一套数据

## 2. 路由层

### 首页

- `/`
  只负责模式选择

### setup 流程

- `/rehearsal/setup`
  排练准备页
- `/director/setup`
  导演准备页

这两个页面共用 `components/setup/ModeSetupScreen.tsx`。

### 工作页

- `/select-role`
  角色选择页
- `/rehearsal`
  排练工作区
- `/director`
  导演工作区

## 3. 状态分层

### 3.1 示例剧本库

文件：

- `lib/default-script.json`
- `lib/qinqiong-sample.json`
- `lib/sample-plays.ts`

职责：

- 保存内置示例剧本
- 提供 sample metadata
- 提供默认示例与 sampleId 查询

### 3.2 当前工作剧本

文件：

- `components/play/PlayContext.tsx`

职责：

- 读取当前剧本
- 保存当前剧本
- 从示例剧本库加载
- 从 JSON 文本导入
- 导出当前剧本
- 记录来源 `PlaySource`
- 兼容旧版本地数据迁移

当前存储键：

- `stagecue_current_play_v1`

### 3.3 排练页局部草稿

文件：

- `lib/customScript.ts`

职责：

- 保存排练页轻量编排草稿
- 按场次隔离
- 兼容旧存储键迁移

### 3.4 造型状态

文件：

- `components/costumes/CostumeContext.tsx`

职责：

- 保存角色造型选择
- 在排练页、选角页、导演页统一使用

## 4. 播放器架构

文件：

- `lib/player.ts`

播放器核心设计是“从头推导”，不是增量同步。

也就是每次事件索引变化时，重新从事件数组开头推导到当前位置，得到当前舞台状态。

优点：

- 逻辑简单
- 跳转稳定
- 回放一致
- 不需要维护复杂脏状态

当前支持的主要事件类型：

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

## 5. setup 流程架构

文件：

- `components/setup/ModeSetupScreen.tsx`

设计目标是把“模式选择”和“剧本来源选择”分离：

- 首页先选排练或导演
- setup 页再选示例剧本或导入 JSON

setup 页当前负责：

- 来源模式切换
- 示例剧本选择
- 导入预览与错误展示
- 场次列表选择
- 继续进入下一步

## 6. 排练端架构

文件：

- `components/RehearsalClient.tsx`
- `components/ScriptPanel.tsx`
- `components/PlaybackControls.tsx`
- `components/DirectorPanel.tsx`

排练端支持三类工作状态：

- 演出
- 台本
- 编排

其中“编排”只针对当前场次，属于轻量本地草稿，不直接改整部剧。

## 7. 导演模式架构

文件：

- `app/director/DirectorClient.tsx`
- `components/director/SceneList.tsx`
- `components/director/EventEditor.tsx`
- `components/director/ActorManager.tsx`

导演模式负责：

- 场次切换
- 场次元信息编辑
- 演员管理
- 事件编辑
- 路径走位
- 道具布景编辑
- 导入 / 导出 JSON
- 保存到浏览器
- 清除浏览器保存

当前导演页不再承担“选择示例剧本”的主入口职责，示例选择已前移到 `/director/setup`。

## 8. 事件编辑内核

文件：

- `lib/event-editor-core.ts`
- `components/editor/SharedEventForm.tsx`
- `components/editor/SharedInsertBar.tsx`

排练页轻量编排与导演模式已经共享底层事件编辑规则：

- 默认事件工厂
- 删除规则
- 走位类型切换
- 摘要生成

这避免了同一类事件在两个编辑器里出现不同业务规则。

## 9. 舞台与道具架构

文件：

- `components/StageCanvas.tsx`
- `lib/stage-props.ts`
- `types/script.ts`

门和椅子当前统一作为 `StageProp` 处理。

这意味着：

- 渲染逻辑统一
- 拖拽逻辑统一
- 导演编辑逻辑统一
- 数据校验逻辑统一

旧字段 `doorX/doorY/chairX/chairY` 仍被兼容，但真实模型已经升级为 `stage.props`。

## 10. 国际化架构

文件：

- `lib/i18n.ts`
- `components/locale/LocaleContext.tsx`
- `components/locale/LanguageToggle.tsx`

当前是中法双语界面，不再混杂显示。

国际化覆盖范围：

- 首页
- setup 流程
- 排练页
- 导演页
- 事件标签
- 导入错误提示

## 11. 测试结构

文件：

- `tests/play-schema.test.ts`
- `tests/player.test.ts`
- `tests/event-editor-core.test.ts`
- `tests/custom-script.test.ts`
- `tests/play-context.test.tsx`

当前测试主要覆盖：

- JSON 校验
- 播放器逻辑
- 共享事件编辑内核
- 本地草稿存储
- PlayContext 迁移与导入导出

## 12. 当前架构优点与限制

优点：

- 页面职责清晰
- 数据流集中
- 播放与编辑复用同一模型
- 示例剧本和导入剧本共用同一工作流

限制：

- 所有数据仍在浏览器本地
- 没有历史版本
- 没有多人协作
- 组件层交互测试仍偏少
