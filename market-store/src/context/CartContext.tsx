import { createContext, useContext, useState } from "react"
import type { CartItem, Product } from "../data/Data";


type CartContextProps = {
  children: React.ReactNode
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({children}: CartContextProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cart.find((prod) => prod.id === product.id);

    if(existingItem) {
      if(existingItem.quantity >= product.stocks) {
        return;
      }

      setCart((prevCart) => {
        return prevCart.map((item) => {
          if(item.id === product.id) {
            return {...item, quantity: item.quantity + 1}
          } else {
            return item
          }
        })
      })

    } else {
      if(product.stocks === 0) return ;
      setCart((prevCart) => [
        ...prevCart,
        {...product, quantity: 1}
      ])
    }
  }

  const removeFromCart = (product: Product) => {
    setCart((prod) => {
      return prod.filter((item) => item.id !== product.id)
    })
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const data = useContext(CartContext);

  if(!data) {
    throw new Error("useCart must e use within the CartContextProvider")
  }

  return data
}

