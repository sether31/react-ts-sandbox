import { useEffect, useState, type ChangeEvent } from "react"
import Sidebar from "./Sidebar"
import SearchBar from "./SearchBar"
import type { Product } from "../data/Data"
import { useCart } from "../context/CartContext"
import CustomButton from "./CustomButton"
import NotificationBanner from "./NotificationBanner"
import CartDrawer from "./CartDrawer"
import { FiShoppingCart } from "react-icons/fi"

const MarketStore = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const {cart, addToCart} = useCart();
  const [openCart, setOpenCart] = useState(false);

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
  <>
    <NotificationBanner />

    <div className="min-h-screen p-6 font-sans bg-gray-50"> 
      <section className="flex flex-col gap-8 md:flex-row">
        <Sidebar 
          category={category} 
          handleCategoryClick={handleCategoryClick} 
          activeCategory={activeCategory}
        />
        
        <article className="w-full md:w-3/4">
          <h2 className="m-6 text-3xl font-bold text-center text-gray-900">Market Store</h2>
          
          {/* search bar and cart btn */}
          <div className="flex items-center justify-end gap-2">
            <SearchBar 
              search={search}
              handleSearchQuery={handleSearchQuery}
            />

            <div className="relative" onClick={() => setOpenCart(true)}>
              <FiShoppingCart className="w-6 h-6 mb-6 text-gray-800 cursor-pointer" />
              <span className="absolute flex items-center justify-center w-5 h-5 text-white bg-black rounded-full -top-2 -right-3">{cart.length}</span>
            </div>
          </div>

          {/* cart container */}
          <CartDrawer 
            openCart={openCart}
            setOpenCart={setOpenCart}
          />

          {/* product container */}
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
                    <p className="text-blue-500 capitalize cursor-pointer" onClick={() => setActiveCategory(prod.category)}>{prod.category}</p>
                    <h3 title={prod.title} className="text-lg font-bold text-gray-900 capitalize md:text-lg line-clamp-2">{prod.title}</h3>
                    <div className="mt-auto">
                      <p className="font-semibold text-green-700">₱ {prod.price}</p>
                      <p>Stocks: {prod.stocks}</p>
                      <CustomButton 
                        className={`border py-1 px-2 mt-2 rounded-sm active:scale-95 duration-300 ease-in-out ${remainingStock ? 'cursor-pointer bg-green-700 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
                        onClick={() => addToCart(prod)}
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
  </>
  )
}

export default MarketStore
