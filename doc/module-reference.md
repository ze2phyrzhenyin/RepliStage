# 代码模块索引

本文档按文件逐一说明仓库中的主要代码文件职责，便于接手维护。

## 1. 根目录与配置

### `package.json`

- 定义项目名 `stagecue`
- 提供 `dev`、`build`、`start`、`lint` 脚本
- 声明 Next.js、React、Tailwind、Motion 等依赖

### `next.config.ts`

- 开启 `reactStrictMode`
- 配置 `outputFileTracingRoot`
- 将 `canvas` alias 为 `false`，规避服务端打包依赖问题

### `tsconfig.json`

- TypeScript 严格模式
- 使用 Next.js 推荐配置
- 配置 `@/*` 路径别名

### `tailwind.config.ts`

- 扫描 `app/`、`components/`、`lib/`
- 扩展舞台主题色、阴影和背景渐变

### `postcss.config.js`

- 注入 `tailwindcss` 与 `autoprefixer`

### `start.sh`

- 检查 `node_modules`
- 自动安装依赖
- 寻找可用端口
- 打开浏览器并启动开发服务器

## 2. 路由与页面

### `app/layout.tsx`

- 根布局
- 注入全局样式
- 包裹 `PlayProvider` 与 `CostumeProvider`

### `app/page.tsx`

- 首页
- 展示剧目标题、演员快捷入口、造型入口
- 从 `PlayProvider` 读取当前剧本
- 显示场次切换与导演模式入口

### `app/about/page.tsx`

- 玩法简介页

### `app/select-role/page.tsx`

- 角色选择页
- 渲染演员卡片、旁观者入口、造型栏和场景说明

### `app/rehearsal/page.tsx`

- 排练页入口
- 将角色参数和场次参数传给 `RehearsalClient`

### `app/director/page.tsx`

- 导演页面入口

### `app/director/DirectorClient.tsx`

- 完整导演工作台主控
- 负责场次、事件、演员、保存、撤销/重做

### `app/globals.css`

- 全局样式
- 暗色基础主题
- 面板、滚动条、悬浮效果工具类

## 3. 核心组件

### `components/RehearsalClient.tsx`

- 排练主控组件
- 管理播放、模式切换、本地编排、按场次草稿持久化、快捷键、revealed 台词状态

### `components/StageCanvas.tsx`

- 舞台可视化核心
- 负责背景、演员、道具、拖拽、路径绘制和路径动画

### `components/ScriptPanel.tsx`

- 台本事件列表
- 根据事件类型显示不同样式
- 当前事件自动滚动到可见区域

### `components/PlaybackControls.tsx`

- 播放器控制栏
- 含进度条、播放控制、速度、自动播放、全部台词开关

### `components/DirectorPanel.tsx`

- 排练页中的轻量编排面板
- 面向当前场次事件进行编辑
- 复用共享事件表单与插入逻辑

### `components/RoleCard.tsx`

- 角色选择卡片

### `components/HumanActorSprite.tsx`

- 演员精灵渲染入口
- 统一封装剪影、角色 SVG、动物造型和图片回退逻辑

### `components/SpeechBubble.tsx`

- 底部台词/动作气泡
- 本人台词可点击显示或隐藏

### `components/BlackoutOverlay.tsx`

- 黑幕淡入淡出遮罩

## 4. 导演子模块

### `components/director/SceneList.tsx`

- 多场次列表
- 支持新增、复制、删除、切换

### `components/director/EventEditor.tsx`

- 导演模式事件编辑器
- 支持详细表单编辑、插入新事件、拖拽排序

### `components/director/ActorManager.tsx`

- 导演模式演员管理器
- 支持增删改演员、切换颜色和简称

## 5. 造型系统

### `components/costumes/CostumeContext.tsx`

- 造型状态上下文
- 负责 `localStorage` 持久化

### `components/costumes/CostumeBar.tsx`

- 角色造型入口条

### `components/costumes/CostumeSelector.tsx`

- 造型选择弹层
- 支持角色、动物、剪影三类造型

### `components/costumes/CharacterSvgs.tsx`

- 角色专属 SVG 原画
- 包含继母、大姐、小妹、国王、很年轻的女孩等形象

### `components/costumes/AnimalSvgs.tsx`

- 通用动物造型 SVG
- 当前包含老虎、兔子、熊猫

## 6. 业务逻辑与数据层

### `types/script.ts`

- 项目最重要的领域类型定义
- 定义演员、场次、事件、造型、运行时状态

### `components/play/PlayContext.tsx`

- 管理当前已加载剧本
- 从示例剧本初始化
- 负责带版本号的浏览器持久化、旧数据迁移以及 JSON 导入导出辅助

### `lib/default-script.json`

- 内置示例剧目数据源
- 恢复默认剧本时的来源

### `lib/demo-script.ts`

- 从默认剧目中导出 `defaultPlay`
- 同时提供第一场次别名 `demoScript`

### `lib/player.ts`

- 播放引擎核心
- 负责把事件数组推导为舞台状态

### `lib/customScript.ts`

- 排练页本地编排辅助逻辑
- 包括按场次本地存取、插入事件、删除判断、位置事件查找

### `lib/event-editor-core.ts`

- 事件编辑共享核心
- 统一事件工厂、删除规则、走位类型切换和摘要生成

### `lib/costumes.ts`

- 造型系统的配色、名称和角色设计元数据

### `lib/eventMeta.ts`

- 事件类型的颜色和文案映射

## 7. 静态资源与其他文件

### `public/actors/**`

- 角色默认或坐姿资源图
- 当专属图片缺失时，系统会回退到 SVG 或剪影

### `next-env.d.ts`

- Next.js TypeScript 环境声明

### `docs/implementation-guide.md`

- 旧路径兼容文档入口

## 8. 当前应重点关注的文件

如果你要理解整个系统，优先读这几项：

1. `types/script.ts`
2. `lib/default-script.json`
3. `lib/player.ts`
4. `components/RehearsalClient.tsx`
5. `components/StageCanvas.tsx`
6. `app/director/DirectorClient.tsx`
