# 开发文档

## 1. 开发环境

### 基础要求

- Node.js 18+
- npm 9+

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

或：

```bash
./start.sh
```

## 2. 常用命令

```bash
npm run dev
npm run build
npm run start
npm test
```

当前已经提供 `npm test`，用于运行 Vitest 逻辑测试；仍然没有单独的格式化命令。

## 3. 目录职责

- `app/`
  Next.js App Router 页面与布局
- `components/`
  页面 UI 与交互组件
- `components/director/`
  导演编辑器子模块
- `components/costumes/`
  造型系统
- `lib/`
  剧本、播放器、事件和造型辅助逻辑
- `types/`
  领域模型类型
- `public/actors/`
  角色静态图片资源

## 4. 关键文件入口

### 应用入口

- `app/layout.tsx`
- `app/page.tsx`

### 排练功能入口

- `app/rehearsal/page.tsx`
- `components/RehearsalClient.tsx`

### 导演模式入口

- `app/director/page.tsx`
- `app/director/DirectorClient.tsx`

### 核心逻辑入口

- `types/script.ts`
- `lib/default-script.json`
- `lib/player.ts`

## 5. 修改剧本的两种方式

### 方式一：直接编辑默认剧本

编辑 `lib/default-script.json`，适合批量调整和代码评审。

### 方式二：使用导演模式

1. 打开 `/director`
2. 直接编辑示例剧本，或导入外部 JSON
3. 保存到浏览器
4. 需要分享时导出 JSON

## 6. 修改播放器时的建议

播放器的单一可信逻辑入口是 `lib/player.ts`。改动时优先遵循以下原则：

- 先改类型，再改派生逻辑
- 不要把播放规则散落到多个组件中
- 事件表现差异优先收敛到 `deriveStageState()`
- UI 组件只消费状态，不重复推导业务规则

## 7. 修改舞台时的建议

`StageCanvas.tsx` 同时承担显示与编辑职责。修改时建议注意：

- 坐标系是舞台坐标，不是像素坐标
- `scale` 由容器宽度与舞台宽度换算得到
- 演员排序依赖 `y` 值
- 编辑态与播放态共用同一组件，避免只改一边

## 8. 造型系统维护建议

新增造型时通常需要同时处理：

1. `types/script.ts`
2. `lib/costumes.ts`
3. `components/costumes/CostumeSelector.tsx`
4. `components/HumanActorSprite.tsx`
5. 如需专属形象，再补 `CharacterSvgs.tsx` 或 `public/actors/`

## 9. 已知技术债

- `DirectorPanel` 与 `components/director/EventEditor.tsx` 的列表展示仍不同，但底层事件编辑规则已共享
- 自动化测试仍较少，目前以 `play-schema` 和 `player` 的逻辑测试为主
- 当前剧本保存在浏览器，缺少跨设备同步与版本历史
- 旧文档目录 `docs/` 与新目录 `doc/` 曾并存，现已统一以 `doc/` 为主
- 排练页“编排”与导演模式存在一定功能重复，长期可考虑统一编辑内核

## 10. 推荐的下一步工程化工作

- 增强 `zod` 校验，补上跨字段业务规则
- 继续扩充 `deriveStageState()` 的单元测试覆盖面
- 增加 ESLint/Prettier 或 Biome
- 为 JSON 导入导出增加版本历史与回滚
- 增加 localStorage 数据迁移策略，避免旧版浏览器缓存污染新版数据

## 11. 调试建议

### 排练页问题

优先检查：

- `role` 参数是否合法
- `customEvents` 是否污染本地存储
- 当前场次对应的 `scene` 参数是否正确
- 当前事件是否存在非法字段

### 导演模式问题

优先检查：

- 导入的 JSON 是否符合 `Play` 结构
- 业务校验错误是否来自角色引用、空路径或缺少 `scene_end`
- `localStorage` 是否可用
- 当前浏览器是否保存了旧的异常剧本

### 造型问题

优先检查：

- `localStorage` 中的造型键值
- 角色是否存在专属 SVG
- 图片资源是否缺失并触发 silhouette 回退
