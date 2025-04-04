import type { ProductService, Category } from "./types"

// Mock data for products and services
const mockProductsServices: ProductService[] = [
  {
    id: "1",
    name: "Consulta Clínica Geral",
    type: "service",
    category: "Consultas",
    price: 150,
    duration: "30",
    active: true,
    description: "Consulta padrão com clínico geral para avaliação de saúde.",
  },
  {
    id: "2",
    name: "Exame de Sangue Completo",
    type: "service",
    category: "Exames",
    price: 120,
    duration: "15",
    active: true,
    description: "Análise completa de sangue incluindo hemograma, glicemia, colesterol e triglicerídeos.",
  },
  {
    id: "3",
    name: "Pacote de Estética Facial",
    type: "service",
    category: "Tratamentos",
    price: 350,
    duration: "90",
    active: true,
    description: "Pacote completo de tratamento facial incluindo limpeza, esfoliação e hidratação.",
  },
  {
    id: "4",
    name: "Aparelho de Pressão Digital",
    type: "product",
    category: "Equipamentos",
    price: 189.9,
    active: true,
    description: "Aparelho digital para medição de pressão arterial com display LCD.",
  },
  {
    id: "5",
    name: "Kit de Primeiros Socorros",
    type: "product",
    category: "Materiais",
    price: 75.5,
    active: true,
    description: "Kit completo com itens essenciais para primeiros socorros.",
  },
  {
    id: "6",
    name: "Consultoria Financeira",
    type: "service",
    category: "Consultas",
    price: 200,
    duration: "60",
    active: false,
    description: "Consultoria personalizada para planejamento financeiro e investimentos.",
  },
  {
    id: "7",
    name: "Pacote Mensal de Acompanhamento",
    type: "service",
    category: "Pacotes",
    price: 500,
    active: true,
    description: "Pacote mensal incluindo 4 sessões de acompanhamento e monitoramento.",
  },
]

// Mock data for categories
const mockCategories: Category[] = [
  { id: "1", name: "Consultas" },
  { id: "2", name: "Exames" },
  { id: "3", name: "Procedimentos" },
  { id: "4", name: "Tratamentos" },
  { id: "5", name: "Equipamentos" },
  { id: "6", name: "Materiais" },
  { id: "7", name: "Pacotes" },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all products and services
export const fetchProductsServices = async (filters?: any): Promise<ProductService[]> => {
  await delay(800)
  return [...mockProductsServices]
}

// Create a new product or service
export const createProductService = async (data: Omit<ProductService, "id">): Promise<ProductService> => {
  await delay(500)
  const newItem: ProductService = {
    ...data,
    id: Date.now().toString(),
  }
  return newItem
}

// Update an existing product or service
export const updateProductService = async (id: string, data: Partial<ProductService>): Promise<ProductService> => {
  await delay(500)
  const item = mockProductsServices.find((item) => item.id === id)
  if (!item) {
    throw new Error("Item not found")
  }
  return { ...item, ...data }
}

// Delete a product or service
export const deleteProductService = async (id: string): Promise<void> => {
  await delay(500)
  // In a real app, this would make an API call to delete the item
}

// Archive/unarchive a product or service
export const archiveProductService = async (id: string, active: boolean): Promise<void> => {
  await delay(500)
  // In a real app, this would make an API call to update the item's active status
}

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  await delay(500)
  return [...mockCategories]
}

// Create a new category
export const createCategory = async (data: Omit<Category, "id">): Promise<Category> => {
  await delay(300)
  const newCategory: Category = {
    ...data,
    id: Date.now().toString(),
  }
  return newCategory
}

// Update an existing category
export const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
  await delay(300)
  const category = mockCategories.find((cat) => cat.id === id)
  if (!category) {
    throw new Error("Category not found")
  }
  return { ...category, ...data }
}

// Delete a category
export const deleteCategory = async (id: string): Promise<void> => {
  await delay(300)
  // In a real app, this would make an API call to delete the category
}

