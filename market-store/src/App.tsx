import MarketStore from "./components/MarketStore"
import { CartContextProvider } from "./context/CartContext"
import { NotificationContextProvider } from "./context/NotificationContext"

function App() {
  return (
    <>
      
      <NotificationContextProvider>
        <CartContextProvider>
          <MarketStore />
        </CartContextProvider>
      </NotificationContextProvider>
    </>
  )
}

export default App
