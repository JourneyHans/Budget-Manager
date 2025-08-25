# 预算管理器 (Budget Manager)

一个简单而实用的预算管理小程序，帮助用户计算在当前预算下能坚持多少个月。

## 功能特点

- 🎯 **实时计算**: 输入数据后立即显示结果
- 🌍 **多语言支持**: 支持中文和英文
- 📱 **响应式设计**: 适配各种设备尺寸
- 🎨 **现代化UI**: 美观的渐变背景和毛玻璃效果
- ⚡ **快速响应**: 流畅的用户体验

## 主要功能

1. **预算输入**: 输入当前剩余金额
2. **成本设置**: 设置每月成本支出
3. **智能计算**: 自动计算能坚持的月数
4. **结果展示**: 清晰显示计算结果和预算摘要
5. **语言切换**: 支持中英文切换

## 技术栈

- **前端框架**: React 18
- **样式**: CSS3 + 响应式设计
- **国际化**: i18next + react-i18next
- **构建工具**: Create React App

## 安装和运行

### 前提条件
- Node.js (版本 14 或更高)
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd Budget-Manager
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
Budget-Manager/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BudgetCalculator.js
│   │   └── BudgetCalculator.css
│   ├── i18n/
│   │   └── index.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 使用说明

1. 在"剩余金额"输入框中输入您当前的可用资金
2. 在"每月成本"输入框中输入您的月支出
3. 系统会自动计算并显示您能坚持的月数
4. 查看预算摘要了解详细信息
5. 点击"重置"按钮清空所有数据
6. 点击右上角语言按钮切换中英文

## 计算逻辑

- 如果剩余金额 ≤ 每月成本：显示"资金不足，无法坚持一个月"
- 如果剩余金额 > 每月成本：显示能坚持的月数（支持小数）

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证

MIT License

