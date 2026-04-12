# RepliStage 文档中心

`doc/` 是当前仓库唯一主文档入口，所有说明均以这里为准。

## 推荐阅读顺序

产品 / 架构 / 接手维护：

1. [项目概览](./overview.md)
2. [架构说明](./architecture.md)
3. [代码模块索引](./module-reference.md)

开发者：

1. [开发文档](./development-guide.md)
2. [剧本数据规范](./script-data-spec.md)
3. [代码模块索引](./module-reference.md)

导演 / 演员 / 使用者：

1. [用户文档](./user-guide.md)

## 文档清单

- [overview.md](./overview.md)
  当前产品定位、入口流程、能力边界
- [architecture.md](./architecture.md)
  路由、状态、播放器、setup 流程、导演模式、道具布景架构
- [development-guide.md](./development-guide.md)
  本地开发、测试、调试、改造建议
- [user-guide.md](./user-guide.md)
  排练模式、导演模式、示例剧本、JSON 工作流说明
- [script-data-spec.md](./script-data-spec.md)
  `Play` / `Scene` / `StageConfig` / `ScriptEvent` / `PlaySource`
- [module-reference.md](./module-reference.md)
  核心文件和目录职责索引
- [review-notes.md](./review-notes.md)
  当前代码审查结论、风险与优化方向

## 兼容说明

旧入口 [docs/implementation-guide.md](/Users/zephyrsui/Downloads/theare/docs/implementation-guide.md) 仅保留跳转说明，避免两套文档长期漂移。
