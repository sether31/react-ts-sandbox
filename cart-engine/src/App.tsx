import CustomButton from "./component/CustomButton";
import NotificationBanner from "./component/NotificationBanner";
import { useCart } from "./context/CartContext"
import { storeProducts } from "./data/storeData";


function App() {
  const {cart, addToCart, removeFromCart, clearCart} = useCart();

  return (
    <>
      <NotificationBanner />

      <div style={{padding: "2rem", fontFamily: "system-ui", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem"}}>
        <section>
          <h1>Store</h1>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem"}}>
            {storeProducts.map((product) => (
              <div key={product.id} style={{border: "1px solid black", padding: ".8rem"}}>
                <h3>{product.name}</h3>
                <p>Price: {product.price}</p>
                <p>Stocks: {product.stock}</p>

                <CustomButton onClick={() => addToCart(product)}>
                  Add to cart
                </CustomButton>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h1>Shopping Cart</h1>

          {cart.length === 0 ? (
            <h3>Your cart is empty</h3>
          ) : (
            <>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem"}}>
                {cart.map((cartItem) => (
                  <div key={cartItem.id} style={{border: "1px solid black", padding: ".8rem"}}>
                    <h3>{cartItem.name}</h3>
                    <p>Price: {cartItem.price}</p>
                    <p>Quantity: {cartItem.quantity}</p>

                    <CustomButton onClick={() => removeFromCart(cartItem)}>
                      Remove from cart
                    </CustomButton>
                  </div>
                ))}
              </div>

              <br />

              <CustomButton onClick={() => clearCart()}>
                Clear Cart
              </CustomButton>

              <br />

              <div>
                <h3>Checkout</h3>
                <p>Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
                <p>Total Price: {cart.reduce((total, item) => total + (item.price * item.quantity), 0)}</p>
              </div>
            </>
          )}

          
        </section>
      </div>
    </>
  )
}

export default App
