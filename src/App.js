import { useState } from 'react'
import './App.css'
import AppContext from './utils/AppContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Menu from './views/Menu'
import Orders from './views/Orders'
import Work from './views/Work'
import Client from './components/client/Client'

const App = () => {
  const [state, setState] = useState({
    clientList: [],
    date: null,
  })

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ state, setState }}>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="/" element={<Home />} />
            <Route path="orders" element={<Orders />} />
            <Route path="*" element={<h1>Not found</h1>} />
            <Route path="client/:id" element={<Client />} />
            <Route path="work" element={<Work />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App
