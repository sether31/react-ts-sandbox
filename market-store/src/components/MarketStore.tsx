import { useEffect, useState, type ChangeEvent } from "react"
import Sidebar from "./Sidebar"
import SearchBar from "./SearchBar"
import type { CartItem, Product } from "../data/Data"
import { useCart } from "../context/CartContext"
import CustomButton from "./CustomButton"

const MarketStore = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const {cart, addToCart, removeFromCart, clearCart} = useCart();

  useEffect(() => {
    console.log("Cart updated! Current items:", cart);
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if(!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`)
      }
      const data = await response.json();
      const addFakeStocks = data.map((prod) => ({
        ...prod,
        stocks: 10
      }))
      const categoryOnly = data.map((val) => val.category)
      const noDuplicate = [...new Set(categoryOnly)]
      const allCat = ["all", ...noDuplicate]
      setProduct(addFakeStocks)
      setCategory(allCat)
    } catch(error) {
      setError('Failed to load products. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat)
  }

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const tryAgain = () => {
    fetchProducts();
    setError('')
    setIsLoading(true);
  }

  if(isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
        <p className="mt-4 text-sm font-semibold text-gray-900 animate-pulse">
          Loading...
        </p>
      </div>
    )
  }

  if(error) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-black md:text-5xl">Something <span className="text-red-700">went</span> wrong</h1>
        <button className="px-8 py-4 mt-6 duration-150 ease-in-out border rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white hover:scale-99" onClick={() => tryAgain()}>Try again</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 font-sans"> 
      <section className="flex flex-col gap-8 md:flex-row">
        <Sidebar 
          category={category} 
          handleCategoryClick={handleCategoryClick} 
          activeCategory={activeCategory}
        />
        
        <article className="w-full md:w-3/4">
          <h2 className="m-6 text-3xl font-bold text-center text-gray-800">Market Store</h2>
          
          <SearchBar 
            search={search}
            handleSearchQuery={handleSearchQuery}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.filter((cat) => {
              if((activeCategory === "all" || cat.category === activeCategory) && cat.title.toLowerCase().includes(search)) {
                return true
              } else {
                return false
              }
            }).map((prod) => {
              const itemInCart = cart.find((item) => item.id === prod.id)
              const currentQuantity = itemInCart ? itemInCart.quantity : 0
              const remainingStock = prod.stocks - currentQuantity

              return (
                <div className="flex flex-col h-full p-4 border rounded-lg" key={prod.id}>
                  <div className="h-32 mb-4">
                    <img src={prod.image} className="object-contain w-full h-full" alt={prod.title} /> 
                  </div>
                  <div className="flex flex-col grow">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize md:text-lg line-clamp-2">{prod.title}</h3>
                    <div className="mt-auto">
                      <p className="text-green-700">₱ {prod.price}</p>
                      <p className="text-blue-500 capitalize">{prod.category}</p>
                      <p>Stocks: {remainingStock}</p>
                      <CustomButton 
                        className={`border py-1 px-2 mt-2 rounded-sm active:scale-95 duration-300 ease-in-out ${remainingStock ? 'cursor-pointer bg-green-700 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
                        onClick={() => addToCart(prod)}
                        disabled={remainingStock === 0}
                      >
                        Add to cart
                      </CustomButton>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </article>
      </section>
    </div>
  )
}

export default MarketStore
