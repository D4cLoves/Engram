import { useState, useRef, useId } from 'react'
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
      tl.from('.auth-logo', { scale: 0.8, autoAlpha: 0, duration: 0.4 })
        .from('.auth-headline', { y: 14, autoAlpha: 0, duration: 0.4 }, '-=0.2')
        .from('.auth-subline', { y: 10, autoAlpha: 0, duration: 0.35 }, '-=0.22')
        .from('.auth-tab', { y: 8, autoAlpha: 0, duration: 0.3, stagger: 0.06 }, '-=0.2')
        .from('.auth-field-group', { y: 12, autoAlpha: 0, duration: 0.35, stagger: 0.07 }, '-=0.15')
        .from('.auth-submit', { y: 8, autoAlpha: 0, duration: 0.3 }, '-=0.1')
        .from('.auth-footer-link', { autoAlpha: 0, duration: 0.25 }, '-=0.05')
    },
    { scope: cardRef },
  )

  // Animate form fields on mode switch
  function switchMode(next: AuthMode) {
    if (next === mode) return
    setError(null)

    if (formRef.current) {
      gsap.to(formRef.current, {
        y: 6,
        autoAlpha: 0,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          setMode(next)
          gsap.fromTo(
            formRef.current,
            { y: 6, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.22, ease: 'power2.out' },
          )
        },
      })
    } else {
      setMode(next)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const data = new FormData(e.currentTarget)
    const email = data.get('email') as string
    const password = data.get('password') as string
    const name = data.get('name') as string | undefined

    // ── Задел для бека ────────────────────────────────────────────────────────
    // При готовом бэкенде заменить на реальный fetch:
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
    //   throw new Error(err.message ?? 'Ошибка аутентификации')
    // }
    //
    // const { accessToken } = await response.json()
    // localStorage.setItem('engram_access_token', accessToken)
    // navigate('/app')
    // ─────────────────────────────────────────────────────────────────────────

    // Временная заглушка: симулируем успешный вход
    try {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // Простая демонстрационная валидация
          if (!email.includes('@')) {
            reject(new Error('Введите корректный email'))
          } else if (password.length < 6) {
            reject(new Error('Пароль должен содержать минимум 6 символов'))
          } else if (mode === 'register' && !name?.trim()) {
            reject(new Error('Введите ваше имя'))
          } else {
            resolve()
          }
        }, 900)
      })

      localStorage.setItem('engram_access_token', 'demo_token')
      navigate('/app')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')

      // Shake animation on error
      if (cardRef.current) {
        const target = cardRef.current.querySelector('.auth-card-inner')
        gsap.timeline()
          .to(target, { x: -6, duration: 0.06, ease: 'none' })
          .to(target, { x: 6, duration: 0.06, ease: 'none' })
          .to(target, { x: -4, duration: 0.06, ease: 'none' })
          .to(target, { x: 4, duration: 0.06, ease: 'none' })
          .to(target, { x: 0, duration: 0.06, ease: 'none' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page" ref={cardRef}>
      {/* Background neural pattern */}
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

        {/* Mode Tabs */}
        <div className="auth-tabs" role="tablist" aria-label="Режим аутентификации">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'login'}
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            id="auth-tab-login"
            onClick={() => switchMode('login')}
          >
            Войти
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
              <label className="auth-label" htmlFor={nameId}>
                Имя
              </label>
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
            <label className="auth-label" htmlFor={emailId}>
              Email
            </label>
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
            <label className="auth-label" htmlFor={passwordId}>
              Пароль
            </label>
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
