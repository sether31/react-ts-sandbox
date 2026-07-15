import { useEffect, useState } from "react"

type Product = {
  id: number
  title: string
  price: number
  category: string
  image: string
}

const MarketStore = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if(!response.ok) {
        throw new Error(`HTTP Error Status: ${response.status}`)
      }
      const data = await response.json();
      const categoryOnly = data.map((val) => val.category)
      const noDuplicate = [...new Set(categoryOnly)]
      const allCat = ["all", ...noDuplicate]
      setProduct(data)
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
    <div className="min-h-screen p-6 bg-gray-50"> 
      <section className="flex flex-col gap-8 md:flex-row">
        <aside className="sticky w-full p-6 mt-20 border rounded-lg shadow-md h-155 min-h-155 top-6 md:w-1/4">
          <h2 className="m-6 text-2xl font-bold text-center text-blue-500">Categories</h2>

          {category && category.map((val, index) => (
            <button 
              key={index} 
              onClick={() => handleCategoryClick(val)}
              className={`capitalize underline block cursor-pointer underline-offset-2 ${activeCategory === val && "text-blue-500"}`}
            >
              {val}
            </button>
          ))}
        </aside>
        
        <article className="w-full md:w-3/4">
          <h2 className="m-6 text-2xl font-bold text-center text-blue-500">Market Store</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.filter((cat) => activeCategory === "all" ? true : cat.category === activeCategory).map((prod) => {
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
