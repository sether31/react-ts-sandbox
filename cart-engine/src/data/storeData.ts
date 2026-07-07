export type Product = {
  id: string
  name:string
  price: number
  stock:number
}

export type CartItem = Product & {
  quantity: number
}

export const storeProducts: Product[] = [
  { id: "p1", name: "Mechanical Keyboard", price: 120, stock: 3 },
  { id: "p2", name: "Wireless Mouse", price: 45, stock: 5 },
  { id: "p3", name: "Ergonomic Wrist Rest", price: 20, stock: 2 },
  { id: "p4", name: "USB-C Hub", price: 35, stock: 0 } 
];