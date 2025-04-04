"use client"

import { useState, useEffect } from "react"
import { Plus, Check, AlertTriangle } from "lucide-react"
import ProductServiceTable from "./ProductServiceTable"
import ProductServiceCard from "./ProductServiceCard"
import ProductServiceFilters from "./ProductServiceFilters"
import ProductServiceModal from "./ProductServiceModal"
import ConfirmationModal from "../shared/ConfirmationModal"
import CategoryManager from "./CategoryManager"
import { fetchProductsServices, archiveProductService, deleteProductService } from "./productServiceApi"
import type { ProductService, Category } from "./types"

export default function ProductServiceSection() {
  // States for products and services
  const [items, setItems] = useState<ProductService[]>([])
  const [filteredItems, setFilteredItems] = useState<ProductService[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // States for filters
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  // States for modals
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ProductService | null>(null)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  // Toast notification state
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  })

  // Fetch products and services on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchProductsServices()
        setItems(data)
        setFilteredItems(data)
      } catch (err) {
        setError("Failed to load products and services")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter items when filters change
  useEffect(() => {
    let result = items

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by type
    if (typeFilter) {
      result = result.filter((item) => item.type === typeFilter)
    }

    // Filter by status
    if (statusFilter) {
      result = result.filter(
        (item) => (statusFilter === "active" && item.active) || (statusFilter === "inactive" && !item.active),
      )
    }

    // Filter by category
    if (categoryFilter) {
      result = result.filter((item) => item.category === categoryFilter)
    }

    setFilteredItems(result)
  }, [items, searchTerm, typeFilter, statusFilter, categoryFilter])

  // Handle adding a new product/service
  const handleAddItem = (newItem: Omit<ProductService, "id">) => {
    const id = Date.now().toString()
    const itemWithId = { ...newItem, id }
    setItems([itemWithId, ...items])
    setIsModalOpen(false)
    showToast("Item adicionado com sucesso!", "success")
  }

  // Handle updating a product/service
  const handleUpdateItem = (id: string, updatedData: Partial<ProductService>) => {
    const updatedItems = items.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    setItems(updatedItems)
    setIsModalOpen(false)
    showToast("Item atualizado com sucesso!", "success")
  }

  // Handle archiving/unarchiving a product/service
  const handleArchiveItem = async (id: string, active: boolean) => {
    try {
      await archiveProductService(id, !active)
      const updatedItems = items.map((item) => (item.id === id ? { ...item, active: !active } : item))
      setItems(updatedItems)
      showToast(active ? "Item arquivado com sucesso!" : "Item ativado com sucesso!", "success")
    } catch (err) {
      showToast("Erro ao alterar status do item", "error")
      console.error(err)
    }
  }

  // Handle deleting a product/service
  const handleDeleteItem = async () => {
    if (!itemToDelete) return

    try {
      await deleteProductService(itemToDelete)
      setItems(items.filter((item) => item.id !== itemToDelete))
      setIsDeleteModalOpen(false)
      setItemToDelete(null)
      showToast("Item excluído com sucesso!", "success")
    } catch (err) {
      showToast("Erro ao excluir item", "error")
      console.error(err)
    }
  }

  // Open modal to add a new product/service
  const openAddModal = () => {
    setSelectedItem(null)
    setIsModalOpen(true)
  }

  // Open modal to edit a product/service
  const openEditModal = (item: ProductService) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  // Open confirmation modal to delete a product/service
  const openDeleteModal = (id: string) => {
    setItemToDelete(id)
    setIsDeleteModalOpen(true)
  }

  // Show toast notification
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ visible: true, message, type })
    setTimeout(() => setToast({ ...toast, visible: false }), 3000)
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("")
    setTypeFilter(null)
    setStatusFilter(null)
    setCategoryFilter(null)
  }

  // Handle category updates
  const handleCategoryUpdate = (categories: Category[]) => {
    // In a real app, this would update the backend
    // For now, we'll just close the modal
    setIsCategoryModalOpen(false)
    showToast("Categorias atualizadas com sucesso!", "success")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Produtos & Serviços</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Gerenciar Categorias
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Novo Item
          </button>
        </div>
      </div>

      {/* Filters */}
      <ProductServiceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        clearFilters={clearFilters}
        hasActiveFilters={!!(searchTerm || typeFilter || statusFilter || categoryFilter)}
      />

      {/* Loading and Error States */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produtos e serviços...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-red-500 mb-2">
            <AlertTriangle size={48} className="mx-auto" />
          </div>
          <p className="text-red-600 font-medium">{error}</p>
          <p className="mt-2 text-gray-600">Tente novamente mais tarde ou contate o suporte.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <ProductServiceTable
              items={filteredItems}
              onEdit={openEditModal}
              onArchive={handleArchiveItem}
              onDelete={openDeleteModal}
            />
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <ProductServiceCard
                  key={item.id}
                  item={item}
                  onEdit={openEditModal}
                  onArchive={handleArchiveItem}
                  onDelete={openDeleteModal}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <p className="text-gray-500">Nenhum item encontrado com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Product/Service Modal */}
      {isModalOpen && (
        <ProductServiceModal
          item={selectedItem}
          onSave={selectedItem ? handleUpdateItem : handleAddItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <ConfirmationModal
          title="Excluir Item"
          message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
          confirmLabel="Excluir"
          confirmVariant="danger"
          onConfirm={handleDeleteItem}
          onCancel={() => {
            setIsDeleteModalOpen(false)
            setItemToDelete(null)
          }}
        />
      )}

      {/* Category Manager Modal */}
      {isCategoryModalOpen && (
        <CategoryManager onSave={handleCategoryUpdate} onClose={() => setIsCategoryModalOpen(false)} />
      )}

      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg border ${
            toast.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          } max-w-xs z-50`}
        >
          <div
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
              toast.type === "success" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
            }`}
          >
            {toast.type === "success" ? <Check size={16} /> : <AlertTriangle size={16} />}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

