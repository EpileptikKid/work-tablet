import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../utils/AppContext'
import './ClientList.css'

const ClientList = () => {
  const { state } = useContext(AppContext)

  return (
    <div className="containerClient">
      {state.clientList.length > 0 &&
        state.clientList.map((client) => {
          return (
            <Link
              className={`client_box color_client_${client.status}`}
              key={client.id}
              to={`/client/${client.id}`}
            >
              {client.name}
            </Link>
          )
        })}
    </div>
  )
}

export default ClientList
