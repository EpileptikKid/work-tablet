import { useAuth0 } from '@auth0/auth0-react'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../utils/AppContext'
import './WorkProductList.css'

const WorkProductList = ({ data, client }) => {
  const [products, setProducts] = useState(data)
  const { state } = useContext(AppContext)
  const { user } = useAuth0()
  useEffect(() => {
    setProducts(data)
  }, [data])
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState(false)
  const setNext = () => {
    let index = true
    let unit
    products.forEach((element) => {
      if (element.status === 'n' && index) {
        unit = element
        index = false
      }
    })
    index = true
    return unit
  }

  const curProd = setNext()

  const convertPack = (input) => {
    if (input === 'KILOGRAM') return 'кг'
    if (input === 'THING') return 'шт'
    if (input === 'PACK') return 'уп'
  }

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
    setRedirect(true)
  }

  if (redirect) {
    setRedirect(false)
    navigate('/work?', { replace: false })
  }

  return (
    <div className="workProductList">
      {curProd && (
        <div className="curProd">
          <div className="workText">
            {curProd.name +
              ' ' +
              curProd.amount +
              ' ' +
              convertPack(curProd.packing)}
          </div>
          <div className="workButton">
            <button
              className="noWorkButton"
              onClick={setUndefined.bind(this, curProd.id)}
            >
              Не поклав
            </button>
            <button
              className="okWorkButton"
              onClick={setComplete.bind(this, curProd.id)}
            >
              Поклав
            </button>
          </div>
        </div>
      )}
      {products.map((prod) => {
        if (curProd && prod.id !== curProd.id) {
          return (
            <div className={`product_container color_${prod.status}`}>
              {prod.name + ' ' + prod.amount + ' ' + convertPack(prod.packing)}
            </div>
          )
        }
        return ''
      })}
      {!curProd && (
        <>
          <button className="nextButton" onClick={submit}>
            Наступний
          </button>
          {products.map((prod) => {
            return (
              <div className={`product_container color_${prod.status}`}>
                {prod.name +
                  ' ' +
                  prod.amount +
                  ' ' +
                  convertPack(prod.packing)}
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default WorkProductList
