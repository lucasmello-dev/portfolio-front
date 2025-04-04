"use client"

import { useState } from "react"
import { MoreHorizontal, Edit, Archive, Trash2, ArchiveRestore } from "lucide-react"
import type { ProductService } from "./types"

interface ProductServiceCardProps {
  item: ProductService
  onEdit: (item: ProductService) => void
  onArchive: (id: string, active: boolean) => void
  onDelete: (id: string) => void
}

export default function ProductServiceCard({ item, onEdit, onArchive, onDelete }: ProductServiceCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Format price to Brazilian currency
  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(typeof price === "string" ? Number.parseFloat(price) : price)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
          </div>
          <div className="relative">
            <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500" onClick={() => setMenuOpen(!menuOpen)}>
              <MoreHorizontal size={16} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    onEdit(item)
                    setMenuOpen(false)
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                >
                  <Edit size={16} className="mr-2 text-amber-600" />
                  Editar
                </button>
                <button
                  onClick={() => {
                    onArchive(item.id, item.active)
                    setMenuOpen(false)
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                >
                  {item.active ? (
                    <>
                      <Archive size={16} className="mr-2 text-gray-600" />
                      Arquivar
                    </>
                  ) : (
                    <>
                      <ArchiveRestore size={16} className="mr-2 text-green-600" />
                      Restaurar
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    onDelete(item.id)
                    setMenuOpen(false)
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                >
                  <Trash2 size={16} className="mr-2 text-red-600" />
                  Excluir
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.type === "product" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
            }`}
          >
            {item.type === "product" ? "Produto" : "Serviço"}
          </span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {item.active ? "Ativo" : "Inativo"}
          </span>
        </div>

        <div className="mt-3 text-sm font-medium text-gray-900">{formatPrice(item.price)}</div>

        {expanded && item.description && (
          <div className="mt-3 text-xs text-gray-600">
            <p className="font-medium mb-1">Descrição:</p>
            <p>{item.description}</p>
          </div>
        )}

        {item.description && (
          <button onClick={() => setExpanded(!expanded)} className="mt-3 text-xs text-blue-600 hover:text-blue-800">
            {expanded ? "Mostrar menos" : "Mostrar mais"}
          </button>
        )}
      </div>
    </div>
  )
}

