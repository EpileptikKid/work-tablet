import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Auth0Provider } from '@auth0/auth0-react'
import history from './utils/history'

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  )
}

const providerConfig = {
  domain: process.env.REACT_APP_GREEN_DOMAIN,
  clientId: process.env.REACT_APP_GREEN_CLIENT_ID,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Auth0Provider {...providerConfig}>
    <App />
  </Auth0Provider>
)
