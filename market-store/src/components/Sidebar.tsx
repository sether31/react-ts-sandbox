type SidebarType = {
  category: string[]
  handleCategoryClick: (val: string) => void
  activeCategory: string
}

const Sidebar = ({category, handleCategoryClick, activeCategory}: SidebarType) => {
  return (
    <aside className="sticky w-full p-6 mt-20 border rounded-lg shadow-md h-155 min-h-155 top-6 md:w-1/4">
      <h2 className="m-6 text-2xl font-bold text-center text-gray-800">Categories</h2>

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
)
}

export default Sidebar
