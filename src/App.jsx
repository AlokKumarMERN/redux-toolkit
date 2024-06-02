import React from 'react'
import CartContainer from './components/CartContainer'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal, getCartItems } from './features/cart/cartSlice'
import { useEffect } from 'react'
import Modal from './components/Modal'

const App = () => {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch  = useDispatch();

  useEffect(() =>{
    dispatch(getCartItems());
  }, []);

  useEffect(()=>{
    dispatch(calculateTotal());
  }, [cartItems]);

  if(isLoading){
    return(
      <div className='loading'>
        <h2>Loading......</h2>
      </div>
    )
  }
  return (
    <main>
      {isOpen && <Modal/>}
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App