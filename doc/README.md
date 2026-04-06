# StageCue 文档中心

本目录是 StageCue 的主文档入口，按使用对象和维护场景拆分。

## 阅读顺序

### 给产品/架构/接手开发的人

1. [项目概览](./overview.md)
2. [架构说明](./architecture.md)
3. [代码模块索引](./module-reference.md)

### 给开发者

1. [开发文档](./development-guide.md)
2. [剧本数据模型](./script-data-spec.md)
3. [代码模块索引](./module-reference.md)

### 给最终使用者

1. [用户文档](./user-guide.md)

## 文档清单

- [overview.md](./overview.md)
  项目定位、功能边界、页面结构、运行方式总览
- [architecture.md](./architecture.md)
  前端架构、状态流、数据流、播放引擎和导演模式实现
- [development-guide.md](./development-guide.md)
  环境搭建、开发流程、改造建议、常见注意事项
- [user-guide.md](./user-guide.md)
  面向导演、演员和旁观者的使用说明
- [script-data-spec.md](./script-data-spec.md)
  `Play` / `Scene` / `ScriptEvent` / `StageActorState` 的数据规范
- [module-reference.md](./module-reference.md)
  对仓库内主要代码文件逐一说明职责
- [review-notes.md](./review-notes.md)
  当前代码审查结果、已知风险、优化建议与排查优先级

## 兼容说明

旧文档路径 `docs/implementation-guide.md` 已保留，但内容会指向本目录，避免多份文档长期漂移。
