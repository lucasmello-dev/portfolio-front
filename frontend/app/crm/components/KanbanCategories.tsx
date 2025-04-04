"use client"

import type React from "react"

import { useState, useRef } from "react"
import { GripVertical, Edit, Trash, X, Info, Plus, Bold, Italic, List } from "lucide-react"

// Define types for our categories
interface Category {
  id: number
  title: string
  description: string
  color: string
  order: number
}

export default function KanbanCategories() {
  // State for categories
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      title: "Agendados",
      description:
        "Categorize como agendado quando o cliente já confirmou o agendamento e foi o último tópico discutido.",
      color: "#e0f2fe",
      order: 1,
    },
    {
      id: 2,
      title: "Em Espera",
      description: "Cliente está aguardando atendimento, já chegou ao local ou está a caminho.",
      color: "#fef3c7",
      order: 2,
    },
    {
      id: 3,
      title: "Em Atendimento",
      description: "Cliente está sendo atendido neste momento por um profissional.",
      color: "#dcfce7",
      order: 3,
    },
    {
      id: 4,
      title: "Concluídos",
      description: "Atendimento finalizado, com ou sem sucesso (cancelado, remarcado, etc).",
      color: "#f1f5f9",
      order: 4,
    },
  ])

  // State for modals
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success")

  // State for form
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
    color: "#e0f2fe",
  })

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const draggedItemRef = useRef<HTMLDivElement | null>(null)

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id.replace("category", "").toLowerCase()]: value,
    })
  }

  // Open add modal
  const openAddModal = () => {
    setEditingCategory(null)
    setFormData({
      id: 0,
      title: "",
      description: "",
      color: "#e0f2fe",
    })
    setCategoryModalOpen(true)
  }

  // Open edit modal
  const openEditModal = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      id: category.id,
      title: category.title,
      description: category.description,
      color: category.color,
    })
    setCategoryModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category)
    setConfirmModalOpen(true)
  }

  // Close all modals
  const closeModals = () => {
    setCategoryModalOpen(false)
    setConfirmModalOpen(false)
  }

  // Save category
  const saveCategory = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      showToast("Preencha todos os campos obrigatórios", "error")
      return
    }

    // Check for duplicate title
    const duplicateCategory = categories.find(
      (c) =>
        c.title.toLowerCase() === formData.title.toLowerCase() && (!editingCategory || c.id !== editingCategory.id),
    )

    if (duplicateCategory) {
      showToast("Já existe uma categoria com este título", "error")
      return
    }

    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, title: formData.title, description: formData.description, color: formData.color }
            : c,
        ),
      )
    } else {
      // Add new category
      const newId = Math.max(0, ...categories.map((c) => c.id)) + 1
      const newOrder = Math.max(0, ...categories.map((c) => c.order)) + 1

      setCategories([
        ...categories,
        {
          id: newId,
          title: formData.title,
          description: formData.description,
          color: formData.color,
          order: newOrder,
        },
      ])
    }

    closeModals()
    showToast("Categoria salva com sucesso!")
  }

  // Delete category
  const deleteCategory = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id))
      closeModals()
      showToast("Categoria excluída com sucesso!")
    }
  }

  // Show toast message
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message)
    setToastType(type)
    setToastActive(true)

    // Hide toast after 3 seconds
    setTimeout(() => {
      setToastActive(false)
    }, 3000)
  }

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    setDraggedItem(id)
    draggedItemRef.current = e.currentTarget

    setTimeout(() => {
      if (draggedItemRef.current) {
        draggedItemRef.current.classList.add("opacity-50")
      }
    }, 0)
  }

  const handleDragEnd = () => {
    if (draggedItemRef.current) {
      draggedItemRef.current.classList.remove("opacity-50")
    }
    setDraggedItem(null)
    draggedItemRef.current = null
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add("bg-gray-100")
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-gray-100")
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: number) => {
    e.currentTarget.classList.remove("bg-gray-100")

    if (draggedItem !== null && draggedItem !== targetId) {
      const draggedIndex = categories.findIndex((c) => c.id === draggedItem)
      const targetIndex = categories.findIndex((c) => c.id === targetId)

      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Create a new array with the reordered items
        const newCategories = [...categories]
        const [movedItem] = newCategories.splice(draggedIndex, 1)
        newCategories.splice(targetIndex, 0, movedItem)

        // Update order property
        const updatedCategories = newCategories.map((category, index) => ({
          ...category,
          order: index + 1,
        }))

        setCategories(updatedCategories)
        showToast("Ordem atualizada com sucesso!")
      }
    }
  }

  // Format text in textarea
  const applyFormatting = (format: "bold" | "italic" | "list") => {
    const textarea = document.getElementById("categoryDescription") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "list":
        formattedText = selectedText
          .split("\n")
          .map((line) => `- ${line}`)
          .join("\n")
        break
    }

    setFormData({
      ...formData,
      description: textarea.value.substring(0, start) + formattedText + textarea.value.substring(end),
    })

    // Focus and set cursor position after formatting
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
    }, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Gerenciar Categorias do Kanban</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={openAddModal}
        >
          <Plus size={16} className="mr-2" />
          Nova Categoria
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="space-y-4">
            {categories
              .sort((a, b) => a.order - b.order)
              .map((category) => (
                <div
                  key={category.id}
                  className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, category.id)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDragEnter={(e) => handleDragEnter(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleDrop(e, category.id)}
                  data-id={category.id}
                >
                  <div className="flex items-center justify-center w-12 bg-gray-100 text-gray-500 cursor-move">
                    <GripVertical size={20} />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">{category.title}</h3>
                      <div className="flex space-x-2">
                        <button
                          className="p-1 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"
                          onClick={() => openEditModal(category)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-1 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full"
                          onClick={() => openDeleteModal(category)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal para adicionar/editar categoria */}
      {categoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">
                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
              </h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <form id="categoryForm" className="space-y-4">
                <input type="hidden" id="categoryId" value={formData.id} />
                <div>
                  <label htmlFor="categoryTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    id="categoryTitle"
                    maxLength={30}
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs ${formData.title.length >= 30 ? "text-red-500" : "text-gray-500"}`}>
                      {formData.title.length}/30
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <div className="flex space-x-1 mb-2">
                    <button
                      type="button"
                      onClick={() => applyFormatting("bold")}
                      className="p-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                    >
                      <Bold size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormatting("italic")}
                      className="p-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                    >
                      <Italic size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => applyFormatting("list")}
                      className="p-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                    >
                      <List size={16} />
                    </button>
                  </div>
                  <textarea
                    id="categoryDescription"
                    rows={5}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Instruções para o agente de IA sobre quando usar esta categoria.
                  </p>
                </div>
                <div>
                  <label htmlFor="categoryColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Cor (opcional)
                  </label>
                  <input
                    type="color"
                    id="categoryColor"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full h-10 p-1 border border-gray-300 rounded-md"
                  />
                </div>
              </form>
            </div>
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={closeModals}
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={saveCategory}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação para exclusão */}
      {confirmModalOpen && categoryToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Confirmar Exclusão</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={closeModals}>
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-700">Tem certeza que deseja excluir a categoria "{categoryToDelete.title}"?</p>
              <p className="mt-2 text-sm text-red-600">
                Esta ação não pode ser desfeita e pode afetar os itens atualmente nesta categoria.
              </p>
            </div>
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={closeModals}
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={deleteCategory}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast para feedback */}
      {toastActive && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-sm w-full overflow-hidden z-50">
          <div className="flex items-center p-4">
            <div className={`flex-shrink-0 ${toastType === "error" ? "text-red-500" : "text-green-500"}`}>
              <Info size={20} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{toastMessage}</p>
            </div>
          </div>
          <div
            className={`h-1 ${toastType === "error" ? "bg-red-500" : "bg-green-500"} animate-[progress_3s_linear_forwards]`}
          ></div>
        </div>
      )}
    </div>
  )
}

