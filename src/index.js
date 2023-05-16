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
  domain: 'dev-u2a7gdf5uww4v3oj.us.auth0.com',
  clientId: 'q2ejTbw2N7ZkUigWP62JgSboCcFFj6tz',
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
