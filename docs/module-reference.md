# 代码模块索引

本文档按目录和关键文件说明当前仓库结构，重点强调“哪些文件真正控制当前产品行为”。

## 1. 根目录与配置

### `package.json`

- 定义 `dev`、`dev:open`、`typecheck`、`build`、`start`、`test`
- 依赖 Next.js、React、Tailwind、Motion、Vitest

### `next.config.ts`

- Next.js 配置
- 将 `canvas` alias 为 `false`

### `tsconfig.json`

- TypeScript 严格模式
- `@/*` 路径别名

### `scripts/dev.sh`

- 本地开发辅助脚本
- 自动装依赖、找端口、开浏览器

## 2. 路由与页面

### `src/app/layout.tsx`

- 根布局
- 挂载 Play、Costume、Locale 相关 provider

### `src/app/page.tsx`

- 首页
- 当前只做模式选择

### `src/app/rehearsal/setup/page.tsx`

- 排练 setup 页入口

### `src/app/director/setup/page.tsx`

- 导演 setup 页入口

### `src/app/select-role/page.tsx`

- 角色选择页

### `src/app/rehearsal/page.tsx`

- 排练页入口

### `src/app/director/page.tsx`

- 导演页入口

### `src/app/about/page.tsx`

- 简版说明页

## 3. setup 与流程控制

### `src/components/setup/ModeSetupScreen.tsx`

- setup 核心组件
- 管理示例剧本 / 导入 JSON 来源选择
- 管理场次选择
- 控制从 setup 到下一步的跳转

## 4. 排练端核心

### `src/components/RehearsalClient.tsx`

- 排练主控组件
- 管理播放、模式切换、当前事件索引、编排草稿

### `src/components/PlaybackControls.tsx`

- 播放控制条

### `src/components/ScriptPanel.tsx`

- 事件列表台本

### `src/components/DirectorPanel.tsx`

- 排练页轻量编排面板

### `src/components/RoleCard.tsx`

- 选角页角色卡片

## 5. 导演端核心

### `src/app/director/DirectorClient.tsx`

- 导演工作台主控
- 管理当前场次、编辑状态、保存、导入导出、撤销重做
- 管理道具标签、锁定、复制和图层顺序

### `src/components/director/SceneList.tsx`

- 场次列表

### `src/components/director/EventEditor.tsx`

- 事件编辑面板

### `src/components/director/ActorManager.tsx`

- 演员管理面板

## 6. 共享编辑内核

### `src/lib/event-editor-core.ts`

- 默认事件工厂
- 删除规则
- 走位类型切换
- 摘要逻辑

### `src/components/editor/SharedEventForm.tsx`

- 共享事件表单

### `src/components/editor/SharedInsertBar.tsx`

- 共享插入栏

## 7. 播放与舞台

### `src/lib/player.ts`

- 播放器核心
- 从事件序列推导舞台状态

### `src/components/StageCanvas.tsx`

- 舞台渲染
- 角色、道具、拖拽、路径绘制
- 道具标签显示与锁定态表现

### `src/components/HumanActorSprite.tsx`

- 角色精灵渲染入口

### `src/components/SpeechBubble.tsx`

- 当前台词 / 动作气泡

### `src/components/BlackoutOverlay.tsx`

- 黑幕层

## 8. 剧本与状态

### `src/types/script.ts`

- 核心领域类型
- 包含 `Play`、`ScriptDefinition`、`ScriptEvent`、`StageProp`、`PlaySource`

### `src/components/play/PlayContext.tsx`

- 当前工作剧本上下文
- 处理示例剧本、导入、导出、持久化、迁移

### `src/lib/sample-plays.ts`

- 内置示例剧本库

### `src/data/plays/cendrillon.json`

- `Cendrillon` 示例数据

### `src/data/plays/qinqiong-sells-horse.json`

- `秦琼卖马` 示例数据

### `src/lib/demo-script.ts`

- 兼容导出默认剧本与旧别名

### `src/lib/play-schema.ts`

- JSON 结构与业务校验
- 导入预览辅助

### `src/lib/customScript.ts`

- 排练页草稿存储

### `src/lib/stage-props.ts`

- 道具标准化、默认值、层级排序与兼容处理

## 9. 造型与国际化

### `src/components/costumes/CostumeContext.tsx`

- 造型状态上下文

### `src/components/costumes/CostumeBar.tsx`

- 造型入口条

### `src/components/costumes/CostumeSelector.tsx`

- 造型选择器

### `src/components/costumes/CharacterSvgs.tsx`

- 角色 SVG

### `src/components/costumes/AnimalSvgs.tsx`

- 动物 SVG

### `src/lib/costumes.ts`

- 造型元数据

### `src/components/locale/LocaleContext.tsx`

- 语言状态

### `src/components/locale/LanguageToggle.tsx`

- 中法切换控件

### `src/lib/i18n.ts`

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

1. `src/types/script.ts`
2. `src/lib/sample-plays.ts`
3. `src/components/play/PlayContext.tsx`
4. `src/lib/play-schema.ts`
5. `src/lib/player.ts`
6. `src/components/setup/ModeSetupScreen.tsx`
7. `src/components/RehearsalClient.tsx`
8. `src/app/director/DirectorClient.tsx`
9. `src/components/StageCanvas.tsx`
