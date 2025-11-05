# Complex Plugin

这是一个功能强大的复杂插件，旨在提供高度可扩展的布局管理、日期处理和通知功能。

## 特性

- **布局管理 (`PluginLayout`)**:
  - 动态安装和卸载布局模块。
  - 自动计算主内容区域和附加区域的尺寸。
  - 响应式的生命周期事件 (`install`, `extra`, `main`, `body`, `change`)。
- **日期管理 (`PluginDate`)**:
  - 统一的日期实例，自动更新当前时间。
  - 可自定义的日期解析规则和格式化函数。
  - 高效的定时器管理，可动态调整更新频率。
- **通知系统 (`notice`)**:
  - 异步初始化，确保在UI库加载完成后再执行通知。
  - 提供 `message`, `alert`, `confirm` 等标准通知方法。
  - 内置 `debugConfirm`，用于在开发模式下进行安全的操作确认。

## 安装

```bash
npm install complex-plugin
```

## 使用

### 布局管理

```typescript
import { PluginLayout } from 'complex-plugin';

const layout = new PluginLayout({
  header: { height: 60 },
  footer: { height: 50 },
  sidebar: { width: 200 }
});

layout.onLife('main', () => {
  console.log('Main area size changed:', layout.main.width, layout.main.height);
});
```

### 日期管理

```typescript
import { date } from 'complex-plugin';

// 获取预定义的“今天”
const today = date.getValue('today');

// 添加自定义解析规则
date.pushRule('lastYear', (current) => {
  return new Date(current.getFullYear() - 1, current.getMonth(), current.getDate());
});

const lastYear = date.getValue('lastYear');
```

### 通知系统

```typescript
import { notice } from 'complex-plugin';

// 假设您使用的是 Ant Design Vue
import { message, Modal } from 'ant-design-vue';

notice.init({
  message: message.info,
  alert: Modal.info,
  confirm: Modal.confirm
});

// 现在，您可以在项目的任何地方调用 notice
notice.message('操作成功！');
```

## 依赖

- [complex-utils](https://github.com/MarAngle/complex-utils): 提供核心的工具函数和基类。
