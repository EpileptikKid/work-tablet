import { useAuth0 } from '@auth0/auth0-react'
import { useContext, useState } from 'react'
import AppContext from '../../utils/AppContext'
import { useNavigate } from 'react-router-dom'
import './EditProductList.css'

const EditProductList = ({ data, client }) => {
  const { state } = useContext(AppContext)
  const { user } = useAuth0()
  const jsonHeader = new Headers()
  jsonHeader.append('Content-Type', 'application/json')
  const [products, setProducts] = useState(data)
  const history = useNavigate()
  const setComplete = (id) => {
    setProducts(
      products.map((obj) => {
        if (obj.id === id) {
          return { ...obj, status: 'c' }
        }
        return obj
      })
    )
  }

  const setUndefined = (id) => {
    setProducts(
      products.map((obj) => {
        if (obj.id === id) {
          return { ...obj, status: 'u' }
        }
        return obj
      })
    )
  }

  const convertPack = (input) => {
    if (input === 'KILOGRAM') return 'кг'
    if (input === 'THING') return 'шт'
    if (input === 'PACK') return 'уп'
  }

  const submit = async () => {
    try {
      const newStatus = await fetch(
        `http://localhost:8081/products/${client}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            products: products,
            worker: { email: 'johndoe@example.com' },
          }),
          redirect: 'follow',
        }
      ).then((response) => response.text())
      const newClientList = [...state.clientList]
      newClientList.map((cl) => cl.id === client && (cl.status = newStatus))
    } catch (error) {
      console.log(error)
    }
    history('/orders')
  }

  return (
    <div className="editPlace">
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className={`product_container color_${product.status}`}
          >
            <div className="textArea">
              {product.name +
                ' ' +
                product.amount +
                ' ' +
                convertPack(product.packing)}
            </div>
            <div className="buttonArea">
              <button
                className="okButton"
                disabled={product.status === 'c'}
                onClick={setComplete.bind(this, product.id)}
              >
                <h3>поклав</h3>
              </button>
              <button
                className="noButton"
                disabled={product.status === 'u'}
                onClick={setUndefined.bind(this, product.id)}
              >
                <h3>немає</h3>
              </button>
            </div>
          </div>
        )
      })}

      <button className="endButton" onClick={submit}>
        <h1>Закінчити</h1>
      </button>
    </div>
  )
}

export default EditProductList
