import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import WorkProductList from '../components/product/WorkProductList'
import AppContext from '../utils/AppContext'
import './Work.css'

const Work = () => {
  const { state } = useContext(AppContext)
  const [client, setClient] = useState(null)
  const history = useNavigate()
  const location = useLocation()
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://green-rest.us-east-1.elasticbeanstalk.com/clients/next?date=${state.date}`,
        {
          method: 'GET',
          redirect: 'follow',
        }
      )
      console.log(await response)
      let result = await response.json()
      if (result) setClient(result)
      else setClient(null)
    }
    fetchData()
  }, [location, state.date])

  const redirect = () => {
    history('/orders')
  }

  return (
    <>
      {client && (
        <div className="workMonitor">
          <h1>{client.name}</h1>
          <h2>{client.comment}</h2>
          <WorkProductList data={[...client.products]} client={client.id} />
        </div>
      )}
      {!client && <button onClick={redirect}>на головну</button>}
    </>
  )
}

export default withAuthenticationRequired(Work)
