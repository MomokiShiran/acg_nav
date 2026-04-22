# 贡献指南

欢迎参与 MyACG 项目的贡献！我们欢迎各种形式的贡献，包括但不限于：提交问题、修复bug、新增功能、改进文档等。

## 如何贡献

### 1. 提交问题 (Issues)

如果您发现了bug或有新功能建议，请：

1. 先搜索已有的 Issues，避免重复
2. 使用清晰的标题和描述
3. 提供复现步骤
4. 说明您的环境（浏览器、操作系统等）

### 2. 贡献代码 (Pull Requests)

1. **Fork 仓库**

2. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/acg_nav.git
   cd acg_nav
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-fix-name
   ```

4. **进行修改**
   - 遵循项目的代码风格
   - 确保代码可以正常运行
   - 添加必要的注释

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"  # 遵循提交规范
   ```

6. **推送到 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 提供清晰的标题和描述
   - 说明解决了什么问题
   - 关联相关的 Issue（如果有）

### 3. 提交规范

#### 提交格式

示例：

```bash
feat: xxxxxxx
```

#### Type 类型

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复bug |
| `docs` | 文档更新 |
| `style` | 代码格式调整（不影响功能） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具相关 |


## 开发指南

### 项目结构

```
acg_nav/
├── assets/          # 静态资源
│   ├── css/        # 样式文件
│   ├── js/         # JavaScript 文件
│   ├── fonts/      # 字体文件
│   └── images/     # 图片资源
├── sites/          # 网站详情页
├── favorites/      # 收藏分类
├── friends/        # 友链页面
├── index.html      # 主页
├── README.md       # 项目说明
└── CONTRIBUTING.md # 贡献指南
```

### 技术栈

- **HTML5** - 页面结构
- **CSS3** + **Bootstrap 4** - 样式框架
- **JavaScript** + **jQuery** - 交互逻辑


## 添加新网站

### 方式一：通过投稿页面

访问 [投稿页面](/postsite/) 提交网站信息。

### 方式二：直接贡献代码

1. 在 `sites/` 目录下创建对应的 HTML 文件
2. 在主页 `index.html` 中添加网站卡片
3. 确保网站符合收录标准

### 网站收录标准

- 网站运行稳定
- 与 ACG 主题相关

---

感谢您对 MyACG 项目的支持！
