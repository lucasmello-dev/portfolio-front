"use client"

import { useState, useEffect } from "react"
import { X, Plus, Edit, Trash2, GripVertical } from "lucide-react"
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "./productServiceApi"
import type { Category } from "./types"

interface CategoryManagerProps {
  onSave: (categories: Category[]) => void
  onClose: () => void
}

export default function CategoryManager({ onSave, onClose }: CategoryManagerProps) {
  // State for categories
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State for form
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")

  // Fetch categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true)
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (err) {
        setError("Failed to load categories")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return

    try {
      const newCategory = await createCategory({ name: newCategoryName.trim() })
      setCategories([...categories, newCategory])
      setNewCategoryName("")
    } catch (err) {
      console.error("Failed to add category:", err)
    }
  }

  // Handle updating a category
  const handleUpdateCategory = async (id: string, name: string) => {
    if (!name.trim()) return

    try {
      await updateCategory(id, { name: name.trim() })
      setCategories(categories.map((cat) => (cat.id === id ? { ...cat, name: name.trim() } : cat)))
      setEditingCategory(null)
    } catch (err) {
      console.error("Failed to update category:", err)
    }
  }

  // Handle deleting a category
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id)
      setCategories(categories.filter((cat) => cat.id !== id))
    } catch (err) {
      console.error("Failed to delete category:", err)
    }
  }

  // Handle saving all changes
  const handleSaveAll = () => {
    onSave(categories)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Gerenciar Categorias</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Carregando categorias...</p>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-red-600">{error}</p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Fechar
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Nova Categoria
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="newCategory"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nome da categoria"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center p-2 border border-gray-200 rounded-md bg-gray-50"
                    >
                      <div className="text-gray-400 mr-2 cursor-move">
                        <GripVertical size={16} />
                      </div>

                      {editingCategory?.id === category.id ? (
                        <input
                          type="text"
                          value={editingCategory.name}
                          onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          autoFocus
                        />
                      ) : (
                        <span className="flex-1 text-sm">{category.name}</span>
                      )}

                      <div className="flex space-x-1 ml-2">
                        {editingCategory?.id === category.id ? (
                          <>
                            <button
                              onClick={() => handleUpdateCategory(category.id, editingCategory.name)}
                              className="p-1 text-green-600 hover:text-green-900 rounded-full hover:bg-gray-200"
                              title="Salvar"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </button>
                            <button
                              onClick={() => setEditingCategory(null)}
                              className="p-1 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-200"
                              title="Cancelar"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setEditingCategory(category)}
                              className="p-1 text-amber-600 hover:text-amber-900 rounded-full hover:bg-gray-200"
                              title="Editar"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-1 text-red-600 hover:text-red-900 rounded-full hover:bg-gray-200"
                              title="Excluir"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500 py-4">
                    Nenhuma categoria encontrada. Adicione uma nova categoria acima.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

