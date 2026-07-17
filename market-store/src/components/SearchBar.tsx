type SearchBarType = {
  search: string
  handleSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({search, handleSearchQuery}: SearchBarType) => {
  return (
    <div className="flex justify-end mb-6">
      <span className="px-2 py-1 text-white bg-gray-800 rounded-tl-md rounded-bl-md peer">Q</span>
      <input 
        type="text" 
        onChange={handleSearchQuery} 
        value={search}
        className="block px-2 py-1 border rounded-tr-md rounded-br-md peer:hover:border-2" 
      />
    </div>
  )
}

export default SearchBar
