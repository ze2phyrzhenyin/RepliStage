# 开发文档

## 1. 环境要求

- Node.js 18+
- npm 9+

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

可选：

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

当前仓库已接入 Vitest，但没有单独的格式化命令。

## 3. 目录职责

- `app/`
  路由、布局、页面入口
- `components/`
  页面 UI、导演子模块、setup、造型、国际化组件
- `lib/`
  剧本数据、示例剧本库、播放器、校验、事件编辑核心、道具辅助逻辑
- `types/`
  领域模型
- `tests/`
  逻辑测试
- `doc/`
  当前主文档目录

## 4. 关键入口

应用入口：

- `app/layout.tsx`
- `app/page.tsx`

setup 流程：

- `app/rehearsal/setup/page.tsx`
- `app/director/setup/page.tsx`
- `components/setup/ModeSetupScreen.tsx`

排练功能：

- `app/rehearsal/page.tsx`
- `components/RehearsalClient.tsx`

导演功能：

- `app/director/page.tsx`
- `app/director/DirectorClient.tsx`

核心逻辑：

- `types/script.ts`
- `lib/sample-plays.ts`
- `lib/play-schema.ts`
- `lib/player.ts`
- `components/play/PlayContext.tsx`

## 5. 修改剧本的方式

### 方式一：直接编辑示例剧本 JSON

当前内置示例：

- `lib/default-script.json`
- `lib/qinqiong-sample.json`

适合：

- 批量调整
- 新增示例场次
- 代码评审

### 方式二：用 setup + 导演模式编辑

1. 进入 `/director/setup`
2. 选择示例剧本或导入 JSON
3. 选择第几节
4. 进入导演模式编辑
5. 保存到浏览器或导出 JSON

## 6. 修改播放器时的原则

播放器单一可信逻辑入口是 `lib/player.ts`。

建议：

- 先改类型，再改派生逻辑
- 尽量把行为差异收敛到 `deriveStageState()`
- 不要把业务规则散落在多个 UI 组件里
- 改完后补 `tests/player.test.ts`

## 7. 修改 JSON 校验时的原则

文件：

- `lib/play-schema.ts`

这里不仅负责结构校验，也负责业务校验。

改动时重点注意：

- 角色引用是否合法
- 路径事件是否为空
- 场次是否含 `scene_end`
- 道具事件引用的 `propId` 是否真实存在
- `prop_swap` 是否带有 `nextPropKind`
- 场次、角色、事件、道具 id 是否冲突

## 8. 修改舞台和道具时的原则

文件：

- `components/StageCanvas.tsx`
- `lib/stage-props.ts`

注意：

- 坐标是舞台坐标，不是像素坐标
- 演员视觉层级依赖 `y` 值
- 所有舞台道具现在都属于 `StageProp`
- 编辑态和播放态共用同一组件
- 播放态已经支持事件级道具显隐与替换
- 导演态已经支持道具标签、锁定与图层顺序

## 9. 修改 setup 流程时的原则

文件：

- `components/setup/ModeSetupScreen.tsx`

当前 setup 页的设计前提是：

- 首页只选模式
- setup 页只解决“用哪份剧本、哪一节”

不要再把角色卡、导演入口、产品介绍等执行层信息重新塞回首页。

## 10. 测试现状

当前已有测试：

- `play-schema`
- `player`
- `event-editor-core`
- `custom-script`
- `play-context`

推荐新增：

- 导演模式导入预览的组件测试
- setup 流程交互测试
- StageCanvas 高层交互测试

## 11. 已知技术债

- `stage.props` 与旧的 `doorX/chairX` 兼容字段仍并存
- 导演模式和排练编排在 UI 层仍有部分交互重复
- 组件级交互测试偏少
- 浏览器本地存储没有版本历史
- 示例剧本文本双语仍依赖本地覆盖层，尚未升级为字段级 i18n 数据模型

## 12. 调试建议

排练页异常时优先检查：

- `scene` 参数
- `role` 参数
- 当前剧本是否被导入覆盖
- 当前场次草稿是否污染本地存储

导演模式异常时优先检查：

- JSON 是否通过校验
- 当前场次是否存在
- `PlayContext` 是否写入了旧数据
- 道具配置是否与场景一致

setup 流程异常时优先检查：

- `sample-plays.ts`
- 导入预览逻辑
- 当前场次选择状态
- i18n 文案键是否补齐
