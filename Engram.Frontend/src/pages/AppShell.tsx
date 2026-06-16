import { useNavigate } from 'react-router-dom'
import './AppShell.css'

// Временная заглушка. Будет заменена на полноценный app shell
// с сайдбаром, роутингом по разделам и реальными данными с бэкенда.
export function AppShell() {
  const navigate = useNavigate()

  function handleSignOut() {
    localStorage.removeItem('engram_access_token')
    navigate('/')
  }

  return (
    <div className="app-shell-placeholder">
      <div className="asp-card">
        <div className="asp-logo" aria-hidden="true">E</div>
        <h1 className="asp-title">Engram App</h1>
        <p className="asp-subtitle">
          Основное приложение находится в разработке.<br />
          Вы успешно аутентифицированы — здесь будет Knowledge Console.
        </p>
        <div className="asp-coming">
          <div className="asp-feature">
            <span className="asp-feature-dot" />
            Sources — добавление источников
          </div>
          <div className="asp-feature">
            <span className="asp-feature-dot" />
            Atom Inbox — модерация атомов
          </div>
          <div className="asp-feature">
            <span className="asp-feature-dot pending" />
            Knowledge Graph — граф знаний
          </div>
          <div className="asp-feature">
            <span className="asp-feature-dot pending" />
            SRS Review — интервальное повторение
          </div>
        </div>
        <button
          type="button"
          className="asp-signout"
          onClick={handleSignOut}
          id="app-shell-signout"
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  )
}
