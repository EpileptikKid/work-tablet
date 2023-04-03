import { useAuth0 } from '@auth0/auth0-react'
import { Link, Outlet } from 'react-router-dom'

const Menu = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    })

  return (
    <>
      <header>
        <div className="headerMenu">
          <Link to="/">Головна</Link>
          {isAuthenticated && <Link to="/orders">Замовлення</Link>}
          {isAuthenticated && <Link to="/contacts">PizzaDay</Link>}
        </div>
        <div className="loggedButton">
          {isAuthenticated && (
            <button onClick={() => logoutWithRedirect()}>Вийти</button>
          )}
          {!isAuthenticated && (
            <button onClick={() => loginWithRedirect()}>Авторизуватися</button>
          )}
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Menu
