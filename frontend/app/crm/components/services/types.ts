export interface ProductService {
  id: string
  name: string
  type: "product" | "service"
  category: string
  price: number | string
  duration?: string
  active: boolean
  description?: string
}

export interface Category {
  id: string
  name: string
}

