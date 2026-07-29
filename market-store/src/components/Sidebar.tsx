type SidebarType = {
  category: string[]
  handleCategoryClick: (val: string) => void
  activeCategory: string
}

const Sidebar = ({category, handleCategoryClick, activeCategory}: SidebarType) => {
  return (
    <aside className="w-full p-6 mt-20 border rounded-lg shadow-md lg:sticky h-155 min-h-155 top-10 md:w-1/4">
      <h2 className="m-6 text-2xl font-bold text-center text-gray-800">Categories</h2>

      {category && category.map((val, index) => (
        <button 
          key={index} 
          onClick={() => handleCategoryClick(val)}
          className={`capitalize block cursor-pointer ease-in-out ${activeCategory === val && "text-blue-500 scale-110"}`}
        >
          {val}
        </button>
      ))}
    </aside>
)
}

export default Sidebar
