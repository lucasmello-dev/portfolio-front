"use client"

import { ArrowUp, ArrowDown, Edit, Archive, Trash2, ArchiveRestore } from "lucide-react"
import { useState } from "react"
import type { ProductService } from "./types"

interface ProductServiceTableProps {
  items: ProductService[]
  onEdit: (item: ProductService) => void
  onArchive: (id: string, active: boolean) => void
  onDelete: (id: string) => void
}

export default function ProductServiceTable({ items, onEdit, onArchive, onDelete }: ProductServiceTableProps) {
  const [sortField, setSortField] = useState<keyof ProductService>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Handle sorting
  const handleSort = (field: keyof ProductService) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Sort items
  const sortedItems = [...items].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    // Handle special case for price (convert to number)
    if (sortField === "price") {
      aValue = Number.parseFloat(aValue as string)
      bValue = Number.parseFloat(bValue as string)
    }

    // Handle special case for active (boolean)
    if (sortField === "active") {
      aValue = aValue ? 1 : 0
      bValue = bValue ? 1 : 0
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Format price to Brazilian currency
  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(typeof price === "string" ? Number.parseFloat(price) : price)
  }

  // Render sort indicator
  const renderSortIndicator = (field: keyof ProductService) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Nome
                  {renderSortIndicator("name")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Categoria
                  {renderSortIndicator("category")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("type")}
              >
                <div className="flex items-center">
                  Tipo
                  {renderSortIndicator("type")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center">
                  Preço
                  {renderSortIndicator("price")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("active")}
              >
                <div className="flex items-center">
                  Status
                  {renderSortIndicator("active")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.type === "product" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.type === "product" ? "Produto" : "Serviço"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatPrice(item.price)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-amber-600 hover:text-amber-900"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onArchive(item.id, item.active)}
                        className={`${
                          item.active ? "text-gray-600 hover:text-gray-900" : "text-green-600 hover:text-green-900"
                        }`}
                        title={item.active ? "Arquivar" : "Restaurar"}
                      >
                        {item.active ? <Archive size={18} /> : <ArchiveRestore size={18} />}
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhum item encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

