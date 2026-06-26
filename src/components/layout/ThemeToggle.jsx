'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 读取 localStorage 或系统偏好
    const saved = localStorage.getItem('theme')
    const initial = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  // 避免 hydration mismatch，未挂载时显示占位
  if (!mounted) {
    return <button className="theme-toggle" aria-label="切换主题" style={{ visibility: 'hidden' }}>🌗</button>
  }

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label="切换主题"
      title={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
    >
      <span className="theme-toggle-icon">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
      <span>{theme === 'dark' ? '浅色' : '深色'}</span>
    </button>
  )
}
