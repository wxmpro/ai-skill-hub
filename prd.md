---
date: 2026-09-06
version: 1.2.0
status: shipped
---

# AI Skill Hub PRD

## Problem Statement

AI Skill 生态在 2025–2026 年爆发式增长（Anthropic 起草 Agent Skills 标准，Vercel Labs 上线 npx skills CLI，OpenAI 推出 Codex skills catalog）。开发者面临三个核心痛点：

1. **找不到** — Skill 散布在 GitHub awesome 列表、各家公司仓库、第三方 registry 中，缺乏统一入口。
2. **判断不了** — Skill 可执行脚本、读写文件、调用网络，质量参差。没有可量化的评价标准。
3. **写不出** — SKILL.md 规范（frontmatter / progressive disclosure / 触发词）门槛高，新手往往写出"看起来能用但触发不到"的 skill。

不解决：开发者继续复制粘贴网上的"prompt template"，agent 加载不到正确的工具，效率损失严重。

## Solution

构建一个**静态内容站**，把"发现 → 评价 → 学习"三段流程做成三个核心板块：

- **Marketplaces 板块**：31 个 skill/MCP/agent 入口聚合（registry、市场、精选列表），按 tag 筛选 + 关键词搜索。
- **Official Skills 板块**：镜像 4 家官方发布方（Anthropic 17、OpenAI 44、Google Gemini 3、Vercel Labs 1）共 65 个 skill 的完整 SKILL.md + 附件。点击即在站内查看，无需跳转 GitHub。
- **Criteria 板块**：基于 Anthropic 官方规范、agentskills.io 标准、Vercel CLI 文档综合整理的 7 维量化评价标准（规范 20% + 兼容 15% + 描述 20% + 示例 15% + 文档 10% + 活跃 10% + 安全 10%），其中规范、兼容、活跃、安全为「一票否决」项。
- **Examples 板块**：6 个经过验证的优质 skill 标杆，含 star、tags、why-good 拆解。
- **Learn 板块**：8 节教程，从 SKILL.md 规范解剖 → 必备 Markdown 区块 → 配套资源结构 → 写好 description 的秘诀 → 多 agent 兼容写法 → 常见错误与反例 → 上线前自检清单 → 持续迭代循环。

支持中英双语（zh-CN / en），通过顶栏切换。

## User Stories

1. 作为**新接触 AI skill 的开发者**，我想快速浏览"有哪些 skill 可用"，以便我决定要不要投入时间学。
2. 作为**正在选型 skill 的工程师**，我想用 7 维评分表快速判断一个 skill 是否值得试用，以便节省评估成本。
3. 作为**想自己发布 skill 的作者**，我想看到 6 个优质样本和 8 节教程，以便我少踩坑。
4. 作为**习惯读英文文档的开发者**，我想要中英切换，以便对照阅读规范原文。
5. 作为**在多 agent（Claude Code / Cursor / Codex / Copilot）间切换的用户**，我想看到每个 skill 兼容哪些 agent，以便不会装错地方。

## Implementation Decisions

### 1. 项目位置与目录结构

```text
10_app_web_dev/
└── projects/
    └── web/
        └── 04-ai-skill-hub/            # 本项目
            ├── prd.md                  # 本文档
            ├── README.md               # 项目入口
            ├── package.json            # v1.2.0
            ├── next.config.mjs         # output: 'export' 静态构建
            ├── jsconfig.json           # @/* 路径别名
            ├── pnpm-workspace.yaml     # sharp allowBuilds hint
            ├── public/
            │   ├── anthropics-skills/  # 17 个 anthropic skill 源文件镜像
            │   └── official-skills/    # OpenAI/Google/Vercel skill 镜像
            └── src/
                ├── app/                # Next.js App Router 路由
                ├── components/         # UI 组件
                ├── data/               # JSON 数据源
                └── i18n/               # zh / en 文案 + Provider
```

### 2. 技术栈

| 层级 | 技术 | 理由 |
|------|------|------|
| 框架 | Next.js 16（App Router） | 静态导出原生支持；React 19；JSON import 无需 fetch |
| UI | 手写 CSS + CSS variables | 零运行时依赖；完全控制主题切换（dark/light） |
| 字体 | Plus Jakarta Sans + Noto Sans SC（Google Fonts CDN） | 多语种字形完整 |
| 数据 | 静态 JSON | 离线构建；零后端；CI-friendly |
| i18n | 自建 Context + zh/en JSON | 仅 2 语种，无需 i18next |
| 部署 | `output: 'export'` → `out/` | GitHub Pages / Vercel / Netlify / S3 通用 |

### 3. 核心数据契约

| 文件 | 字段 | 用途 |
|---|---|---|
| `marketplaces.json` | `title, url, icon, tag, tagline, taglineEn, stars, githubRepo, type` | Marketplace 卡片渲染 |
| `docs.json` | `title, url, icon, description` | 文档卡片 |
| `criteria.json` | `name, nameEn, weight, veto, importance, source, sourceType` | 评分表 + 公式 |
| `examples.json` | `avatar, title, url, subtitle, why, whyEn, tags, stars` | 标杆展示 |
| `learn/sections.json` | `title, titleZh, source, sourceZh, body, bodyZh` | 教程正文 |
| `official-skills/index.json` | `vendor, name, description, descriptionZh, body, files[]` | 65 个 skill 总览 + 详情 |
| `official-skills/vendors.json` | `id, label, emoji, desc, repo` | 按发布方分组 |
| `anthropics-skills/{name}` 文件树 | 镜像 Anthropic 官方 skill 仓库的源文件 | 提供 SKILL.md 与附件查看 |

### 4. 关键路由约定

- 所有页面用 `trailingSlash: true`（GitHub Pages 友好）
- `app/official-skills/[vendor]/[skill]/page.jsx` 动态渲染 65 个 skill 详情
- `app/anthropics-skills/[name]/page.jsx` 是旧版本兼容 redirect，已被 `LegacyRedirect` 接管

### 5. 设计原则

- **静态优先**：所有数据编译期写入，构建后无运行时依赖
- **镜像而非外链**：官方 skill 内容完整镜像在 `public/`，站内可读，避免链接腐烂
- **多语种平等**：zh / en 同字段并行，每条数据都有中英两版 tagline/why

## Out of Scope

- **不接**后端 API / 数据库 — 所有数据为静态 JSON
- **不接**用户登录 / 收藏 / 评论 — 保持纯静态
- **不接**实时爬虫 — 数据更新走 PR 流程
- **不接**i18n 多于 2 种语言 — zh-CN + en 已覆盖目标用户
- **不接**服务端渲染 — 所有页面预构建为 HTML

## Success Criteria

- [x] `npm run build` 在零错误下生成完整 `out/`（静态文件 < 50MB）
- [x] 31 个 marketplace + 65 个官方 skill + 12 份文档 + 6 个示例 + 8 节教程全部可在站内访问
- [x] 中英切换对所有页面、所有数据字段均生效
- [x] `trailingSlash: true` 保证 GitHub Pages 子路径部署正常
- [x] `public/anthropics-skills/` 与 `public/official-skills/` 镜像数据与 `data/*.json` 一致
- [x] `projects/registry.md` 中 04 行已登记，远程仓库指向 wxmpro/ai-skill-hub

## Versioning

遵循 `10_app_web_dev` workspace 全局 SemVer 规范：

- **MAJOR** — 架构变更（如引入服务端、增加 i18n 语种至 ≥3）
- **MINOR** — 新区块 / 新筛选维度 / 新发布方镜像
- **PATCH** — 数据条目增删 / 文案修订 / Bug 修复

当前 v1.2.0 为 MINOR：迁入 workspace + 数据条目计数完善 + 文案数字统一。