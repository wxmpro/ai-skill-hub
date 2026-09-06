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
- **i18n**：内建中英双语（zh-CN / en）

---

## 项目位置

本项目已迁入 `10_app_web_dev` workspace，作为 `projects/web/04-ai-skill-hub/` 下的独立 Git 仓库。

- 工作区入口：`projects/registry.md` 第 04 行
- 本地路径：`projects/web/04-ai-skill-hub/`
- 远程仓库：`https://github.com/wxmpro/ai-skill-hub.git`

---

## 项目结构

```text
04-ai-skill-hub/
├── out/                          # 静态构建产物（gitignored）
├── prd.md                        # 产品需求文档
├── public/
│   ├── anthropics-skills/        # 镜像的 Anthropic 官方 skill 源文件
│   └── official-skills/          # 镜像的 OpenAI / Google / Vercel 官方 skill 源文件
├── src/
│   ├── app/
│   │   ├── layout.jsx            # 全局布局
│   │   ├── page.jsx              # 首页（导航卡片）
│   │   ├── globals.css           # 全局样式
│   │   ├── marketplaces/page.jsx
│   │   ├── official-skills/      # 官方 skill 总览 + 详情页
│   │   ├── anthropics-skills/    # anthropics 单仓库按 skill 详情页
│   │   ├── docs/page.jsx
│   │   ├── criteria/page.jsx
│   │   ├── examples/page.jsx
│   │   └── learn/page.jsx
│   ├── components/
│   │   ├── layout/               # Header, Nav, Footer, Theme/Lang/DocTitle
│   │   ├── sections/             # SearchableList 通用搜索组件
│   │   └── skill-source/         # Skill 详情页 / Breadcrumb / Legacy Redirect
│   ├── data/
│   │   ├── nav.js                # 顶部导航配置（隐含在 Nav.jsx 中）
│   │   ├── marketplaces.json     # 31 个 marketplace
│   │   ├── docs.json             # 12 个官方文档
│   │   ├── criteria.json         # 7 维评价标准
│   │   ├── examples.json         # 6 个优质示例
│   │   ├── learn/sections.json   # 8 节教程
│   │   ├── official-skills/      # 65 个官方 skill 索引 + 4 个发布方 vendor
│   │   └── anthropics-skills/    # 17 个 anthropic skill 详情（body + file 清单）
│   └── i18n/
│       ├── zh.json               # 中文文案
│       ├── en.json               # 英文文案
│       └── I18nContext.jsx       # 语言切换 Provider
├── next.config.mjs
├── jsconfig.json                 # @/* 路径别名
├── package.json
└── pnpm-workspace.yaml           # sharp allowBuilds hint（可选）
```

---

## 本地开发

```bash
# 安装依赖
npm install    # 或 pnpm install

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
| `/` | 首页：6 个分区的导航卡片 |
| `/marketplaces/` | 31 个 skill / MCP / agent 入口 |
| `/official-skills/` | 4 家官方发布方 65 个 skill 总览（按 vendor 分组） |
| `/official-skills/{vendor}/{skill}/` | 单个官方 skill 的 SKILL.md / 附件 / 大小详情 |
| `/anthropics-skills/` | 兼容旧链接的 redirect 页 |
| `/anthropics-skills/{name}/` | 兼容旧链接的 redirect 页 |
| `/docs/` | 12 份顶级公司实验室文档 |
| `/criteria/` | 7 维评价标准 + 评分公式 |
| `/examples/` | 6 个优质 skill 标杆 |
| `/learn/` | 8 节教程：如何写优质 skill |

---

## 数据规模（截至 v1.2.0）

| 区块 | 数量 |
|---|---|
| Marketplaces | 31 |
| 官方 Skill（4 个发布方） | 65（anthropics 17 · openai 44 · google 3 · vercel 1） |
| 官方文档 | 12 |
| 评价标准维度 | 7（权重合计 100%） |
| 优质示例 | 6 |
| 教程节 | 8 |
| 支持语言 | 2（zh-CN / en） |

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
- [ ] 加 RSS 订阅

---

## 数据来源

- Anthropic 官方 skills 文档与仓库
- Agent Skills 开放标准（agentskills.io）
- Vercel skills CLI 文档
- OpenAI skills catalog
- GitHub REST API / `gh` CLI 实时检索数据
- LangChain skills-benchmarks 等评测项目

---

## 版本历史

| 版本 | 日期 | 变更 |
|---|---|---|
| 1.2.0 | 2026-09-06 | 迁入 `10_app_web_dev/projects/web/04-ai-skill-hub/`；更新 vendors.json 计数；hero/卡片文案细化数字 |
| 1.1.1 | 2026-06-29 | 提升科研/研究类 Skill 的可发现性 |
| 1.1.0 | 2026-06-29 | 中文文案专业化修订 |
| 1.0.0 | 2026-06-29 | 首页与全局视觉重构（Double-Bezel 卡片、磁吸交互、Plus Jakarta Sans） |

---

## 许可

本项目为个人学习与导航用途，skill 链接与数据版权归原作者所有。源码采用 MIT License。