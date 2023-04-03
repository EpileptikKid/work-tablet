import { useContext } from 'react'
import AppContext from '../utils/AppContext'
import './Orders.css'
import ClientList from '../components/client/ClientList'
import { useNavigate } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'

const Orders = () => {
  const { state, setState } = useContext(AppContext)
  const history = useNavigate()
  const getClientList = async (calendar) => {
    try {
      const response = await fetch(
        `http://green-rest.us-east-1.elasticbeanstalk.com/clients/name?date=${calendar}`
      )
      const data = await response.json()
      await setState({ clientList: data, date: calendar })
    } catch (error) {
      console.log(error)
    }
  }

  const getStart = () => {
    history('/work')
  }

  return (
    <div className="ordersContainer">
      <div className="daySelector">
        <h1>Перейти до збірки на:</h1>
        <div className="buttonContainer">
          <button onClick={getClientList.bind(this, 'today')}>Сьогодні</button>
          <button onClick={getClientList.bind(this, 'tomorrow')}>Завтра</button>
          <button onClick={getClientList.bind(this, 'after-tomorrow')}>
            Післязавтра
          </button>
        </div>
      </div>
      {state.clientList.length > 0 && (
        <button className="startButton" onClick={getStart}>
          Почати збірку
        </button>
      )}
      <ClientList />
    </div>
  )
}

export default withAuthenticationRequired(Orders)
