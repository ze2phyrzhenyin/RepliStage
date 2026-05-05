# RepliStage

RepliStage 是一个通用的戏剧排练与导演工作台。它不是围绕单个剧本写死的页面，而是一个基于 JSON 剧本模型运行的前端工具：排练模式和导演模式都可以从内置示例剧本开始，也都可以直接导入外部 JSON。

当前仓库内置两部示例剧本：

- `Cendrillon`
- `秦琼卖马`

## 当前产品形态

首页现在只做两件事：

- `开始排练`
- `导演模式`

进入任一模式后，都会先进入对应的 setup 流程：

1. 选择剧本来源
2. 选择示例剧本或导入 JSON
3. 选择第几节
4. 进入排练或导演工作台

这意味着 RepliStage 当前已经是一个通用剧本播放器 / 编辑器，而不是某个单独项目的专题页面。

## 核心能力

- 多剧本、多场次结构
- 排练模式、导演模式双入口
- 示例剧本库与 JSON 导入 / 导出
- 角色选择与旁观模式
- 事件驱动舞台回放
- 演员本人台词隐藏、单句提示、全文显示
- 排练页轻量编排
- 导演模式完整事件编辑
- 通用舞台道具系统，支持多道具、标签、锁定、图层与事件驱动显隐/替换
- 角色造型自定义
- 本地浏览器持久化与版本迁移
- 中法双语界面切换

## 页面结构

- `/`
  首页，仅提供模式选择
- `/rehearsal/setup`
  排练准备页，选择示例剧本或导入 JSON，再选择场次
- `/director/setup`
  导演准备页，选择示例剧本或导入 JSON，再选择场次
- `/select-role`
  角色选择页
- `/rehearsal`
  排练工作区
- `/director`
  导演工作区
- `/about`
  简版说明页

## 技术栈

- Next.js 15 App Router
- React 19
- TypeScript 5
- Tailwind CSS 3
- Motion
- Vitest

## 快速开始

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

打开：

```text
http://localhost:3000
```

可选脚本：

```bash
./scripts/dev.sh
```

## 常用命令

```bash
npm run dev
npm run dev:open
npm run typecheck
npm run build
npm run start
npm test
```

## 持久化说明

当前项目不依赖数据库。所有工作状态都保存在浏览器本地：

- 当前剧本：`replistage_current_play_v1`
- 排练页按场次草稿：`replistage_custom_events_v1:<sceneId>`
- 角色造型：`replistage_costumes_v1`

这意味着：

- 同一浏览器刷新后内容仍在
- 更换设备不会自动同步
- 导出 JSON 是分享当前剧本的主要方式

## 代码结构

```text
src/app/                  路由、布局与页面
src/components/           排练、导演、setup、舞台、造型与国际化组件
src/lib/                  播放器、校验、示例剧本库与业务辅助逻辑
src/data/plays/           内置示例剧本 JSON
src/types/                核心领域类型
public/                   静态资源
scripts/                  本地辅助脚本
tests/                    Vitest 逻辑测试
docs/                     项目文档与展示资料
```

## 文档导航

- [文档中心](./docs/README.md)
- [项目概览](./docs/overview.md)
- [架构说明](./docs/architecture.md)
- [开发文档](./docs/development-guide.md)
- [用户文档](./docs/user-guide.md)
- [剧本数据规范](./docs/script-data-spec.md)
- [代码模块索引](./docs/module-reference.md)
- [审查与优化建议](./docs/review-notes.md)

## 当前边界

已实现：

- 本地单机使用
- 内置示例剧本库
- JSON 导入 / 导出
- 多场次排练与导演编辑
- 本地测试与构建验证

未实现：

- 用户系统
- 云端同步
- 多人协作
- 剧本版本历史
- 权限体系
- 服务端持久化

如果后续要演进为平台化产品，最先要补的是远程存储、版本管理和协作权限。
