# AI Skill Hub

> AI Skill 资源导航 + 学习站：发现、评价、学会写优质 skill

---

## 项目简介

本项目是一个**静态内容站**，帮助用户：

1. **发现 Skill** — 快速找到 Claude Code、Cursor、Codex、OpenClaw 等 agent 生态中的优质 skill
2. **学习规范** — 理解 Agent Skills 官方规范、顶级公司文档和评价标准
3. **评价 Skill** — 使用可量化的 7 维度评分体系判断 skill 是否值得试用
4. **学会写** — 通过 8 节教程，从规范解剖到反例分析，手把手写出优质 skill

---

## 技术栈

- **Next.js 16** App Router（静态导出 `output: 'export'`）
- **React 19**
- **静态部署**到 GitHub Pages / Vercel / 任何静态托管
- **零外部 UI 库**：手写 CSS，无 Tailwind 依赖

---

## 项目结构

```
02-skill/
├── out/                          # 静态构建产物（gitignored）
├── src/
│   ├── app/
│   │   ├── layout.jsx           # 全局布局
│   │   ├── page.jsx             # 首页（导航卡片）
│   │   ├── globals.css          # 全局样式
│   │   ├── marketplaces/page.jsx
│   │   ├── docs/page.jsx
│   │   ├── criteria/page.jsx
│   │   ├── examples/page.jsx
│   │   └── learn/page.jsx
│   ├── components/
│   │   ├── layout/              # Header, Footer
│   │   ├── sections/            # （预留）
│   │   └── ui/                  # （预留）
│   └── data/
│       ├── nav.js               # 顶部导航配置
│       ├── marketplaces.json    # 20 个 marketplace
│       ├── docs.json            # 12 个官方文档
│       ├── criteria.json        # 7 维评价标准
│       └── examples.json        # 6 个优质示例
├── next.config.mjs
├── jsconfig.json                # @/* 路径别名
├── package.json
└── chat-outputs/                # 本次会话原始输出（gitignored）
```

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（热更新）
npm run dev
# → http://localhost:3000

# 生产构建（生成静态文件到 out/）
npm run build

# 本地预览构建结果
npx serve out
# → http://localhost:3000
```

---

## 路由

| 路径 | 内容 |
|---|---|
| `/` | 首页：5 个分区的导航卡片 |
| `/marketplaces/` | 20 个 skill / MCP / agent 入口 |
| `/docs/` | 12 个顶级公司实验室文档 |
| `/criteria/` | 7 维评价标准 + 评分公式 |
| `/examples/` | 6 个优质 skill 标杆 |
| `/learn/` | 8 节教程：如何写优质 skill |

---

## 部署

`npm run build` 会在 `out/` 目录生成纯静态文件，可以直接部署到：

- **GitHub Pages**：推到 `gh-pages` 分支
- **Vercel**：`vercel deploy` 自动识别
- **Netlify**：`netlify deploy --dir=out`
- **任何静态托管**：上传 `out/` 全部内容

---

## 后续计划

- [ ] 加搜索 / 筛选功能（按 tag 筛选 marketplace）
- [ ] 接入 GitHub API 自动更新数据
- [ ] 加评分工具页面（输入 skill URL 自动打分）
- [ ] 中英双语化
- [ ] 加 RSS 订阅

---

## 数据来源

- Anthropic 官方 skills 文档与仓库
- Agent Skills 开放标准（agentskills.io）
- Vercel skills CLI 文档
- OpenAI skills catalog
- GitHub REST API / `gh` CLI 实时检索数据
- Terryc21/skill-reviewer、LangChain skills-benchmarks 等评测项目

---

## 许可

本项目为个人学习与导航用途，skill 链接与数据版权归原作者所有。
