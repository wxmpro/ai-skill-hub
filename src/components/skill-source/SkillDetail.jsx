'use client'

import { useState, useMemo, useEffect } from 'react'
import { marked } from 'marked'
import { useI18n } from '@/i18n/I18nContext'

// 把文件按目录分组，构建嵌套结构
function buildTree(files) {
  const root = {}
  for (const f of files) {
    const parts = f.path.split('/')
    let cur = root
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]
      if (i === parts.length - 1) {
        cur[p] = { __file: true, size: f.size, fullPath: f.path }
      } else {
        cur[p] = cur[p] || {}
        cur = cur[p]
      }
    }
  }
  return root
}

function TreeNode({ name, node, depth, onSelect, selectedPath, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || depth < 1)
  const isFile = node.__file
  const indent = { paddingLeft: 8 + depth * 14 }

  if (isFile) {
    const isSelected = selectedPath === node.fullPath
    return (
      <button
        className={`tree-item tree-file ${isSelected ? 'active' : ''}`}
        style={indent}
        onClick={() => onSelect(node.fullPath)}
        title={node.fullPath}
      >
        <span className="tree-icon">{getFileIcon(name)}</span>
        <span className="tree-name">{name}</span>
        <span className="tree-size">{formatSize(node.size)}</span>
      </button>
    )
  }
  return (
    <div className="tree-folder-block">
      <button
        className={`tree-item tree-folder ${open ? 'open' : ''}`}
        style={indent}
        onClick={() => setOpen(!open)}
      >
        <span className="tree-icon">{open ? '📂' : '📁'}</span>
        <span className="tree-name">{name}</span>
      </button>
      {open && (
        <div className="tree-children">
          {Object.entries(node).map(([k, v]) => (
            <TreeNode
              key={k}
              name={k}
              node={v}
              depth={depth + 1}
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function getFileIcon(name) {
  if (name.endsWith('.md')) return '📘'
  if (name.endsWith('.py')) return '🐍'
  if (name.endsWith('.js') || name.endsWith('.ts')) return '📜'
  if (name.endsWith('.json')) return '⚙️'
  if (name.endsWith('.html')) return '🌐'
  if (name.endsWith('.css')) return '🎨'
  if (name.endsWith('.txt')) return '📄'
  if (name.endsWith('.pdf')) return '📕'
  if (name.endsWith('.png') || name.endsWith('.jpg')) return '🖼️'
  return '📄'
}

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + 'M'
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + 'K'
  return bytes + 'B'
}

// 简易代码着色（避免引入 prismjs，控制在轻量）
// 用占位符避免重复替换同一段文本
function highlightCode(code, lang) {
  // 1. 先做 HTML 转义
  let html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const placeholders = []
  // 用极其罕见的 ASCII 字符串做占位符（避免 NUL 字符的兼容问题）
  const TOKEN = 'PH'
  const TOKEN_END = 'HP'
  function stash(content) {
    const idx = placeholders.length
    placeholders.push(content)
    return `${TOKEN}${idx}${TOKEN_END}`
  }
  if (lang === 'python') {
    html = html.replace(/(#.*$)/gm, (m) => stash(`<span class="tok-comment">${m}</span>`))
    html = html.replace(/'''[\s\S]*?'''|"""[\s\S]*?"""|(['"`])((?:\\\1|(?!\1).)*?)\1/g, (m) => stash(`<span class="tok-string">${m}</span>`))
    html = html.replace(/\b(def|class|return|if|else|elif|for|while|import|from|as|with|try|except|finally|raise|pass|None|True|False|in|not|and|or|lambda|yield|async|await|self)\b/g, (m) => stash(`<span class="tok-keyword">${m}</span>`))
    html = html.replace(/\b(\d+)\b/g, (m) => stash(`<span class="tok-number">${m}</span>`))
  } else if (lang === 'javascript' || lang === 'typescript') {
    html = html.replace(/(\/\/.*$)/gm, (m) => stash(`<span class="tok-comment">${m}</span>`))
    html = html.replace(/(['"`])((?:\\\1|(?!\1).)*?)\1/g, (m) => stash(`<span class="tok-string">${m}</span>`))
    html = html.replace(/\b(const|let|var|function|return|if|else|for|while|class|new|import|from|export|async|await|null|undefined|true|false|this|typeof)\b/g, (m) => stash(`<span class="tok-keyword">${m}</span>`))
    html = html.replace(/\b(\d+)\b/g, (m) => stash(`<span class="tok-number">${m}</span>`))
  } else if (lang === 'json') {
    html = html.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, (_, q, c) => stash(`<span class="tok-key">${q}</span>${c}`))
    html = html.replace(/:\s*("(?:[^"\\]|\\.)*")/g, (_, q) => `: ${stash(`<span class="tok-string">${q}</span>`)}`)
  }
  // 还原占位符
  const re = new RegExp(`${TOKEN}(\\d+)${TOKEN_END}`, 'g')
  html = html.replace(re, (_, idx) => placeholders[+idx])
  return html
}

function getLangFromName(name) {
  if (name.endsWith('.py')) return 'python'
  if (name.endsWith('.ts')) return 'typescript'
  if (name.endsWith('.js')) return 'javascript'
  if (name.endsWith('.json')) return 'json'
  if (name.endsWith('.html')) return 'html'
  if (name.endsWith('.css')) return 'css'
  return null
}

// 把 skill 数据（含 SKILL.md 全文 + 子文件）传到客户端
// 子文件正文通过单独的 fetch 拿（public/ 静态文件）
export default function SkillDetail({ skill, vendor }) {
  const { t, lang } = useI18n()
  const [selectedPath, setSelectedPath] = useState('SKILL.md')
  const [content, setContent] = useState(lang === 'en' ? skill.body : (skill.bodyZh || skill.body))
  const [contentName, setContentName] = useState('SKILL.md')
  const [loading, setLoading] = useState(false)

  // 切换语言时，如果当前选中的是 SKILL.md，重载翻译版
  useEffect(() => {
    if (selectedPath === 'SKILL.md') {
      setContent(lang === 'en' ? skill.body : (skill.bodyZh || skill.body))
    }
  }, [lang, skill.body, skill.bodyZh, selectedPath])

  const tree = useMemo(() => {
    // 把 SKILL.md 注入到文件树根目录
    const allFiles = [{ path: 'SKILL.md', size: skill.body.length }, ...skill.files]
    return buildTree(allFiles)
  }, [skill])

  const baseUrl = vendor ? `/official-skills/${vendor}/${skill.name}` : `/anthropics-skills/${skill.name}`

  const handleSelect = async (filePath) => {
    setSelectedPath(filePath)
    setLoading(true)
    setContentName(filePath)
    if (filePath === 'SKILL.md') {
      setContent(lang === 'en' ? skill.body : (skill.bodyZh || skill.body))
      setLoading(false)
      return
    }
    try {
      const url = `${baseUrl}/${filePath}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const text = await res.text()
      setContent(text)
    } catch (e) {
      setContent(`<!-- ${lang === 'en' ? 'Failed to load' : '加载失败'}: ${e.message} -->`)
    }
    setLoading(false)
  }

  const rendered = (() => {
    const isMd = contentName.endsWith('.md')
    if (isMd) {
      try {
        return marked.parse(content, { gfm: true, breaks: false })
      } catch (e) {
        return `<pre>${e.message}</pre>`
      }
    }
    const lang = getLangFromName(contentName)
    if (lang) {
      return `<pre class="code-block lang-${lang}"><code>${highlightCode(content, lang)}</code></pre>`
    }
    return `<pre class="code-block">${content.replace(/</g, '&lt;')}</pre>`
  })()

  return (
    <div className="skill-detail">
      <div className="skill-detail-sidebar">
        <div className="skill-detail-sidebar-header">
          <strong>{lang === 'en' ? 'File tree' : '文件树'}</strong>
          <span className="muted">
            {skill.fileCount + 1} {lang === 'en' ? 'items' : '项'}
          </span>
        </div>
        <div className="skill-tree">
          {Object.entries(tree).map(([k, v]) => (
            <TreeNode
              key={k}
              name={k}
              node={v}
              depth={0}
              onSelect={handleSelect}
              selectedPath={selectedPath}
              defaultOpen={k === 'SKILL.md'}
            />
          ))}
        </div>
      </div>

      <div className="skill-detail-main">
        <div className="skill-detail-toolbar">
          <code className="current-file">{contentName}</code>
          <a
            href={`https://github.com/${skill.repo || 'anthropics/skills'}/tree/main/skills/${skill.name}/${contentName === 'SKILL.md' ? '' : contentName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            <svg className="card-link-icon" viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>
        </div>
        <div className="skill-detail-content">
          {loading ? (
            <div className="loading-state">{lang === 'en' ? 'Loading…' : '加载中…'}</div>
          ) : (
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: rendered }}
            />
          )}
        </div>
      </div>
    </div>
  )
}