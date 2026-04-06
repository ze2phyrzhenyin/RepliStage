# StageCue

StageCue 是一个面向单个剧本排练场景的可视化话剧排练工具。项目基于 Next.js 15、React 19、TypeScript 和 Tailwind CSS 实现，核心能力是把剧本事件序列回放成舞台状态，让演员按照角色进行背词、走位和节奏练习。

当前仓库不仅包含排练端，还包含两套编辑能力：

- 排练页内置的轻量“编排”模式，修改结果按场次保存在浏览器 `localStorage`
- 导演模式支持导入 JSON、导出 JSON、恢复示例剧本，并将当前剧本保存到浏览器
- JSON 导入包含结构校验和业务校验，能更早发现角色引用、路径、场次结束等错误

## 核心功能

- 角色选择与旁观模式
- 舞台事件回放：黑幕、入场、走位、路径走位、台词、动作、退场、场次结束
- 演员本人台词默认隐藏，可单句揭示或显示全部台词
- 自动播放、手动逐句推进、速度切换、时间轴拖拽
- 可视化舞台与角色造型切换
- 导演模式：多场次、演员管理、事件编辑、路径绘制、导入/导出 JSON

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发环境

```bash
npm run dev
```

默认访问：

```text
http://localhost:3000
```

也可以直接使用仓库自带脚本：

```bash
./start.sh
```

该脚本会自动安装依赖、寻找可用端口并打开浏览器。

## 页面说明

- `/`
  首页，展示剧目入口与角色入口
- `/select-role`
  角色选择页
- `/rehearsal?role=<actorId>`
  排练页，支持 `observer`
- `/director`
  导演模式，支持导入 / 导出 JSON
- `/about`
  简版玩法说明页

## 技术栈

- Next.js 15 App Router
- React 19
- TypeScript 5
- Tailwind CSS 3
- `motion/react`
- `react-konva` / `konva` 已安装，但当前舞台实现以 DOM + SVG 为主

## 项目结构

```text
app/                      路由、页面与布局
components/               排练端、舞台、导演端与造型系统组件
lib/                      剧本数据、播放器派生逻辑、造型与事件辅助逻辑
types/                    核心类型定义
public/actors/            角色静态图资源
doc/                      新的完整项目文档
docs/                     兼容旧路径的文档入口
```

## 数据与持久化

- 内置示例剧本：`lib/default-script.json`
- 当前已加载剧本：浏览器 `localStorage`
- 排练页轻量编排结果：浏览器 `localStorage`，且按场次隔离
- 角色造型选择：浏览器 `localStorage`
- 当前剧本存储已带版本号，兼容旧版本地缓存迁移

## 文档导航

完整文档请从这里开始：

- [文档总览](./doc/README.md)
- [架构说明](./doc/architecture.md)
- [开发文档](./doc/development-guide.md)
- [用户文档](./doc/user-guide.md)
- [剧本数据模型](./doc/script-data-spec.md)
- [代码模块索引](./doc/module-reference.md)
- [审查与优化建议](./doc/review-notes.md)

## 当前适用范围

这个仓库更接近“可运行的垂直场景工具”而不是通用 SaaS 平台，当前不包含：

- 用户系统
- 权限体系
- 远程数据库
- 多剧目后台管理
- 多人协作
- 正式生产级发布配置

如果后续要演进为平台化产品，建议从剧本存储、场次版本化、角色权限和持久化服务开始拆分。
