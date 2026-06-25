# AI Skill Hub

> 一个聚焦 AI Skill（Claude Code / Cursor / Codex / Agent Skill）的发现、评价与导航的网站项目。

---

## 项目简介

本项目旨在构建一个静态网站，帮助用户：

1. **发现 Skill**：快速找到 Claude Code、Cursor、Codex、OpenClaw 等 agent 生态中的优质 skill。
2. **学习规范**：理解 Agent Skills 官方规范、顶级公司文档和评价标准。
3. **评价 Skill**：使用可量化的 7 维度评分体系判断 skill 是否值得试用。
4. **参考示例**：查看经过验证的优质 skill 标杆。

---

## 项目结构

```
02-skill/
├── index.html              # 网站主页（当前版本）
├── assets/
│   ├── css/style.css       # 样式文件（后续拆分）
│   └── js/main.js          # 脚本文件（后续拆分）
├── chat-outputs/           # 本次会话的原始输出文件（已加入 .gitignore）
├── docs/                   # 项目文档
└── README.md               # 本文件
```

---

## 本地预览

由于 `index.html` 是静态页面，可直接用浏览器打开，或启动本地 HTTP 服务器：

```bash
# 方式一：直接用浏览器打开
open index.html

# 方式二：Python 临时服务器
python -m http.server 3000
open http://localhost:3000

# 方式三：Node.js serve
npx serve .
```

---

## 后续计划

- [ ] 将内联 CSS/JS 拆分为独立文件
- [ ] 增加搜索和筛选功能
- [ ] 接入 GitHub API 自动更新 skill 数据
- [ ] 添加评分工具页面
- [ ] 部署到 GitHub Pages / Vercel

---

## 数据来源

- Anthropic 官方 skills 文档与仓库
- Agent Skills 开放标准（agentskills.io）
- Vercel skills CLI 文档
- OpenAI skills catalog
- GitHub REST API / `gh` CLI 实时检索数据

---

## 许可

本项目为个人学习与导航用途，skill 链接与数据版权归原作者所有。
