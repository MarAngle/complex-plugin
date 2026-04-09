### 4.10.2
- refactor(build): 将TypeScript类型导入语法升级为type关键字形式。

### 4.10.1
- refactor(build): 移除项目的所有构建配置，回归到纯源码模式。
- fix(deps): 修正 `complex-utils` 的版本依赖，并修复类型定义不匹配的编译错误。
- feat(test): 集成 `Vitest` 单元测试框架。
- docs(readme): 创建详细的 `README.md` 文件。

### 4.9.3
- feat(layout): `PluginLayoutData` 添加 `visible` 属性及相关显示/隐藏逻辑。

### 4.9.1
- feat(module): 修改模块加载逻辑为 ES2020。

### 4.8.2
- fix(layout): 修正 `resize` 事件的监听逻辑为 `delay` 模式，避免布局数据错误。
- refactor(code): 基于 AI 进行全局代码优化。

### 4.8.1
- chore: 稳定版升级。

### 4.6.10
- chore(deps): 升级 `complex-utils` 依赖。

### 4.6.8
- chore(deps): 升级 `complex-utils` 依赖，适配新版 `Wait` 类。

### 4.6.7
- chore(deps): 升级 `complex-utils` 依赖。
- feat(notice): 添加 `debugConfirm` 函数，用于开发模式下的安全确认。

### 4.6.3
- chore(deps): 升级 `complex-utils` 依赖。
- chore: 双数稳定版更新。

### 4.3.10
- chore(deps): 升级 `complex-utils` 依赖，优化 `Wait` 逻辑。

### 4.3.9
- refactor(notice): 优化 `notice` 的类型和加载逻辑，实现异步初始化。
- refactor(notice)!: **[非兼容性更新]** `notice.showMsg` 重命名为 `notice.message`。

### 4.3.2
- refactor(layout): 重构 `PluginLayout` 模块。

### 4.2.10
- refactor(layout): 将布局的触发事件由 `recount` 更改为 `resize`。

### 4.2.8
- refactor(code): 优化全局的 `undefined` 校验逻辑。

### 4.2.6
- chore(deps): 升级依赖并优化代码。

### 4.1.6
- refactor(layout)!: **[非兼容性更新]** `layout` 实例通过页面生成并通过 `provide` 传递。

### 4.1.4
- refactor(layout): 优化 `PluginLayout` 模块。

### 4.1.2
- refactor(date): 优化 `PluginDate` 模块。

### 4.1.1
- chore(deps): 升级依赖并优化类型定义。

### 4.1.0
- refactor(code): 统一函数命名规则 (外部函数、内部函数、私有函数)。

### 4.0.3
- chore(deps): 升级依赖，适配 `formatConfig`。

### 4.0.2
- refactor(layout): 优化 `layout` 的生命周期类型。

### 4.0.0
- feat: 项目初始化，实现布局、日期和通知等核心功能。
