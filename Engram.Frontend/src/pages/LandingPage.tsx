import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './LandingPage.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* ─── Data ─── */

const features = [
  {
    icon: '⬡',
    title: 'Knowledge Atoms',
    description:
      'Из источника извлекаются конкретные атомы знания — короткие, типизированные единицы с источником и уверенностью.',
  },
  {
    icon: '⚡',
    title: 'Content Pipeline',
    description:
      'Текст проходит автоматическую очистку, разбиение и обработку ИИ. Каждый шаг прозрачен и контролируем.',
  },
  {
    icon: '📥',
    title: 'Atom Inbox',
    description:
      'Найденные атомы попадают во входящие. Принять, отредактировать, отклонить — полный контроль.',
  },
  {
    icon: '🔗',
    title: 'Knowledge Graph',
    description:
      'Принятые атомы соединяются в граф: связи, зависимости, кластеры по теме.',
  },
  {
    icon: '🧠',
    title: 'SRS Review',
    description:
      'Каждый атом получает SRS-расписание. Система напоминает повторять то, что начинает забываться.',
  },
  {
    icon: '📊',
    title: 'Retention Analytics',
    description:
      'Аналитика памяти: какие темы вы помните, какие нет, как меняется retention со временем.',
  },
]

const pipelineSteps = ['Источник', 'Очистка', 'Разбиение', 'Атомы', 'Граф', 'SRS']

const atomTypes = [
  { type: 'Definition', label: 'Определение' },
  { type: 'Claim', label: 'Утверждение' },
  { type: 'Technique', label: 'Техника' },
  { type: 'Warning', label: 'Предупреждение' },
  { type: 'Example', label: 'Пример' },
  { type: 'Question', label: 'Вопрос' },
]

const exampleAtoms = [
  {
    type: 'Definition',
    title: 'Redis — in-memory key-value хранилище',
    content:
      'Redis хранит данные в оперативной памяти, что обеспечивает высокую скорость операций по сравнению с дисковыми БД.',
    source: 'Статья про Redis',
    confidence: 0.94,
  },
  {
    type: 'Technique',
    title: 'Cache-aside паттерн',
    content:
      'Приложение сначала проверяет данные в Redis. При промахе читает из основной БД и сохраняет результат в кэш.',
    source: 'Статья про Redis',
    confidence: 0.91,
  },
  {
    type: 'Warning',
    title: 'Redis не заменяет основную БД',
    content:
      'Без понимания persistence, eviction policy и риска потери данных Redis нельзя использовать как основное хранилище.',
    source: 'Статья про Redis',
    confidence: 0.88,
  },
]

/* ─── Neural canvas animation ─── */

function useNeuralCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const nodeCount = 50
    const nodes: { x: number; y: number; vx: number; vy: number; r: number; pulse: number }[] = []
    const W = () => canvas.offsetWidth
    const H = () => canvas.offsetHeight

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    let raf: number
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const rgb = isDark ? '10, 132, 255' : '0, 122, 255'

    const draw = () => {
      ctx.clearRect(0, 0, W(), H())

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.015
        if (n.x < 0 || n.x > W()) n.vx *= -1
        if (n.y < 0 || n.y > H()) n.vy *= -1
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.12
            ctx.strokeStyle = `rgba(${rgb}, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const pulsedR = n.r + Math.sin(n.pulse) * 0.3
        ctx.beginPath()
        ctx.arc(n.x, n.y, pulsedR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb}, 0.35)`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef])
}

/* ─── Component ─── */

export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const atomsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useNeuralCanvas(canvasRef)

  // Hero entrance — staggered fade-up
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-eyebrow', { y: 12, autoAlpha: 0, duration: 0.5 })
        .from('.hero-title', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.3')
        .from('.hero-subtitle', { y: 14, autoAlpha: 0, duration: 0.5 }, '-=0.35')
        .from('.hero-actions', { y: 10, autoAlpha: 0, duration: 0.4 }, '-=0.25')
        .from('.hero-badge', { scale: 0.92, autoAlpha: 0, duration: 0.3, stagger: 0.06 }, '-=0.2')
    },
    { scope: heroRef },
  )

  // Pipeline — subtle slide-up on scroll
  useGSAP(() => {
    gsap.from('.pipeline-flow', {
      y: 20,
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.pipeline-section',
        start: 'top 80%',
      },
    })
  })

  // Features — stagger in
  useGSAP(
    () => {
      gsap.from('.feature-card', {
        y: 24,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 82%',
        },
      })
    },
    { scope: featuresRef },
  )

  // Atoms — slide from left
  useGSAP(
    () => {
      gsap.from('.atom-demo-card', {
        x: -16,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: atomsRef.current,
          start: 'top 80%',
        },
      })
    },
    { scope: atomsRef },
  )

  // CTA — fade up
  useGSAP(
    () => {
      gsap.from('.cta-inner', {
        y: 16,
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
        },
      })
    },
    { scope: ctaRef },
  )

  return (
    <div className="landing">
      {/* ─── Navigation ─── */}
      <header className="landing-nav" role="banner">
        <div className="nav-inner">
          <div className="nav-brand" aria-label="Engram">
            <div className="nav-logo" aria-hidden="true">E</div>
            <span className="nav-brand-name">Engram</span>
          </div>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#features">Возможности</a>
            <a href="#how-it-works">Как работает</a>
            <a href="#atoms">Атомы</a>
          </nav>
          <div className="nav-cta">
            <Link to="/auth?mode=login" className="nav-link-btn">Войти</Link>
            <Link to="/auth?mode=register" className="nav-cta-btn">Начать</Link>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
        <div className="hero-glow hero-glow-1" aria-hidden="true" />
        <div className="hero-glow hero-glow-2" aria-hidden="true" />

        <div className="hero-content">
          <p className="hero-eyebrow">Система знаний нового поколения</p>
          <h1 className="hero-title" id="hero-title">
            Превращайте контент<br />
            <span className="hero-title-accent">в живые знания</span>
          </h1>
          <p className="hero-subtitle">
            Engram извлекает из ваших источников структурированные атомы знания,
            строит граф связей и помогает не забывать важное.
          </p>
          <div className="hero-actions">
            <Link to="/auth?mode=register" className="btn-primary" id="hero-cta-register">
              Начать бесплатно
            </Link>
            <a href="#how-it-works" className="btn-secondary">
              Как это работает
            </a>
          </div>
          <div className="hero-badges" aria-label="Типы атомов">
            {atomTypes.map((a) => (
              <span key={a.type} className="hero-badge">{a.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pipeline ─── */}
      <section id="how-it-works" className="pipeline-section" aria-labelledby="pipeline-title">
        <div className="section-container">
          <div className="section-header">
            <p className="section-eyebrow">Архитектура</p>
            <h2 id="pipeline-title">Путь от источника к знанию</h2>
            <p className="section-subtitle">
              Каждый источник проходит автоматический конвейер и превращается в структурированную базу атомов.
            </p>
          </div>
          <div className="pipeline-flow" aria-label="Pipeline steps">
            {pipelineSteps.map((step, i, arr) => (
              <div key={step} className="pipeline-flow-item">
                <div className="pipeline-step">
                  <span className="pipeline-step-num">{i + 1}</span>
                  <span className="pipeline-step-label">{step}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="pipeline-arrow" aria-hidden="true">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="features-section" ref={featuresRef} aria-labelledby="features-title">
        <div className="section-container">
          <div className="section-header">
            <p className="section-eyebrow">Возможности</p>
            <h2 id="features-title">Всё для работы со знаниями</h2>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <article key={f.title} className="feature-card">
                <div className="feature-icon" aria-hidden="true">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Atoms Demo ─── */}
      <section id="atoms" className="atoms-section" ref={atomsRef} aria-labelledby="atoms-title">
        <div className="section-container">
          <div className="section-header">
            <p className="section-eyebrow">Knowledge Atoms</p>
            <h2 id="atoms-title">Структурированные единицы знания</h2>
            <p className="section-subtitle">
              Атом — это не заметка. Это типизированная, самостоятельная единица с источником, уверенностью и местом в графе.
            </p>
          </div>
          <div className="atom-demo-list" role="list">
            {exampleAtoms.map((atom) => (
              <article className="atom-demo-card" key={atom.title} role="listitem">
                <div className="atom-demo-header">
                  <span className={`atom-type-badge atom-type-${atom.type.toLowerCase()}`}>
                    {atom.type}
                  </span>
                  <span className="atom-confidence" aria-label={`Confidence ${Math.round(atom.confidence * 100)}%`}>
                    {Math.round(atom.confidence * 100)}%
                  </span>
                </div>
                <h3 className="atom-demo-title">{atom.title}</h3>
                <p className="atom-demo-content">{atom.content}</p>
                <footer className="atom-demo-footer">
                  <span className="atom-demo-source">↗ {atom.source}</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section" ref={ctaRef} aria-labelledby="cta-title">
        <div className="section-container">
          <div className="cta-inner">
            <div className="cta-glow" aria-hidden="true" />
            <p className="section-eyebrow">Готовы начать?</p>
            <h2 id="cta-title">Создайте свою базу знаний</h2>
            <p className="cta-subtitle">
              Добавьте первый источник и посмотрите, как Engram извлекает атомы.
            </p>
            <Link to="/auth?mode=register" className="btn-primary" id="cta-register-btn">
              Создать аккаунт
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="landing-footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="nav-logo" aria-hidden="true" style={{ width: 18, height: 18, fontSize: 11 }}>E</div>
            <span>Engram</span>
          </div>
          <p className="footer-copy">
            Система превращения контента в живую базу знаний.
          </p>
        </div>
      </footer>
    </div>
  )
}
