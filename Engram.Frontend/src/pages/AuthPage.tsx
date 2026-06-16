import { useState, useRef, useId, useCallback } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import './AuthPage.css'

gsap.registerPlugin(useGSAP)

type AuthMode = 'login' | 'register'

export function AuthPage() {
  const [searchParams] = useSearchParams()
  const initialMode = (searchParams.get('mode') as AuthMode) ?? 'login'
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cardRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  const emailId = useId()
  const passwordId = useId()
  const nameId = useId()

  // Card entrance animation
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.auth-logo', { scale: 0.85, autoAlpha: 0, duration: 0.35 })
        .from('.auth-headline', { y: 10, autoAlpha: 0, duration: 0.35 }, '-=0.15')
        .from('.auth-subline', { y: 8, autoAlpha: 0, duration: 0.3 }, '-=0.18')
        .from('.auth-tabs', { y: 8, autoAlpha: 0, duration: 0.3 }, '-=0.15')
        .from('.auth-field-group', { y: 10, autoAlpha: 0, duration: 0.3, stagger: 0.06 }, '-=0.12')
        .from('.auth-submit', { y: 6, autoAlpha: 0, duration: 0.25 }, '-=0.08')
        .from('.auth-footer-link', { autoAlpha: 0, duration: 0.2 }, '-=0.05')
    },
    { scope: cardRef },
  )

  // Animate form on mode switch — subtle cross-fade
  const switchMode = useCallback(
    (next: AuthMode) => {
      if (next === mode) return
      setError(null)

      if (formRef.current) {
        gsap.to(formRef.current, {
          y: 4,
          autoAlpha: 0,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => {
            setMode(next)
            requestAnimationFrame(() => {
              gsap.fromTo(
                formRef.current,
                { y: 4, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.2, ease: 'power2.out' },
              )
            })
          },
        })
      } else {
        setMode(next)
      }
    },
    [mode],
  )

  // Shake animation on error
  const shakeCard = useCallback(() => {
    if (!cardRef.current) return
    const target = cardRef.current.querySelector('.auth-card-inner')
    if (!target) return

    gsap.timeline()
      .to(target, { x: -5, duration: 0.05, ease: 'none' })
      .to(target, { x: 5, duration: 0.05, ease: 'none' })
      .to(target, { x: -3, duration: 0.05, ease: 'none' })
      .to(target, { x: 3, duration: 0.05, ease: 'none' })
      .to(target, { x: 0, duration: 0.05, ease: 'none' })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const data = new FormData(e.currentTarget)
    const email = data.get('email') as string
    const password = data.get('password') as string
    const name = data.get('name') as string | undefined

    // ── Backend placeholder ──────────────────────────────────────────
    // When backend is ready, replace with:
    //
    // const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    // const body = mode === 'login'
    //   ? { email, password }
    //   : { email, password, name }
    //
    // const response = await fetch(endpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   credentials: 'include',       // HttpOnly refresh token cookie
    //   body: JSON.stringify(body),
    // })
    //
    // if (!response.ok) {
    //   const err = await response.json()
    //   throw new Error(err.message ?? 'Authentication error')
    // }
    //
    // const { accessToken } = await response.json()
    // localStorage.setItem('engram_access_token', accessToken)
    // navigate('/app')
    // ─────────────────────────────────────────────────────────────────

    // Demo stub
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (!email.includes('@')) {
            reject(new Error('Введите корректный email'))
          } else if (password.length < 6) {
            reject(new Error('Пароль должен содержать минимум 6 символов'))
          } else if (mode === 'register' && !name?.trim()) {
            reject(new Error('Введите ваше имя'))
          } else {
            resolve()
          }
        }, 800)
      })

      localStorage.setItem('engram_access_token', 'demo_token')
      navigate('/app')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      shakeCard()
    } finally {
      setLoading(false)
    }
  }

  // Handle Enter key on form
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className="auth-page" ref={cardRef} onKeyDown={handleKeyDown}>
      {/* Background ambient light */}
      <div className="auth-bg" aria-hidden="true">
        <div className="auth-bg-orb auth-bg-orb-1" />
        <div className="auth-bg-orb auth-bg-orb-2" />
        <div className="auth-bg-orb auth-bg-orb-3" />
      </div>

      {/* Back to landing */}
      <Link to="/" className="auth-back-link" aria-label="Назад на главную">
        ← Engram
      </Link>

      <div className="auth-card-inner">
        {/* Logo */}
        <div className="auth-logo-wrap">
          <div className="auth-logo" aria-hidden="true">E</div>
        </div>

        {/* Headlines */}
        <div className="auth-header">
          <h1 className="auth-headline">
            {mode === 'login' ? 'С возвращением' : 'Создать аккаунт'}
          </h1>
          <p className="auth-subline">
            {mode === 'login'
              ? 'Войдите в свою базу знаний'
              : 'Начните превращать контент в структуру'}
          </p>
        </div>

        {/* Mode Tabs (segmented control) */}
        <div className="auth-tabs" role="tablist" aria-label="Режим аутентификации">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            id="auth-tab-login"
            onClick={() => switchMode('login')}
          >
            Вход
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'register'}
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            id="auth-tab-register"
            onClick={() => switchMode('register')}
          >
            Регистрация
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="auth-error" role="alert" aria-live="assertive">
            <span aria-hidden="true">⚠</span> {error}
          </div>
        )}

        {/* Form */}
        <form
          className="auth-form"
          onSubmit={handleSubmit}
          ref={formRef}
          noValidate
          aria-label={mode === 'login' ? 'Форма входа' : 'Форма регистрации'}
        >
          {mode === 'register' && (
            <div className="auth-field-group">
              <label className="auth-label" htmlFor={nameId}>Имя</label>
              <input
                id={nameId}
                name="name"
                type="text"
                className="auth-input"
                placeholder="Как вас зовут?"
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="auth-field-group">
            <label className="auth-label" htmlFor={emailId}>Email</label>
            <input
              id={emailId}
              name="email"
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              autoComplete={mode === 'login' ? 'email' : 'username'}
              required
            />
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor={passwordId}>Пароль</label>
            <input
              id={passwordId}
              name="password"
              type="password"
              className="auth-input"
              placeholder={mode === 'login' ? '••••••••' : 'Минимум 6 символов'}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className={`auth-submit ${loading ? 'loading' : ''}`}
            disabled={loading}
            id={mode === 'login' ? 'auth-login-btn' : 'auth-register-btn'}
          >
            {loading ? (
              <span className="auth-spinner" aria-hidden="true" />
            ) : mode === 'login' ? (
              'Войти'
            ) : (
              'Создать аккаунт'
            )}
          </button>
        </form>

        {/* Keyboard hint */}
        <div className="auth-kbd-hint">
          <span className="auth-kbd">Esc</span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 4 }}>
            — вернуться
          </span>
        </div>

        <p className="auth-footer-link">
          {mode === 'login' ? (
            <>
              Ещё нет аккаунта?{' '}
              <button type="button" className="auth-link-btn" onClick={() => switchMode('register')}>
                Зарегистрироваться
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{' '}
              <button type="button" className="auth-link-btn" onClick={() => switchMode('login')}>
                Войти
              </button>
            </>
          )}
        </p>

        {/* Backend placeholder hint (dev only) */}
        <p className="auth-dev-note" aria-hidden="true">
          ☝ Бэкенд ещё не подключён — форма работает как демо
        </p>
      </div>
    </div>
  )
}
