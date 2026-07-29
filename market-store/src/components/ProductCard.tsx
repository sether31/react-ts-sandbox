import { useCart } from "../context/CartContext"
import type { Product } from "../data/Data"
import CustomButton from "./CustomButton"

type ProductCardType = {
  product: Product
  setActiveCategory: (category: string) => void
}

const ProductCard = ({ product, setActiveCategory }: ProductCardType) => {
  const {cart, addToCart} = useCart();

  const itemInCart = cart.find((prod) => prod.id === product.id)
  const currentQuantity = itemInCart ? itemInCart.quantity : 0
  const remainingStock = product.stocks - currentQuantity

  return (
    <div className="flex flex-col h-full p-4 border rounded-lg" key={product.id}>
      <div className="h-32 mb-4">
        <img src={product.image} className="object-contain w-full h-full" alt={product.title} /> 
      </div>
      <div className="flex flex-col grow">
        <p className="text-blue-500 capitalize cursor-pointer" onClick={() => setActiveCategory(product.category)}>{product.category}</p>
        <h3 title={product.title} className="text-lg font-bold text-gray-900 capitalize md:text-lg line-clamp-2">{product.title}</h3>
        <div className="mt-auto">
          <p className="font-semibold text-green-700">₱ {product.price}</p>
          <p>Stocks: {product.stocks}</p>
          <CustomButton 
            className={`border py-1 px-2 mt-2 rounded-sm active:scale-95 duration-300 ease-in-out ${remainingStock ? 'cursor-pointer bg-green-700 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
            onClick={() => addToCart(product)}
          >
            Add to cart
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
