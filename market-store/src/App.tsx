import MarketStore from "./components/MarketStore"
import { CartContextProvider } from "./context/CartContext"

function App() {
  return (
    <>
      <CartContextProvider>
        <MarketStore />
      </CartContextProvider>
    </>
  )
}

export default App
