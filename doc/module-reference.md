# 代码模块索引

本文档按目录和关键文件说明当前仓库结构，重点强调“哪些文件真正控制当前产品行为”。

## 1. 根目录与配置

### `package.json`

- 定义 `dev`、`build`、`start`、`test`
- 依赖 Next.js、React、Tailwind、Motion、Vitest

### `next.config.ts`

- Next.js 配置
- 将 `canvas` alias 为 `false`

### `tsconfig.json`

- TypeScript 严格模式
- `@/*` 路径别名

### `start.sh`

- 本地开发辅助脚本
- 自动装依赖、找端口、开浏览器

## 2. 路由与页面

### `app/layout.tsx`

- 根布局
- 挂载 Play、Costume、Locale 相关 provider

### `app/page.tsx`

- 首页
- 当前只做模式选择

### `app/rehearsal/setup/page.tsx`

- 排练 setup 页入口

### `app/director/setup/page.tsx`

- 导演 setup 页入口

### `app/select-role/page.tsx`

- 角色选择页

### `app/rehearsal/page.tsx`

- 排练页入口

### `app/director/page.tsx`

- 导演页入口

### `app/about/page.tsx`

- 简版说明页

## 3. setup 与流程控制

### `components/setup/ModeSetupScreen.tsx`

- setup 核心组件
- 管理示例剧本 / 导入 JSON 来源选择
- 管理场次选择
- 控制从 setup 到下一步的跳转

## 4. 排练端核心

### `components/RehearsalClient.tsx`

- 排练主控组件
- 管理播放、模式切换、当前事件索引、编排草稿

### `components/PlaybackControls.tsx`

- 播放控制条

### `components/ScriptPanel.tsx`

- 事件列表台本

### `components/DirectorPanel.tsx`

- 排练页轻量编排面板

### `components/RoleCard.tsx`

- 选角页角色卡片

## 5. 导演端核心

### `app/director/DirectorClient.tsx`

- 导演工作台主控
- 管理当前场次、编辑状态、保存、导入导出、撤销重做
- 管理道具标签、锁定、复制和图层顺序

### `components/director/SceneList.tsx`

- 场次列表

### `components/director/EventEditor.tsx`

- 事件编辑面板

### `components/director/ActorManager.tsx`

- 演员管理面板

## 6. 共享编辑内核

### `lib/event-editor-core.ts`

- 默认事件工厂
- 删除规则
- 走位类型切换
- 摘要逻辑

### `components/editor/SharedEventForm.tsx`

- 共享事件表单

### `components/editor/SharedInsertBar.tsx`

- 共享插入栏

## 7. 播放与舞台

### `lib/player.ts`

- 播放器核心
- 从事件序列推导舞台状态

### `components/StageCanvas.tsx`

- 舞台渲染
- 角色、道具、拖拽、路径绘制
- 道具标签显示与锁定态表现

### `components/HumanActorSprite.tsx`

- 角色精灵渲染入口

### `components/SpeechBubble.tsx`

- 当前台词 / 动作气泡

### `components/BlackoutOverlay.tsx`

- 黑幕层

## 8. 剧本与状态

### `types/script.ts`

- 核心领域类型
- 包含 `Play`、`ScriptDefinition`、`ScriptEvent`、`StageProp`、`PlaySource`

### `components/play/PlayContext.tsx`

- 当前工作剧本上下文
- 处理示例剧本、导入、导出、持久化、迁移

### `lib/sample-plays.ts`

- 内置示例剧本库

### `lib/default-script.json`

- `Cendrillon` 示例数据

### `lib/qinqiong-sample.json`

- `秦琼卖马` 示例数据

### `lib/demo-script.ts`

- 兼容导出默认剧本与旧别名

### `lib/play-schema.ts`

- JSON 结构与业务校验
- 导入预览辅助

### `lib/customScript.ts`

- 排练页草稿存储

### `lib/stage-props.ts`

- 道具标准化、默认值、层级排序与兼容处理

## 9. 造型与国际化

### `components/costumes/CostumeContext.tsx`

- 造型状态上下文

### `components/costumes/CostumeBar.tsx`

- 造型入口条

### `components/costumes/CostumeSelector.tsx`

- 造型选择器

### `components/costumes/CharacterSvgs.tsx`

- 角色 SVG

### `components/costumes/AnimalSvgs.tsx`

- 动物 SVG

### `lib/costumes.ts`

- 造型元数据

### `components/locale/LocaleContext.tsx`

- 语言状态

### `components/locale/LanguageToggle.tsx`

- 中法切换控件

### `lib/i18n.ts`

- 文案字典

## 10. 测试

### `tests/play-schema.test.ts`

- JSON 校验

### `tests/player.test.ts`

- 播放器逻辑

### `tests/event-editor-core.test.ts`

- 共享编辑内核

### `tests/custom-script.test.ts`

- 排练草稿存储

### `tests/play-context.test.tsx`

- 当前剧本持久化与迁移

## 11. 优先阅读顺序

如果要快速理解全站，优先读：

1. `types/script.ts`
2. `lib/sample-plays.ts`
3. `components/play/PlayContext.tsx`
4. `lib/play-schema.ts`
5. `lib/player.ts`
6. `components/setup/ModeSetupScreen.tsx`
7. `components/RehearsalClient.tsx`
8. `app/director/DirectorClient.tsx`
9. `components/StageCanvas.tsx`
