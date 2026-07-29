import type { Product } from "../data/Data"
import ProductCard from "./ProductCard"

type ProductGridType = {
  product: Product[]
  search: string
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const ProductGrid = ({product, search, activeCategory, setActiveCategory}: ProductGridType) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {product.filter((prod) => {
        if((activeCategory === "all" || activeCategory === prod.category) && prod.title.toLocaleLowerCase().includes(search)) {
          return true
        } else {
          return false
        }
      }).map((prod) => (
        <ProductCard 
          key={prod.id}
          product={prod} 
          setActiveCategory={setActiveCategory} 
        />
      ))}
    </div>
  )
}

export default ProductGrid
