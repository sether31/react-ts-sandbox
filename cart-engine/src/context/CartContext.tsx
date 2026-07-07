import { createContext, useContext, useState } from "react"
import type { CartItem, Product } from "../data/storeData"
import { useNotification } from "./Notification"

type CartContextProviderProps = {
  children: React.ReactNode
}

type CartContextProviderType = {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextProviderType | null>(null);

export const CartContextProvider = ({children}: CartContextProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const {addNotification} = useNotification();

  
  const addToCart = (product: Product) => {
    const existingItem = cart.find((prod) => prod.id === product.id);

    if(existingItem) {

      if(existingItem.quantity >= product.stock) {
        addNotification('error', 'You exceeded the product stock')
        return;
      }
      setCart((prevCart) => {
        return prevCart.map((item) => {
          if(item.id === product.id) {
            return {...item, quantity: item.quantity + 1}
          }

          return item
        })
      })
      addNotification('success', 'Added quantity successfully')
    } else {
      if(product.stock === 0) {
        addNotification('error', 'This product have no stock left')
        return;
      }

      setCart((prevCart) => [
        ...prevCart,
        {...product, quantity: 1}
      ])
      addNotification('success', 'Added the product successfully')
    }
  } 

  const removeFromCart = (product: Product) => {
    setCart((prod) => {
      return prod.filter((item) => item.id !== product.id)
    })
    addNotification('success', 'You successfully remove the product from the cart.')
  }

  const clearCart = () => {
    setCart([])
    addNotification('success', 'You successfully cleared the cart.')
  }


  return (
    <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  )
}


export const useCart = () => {
  const data = useContext(CartContext);

  if(!data) throw new Error('useCart must be used within a CartContextProvider');

  return data
}
