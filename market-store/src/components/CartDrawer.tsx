import { IoMdClose } from "react-icons/io"
import { useCart } from "../context/CartContext"
import CustomButton from "./CustomButton"
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi"
import { useNotification } from "../context/NotificationContext"

type CartDrawerType = {
  openCart: boolean
  setOpenCart: (isOpen: boolean) => void
}

const CartDrawer = ({openCart, setOpenCart}: CartDrawerType) => {
  const {
    cart,
    setCart,
    addToCart,
    minusCartQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const { addNotification } = useNotification()

  return (
    <div 
      className={`h-dvh w-full md:w-[400px] bg-white shadow-2xl border fixed top-0 ease-in-out duration-300 z-50 transition-all p-6 overflow-y-auto ${openCart ? 'right-0': '-right-full'}`}
    >
      <div className={`flex items-center ${cart.length !== 0 && 'justify-between'}`}>
        <IoMdClose
          size={35} 
          onClick={() => setOpenCart(false)}
          className={`duration-300 ease-in-out cursor-pointer hover:rotate-90 font-bolder ${cart.length === 0 && 'shrink'}`} 
        />

        <h1 className={`font-serif text-3xl font-bold text-gray-900 ${cart.length === 0 && 'grow text-center'}`}>Cart</h1>

        {cart.length !== 0 && (
          <CustomButton
            className="text-red-800 capitalize duration-300 ease-in-out cursor-pointer active:scale-95"
            onClick={() => clearCart()}
          >
            Clear all
          </CustomButton>
        )}
      </div>

      <div className="mt-10">
        {cart.length === 0 ? (
          <h2 className="flex mt-10 flex-col items-center justify-center h-[80%] gap-4 text-2xl font-bold text-gray-900">
            <FiShoppingCart size={48} />
            <span>Your Cart is Empty</span>
          </h2>
        ): (
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => {
              const remainingStock = item.stocks - item.quantity
              
              return (
                <div 
                  key={item.id}
                  className={`w-full h-full p-4 border min-h-40 grid grid-cols-[.3fr_1.8fr] md:grid-cols-[.5fr_1.5fr] gap-4 rounded-md`}
                >
                  <div className="p-2 h-30 aspect-square">
                    <img className="object-contain w-full h-full" src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <p className="text-blue-500 capitalize">{item.category}</p>
                    <h3 title={item.title} className="font-bold text-gray-900 capitalize line-clamp-2">{item.title}</h3>
                    <p className="font-semibold text-green-900">₱ {item.price}</p>
                    <p>Stocks: {item.stocks}</p>
                    <div className="flex justify-between ">
                      <div className="flex items-center gap-1">
                        <CustomButton
                          className={`border cursor-pointer bg-blue-500 text-white active:scale-90 ease-in-out duration-300`} 
                          onClick={() => minusCartQuantity(item)}
                        >
                          <FiMinus className="border" />
                        </CustomButton>
                        
                        <p>{item.quantity}</p>
                        
                        <CustomButton
                          className={`border active:scale-90 ease-in-out duration-300 ${remainingStock ? 'cursor-pointer bg-blue-500 text-white' : 'bg-gray-300 cursor-not-allowed'}`} 
                          onClick={() => addToCart(item)}
                        >
                          <FiPlus />
                        </CustomButton>
                      </div>
                      <p 
                        className="text-right text-red-700 capitalize duration-300 ease-in-out cursor-pointer active:scale-95"
                        onClick={() => removeFromCart(item)}
                      >
                        remove
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="block h-40 pt-4 mt-20 text-gray-900 border-t">
          {cart.map((item) => {
            return (
              <div 
                key={item.id}
                className="flex flex-wrap justify-between"
              >
                <p title={item.title} className="font-semibold">{(item.title).slice(0, 10) + '...'}</p>
                <p>₱{item.price} x {item.quantity}</p>
                <p>₱{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            )
          })}

          <h3 className="flex flex-wrap justify-between font-black">
            <span>Total:</span> <span>₱{cart.reduce((acc, curr) => (acc + (curr.price * curr.quantity)), 0).toFixed(2)}</span>
          </h3>

          <CustomButton 
            className="block px-2 py-1 mt-4 ml-auto text-white duration-300 ease-in-out bg-black border rounded-sm cursor-pointer active:scale-95"
            onClick={() => {
              setCart([])
              addNotification("success", "Checkout successfully!")
            }}
          >
            Checkout
          </CustomButton>
        </div>
      )}
    </div>
  )
}

export default CartDrawer
