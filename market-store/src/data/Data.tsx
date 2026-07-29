export type Product = {
  id: number
  title: string
  price: number
  category: string
  image: string
  stocks: number
}

export type CartItem = Product & {
  quantity: number
}