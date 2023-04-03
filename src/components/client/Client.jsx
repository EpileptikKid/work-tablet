import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EditProductList from '../product/EditProductList'
import './Client.css'

const Client = () => {
  const params = useParams()
  const id = params.id
  const [client, setClient] = useState(null)

  useEffect(() => {
    fetch(`http://green-rest.us-east-1.elasticbeanstalk.com/clients/${id}`, {
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((data) => setClient(data))
      .catch((error) => console.log(error))
  }, [id])

  return (
    <div className="editClientPlace">
      {client && <h1>{client.name}</h1>}
      {client && <h2>{client.comment}</h2>}
      {client && (
        <EditProductList data={[...client.products]} client={client.id} />
      )}
    </div>
  )
}

export default Client
