"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface PerformanceRankingsProps {
  data: any
}

export default function PerformanceRankings({ data }: PerformanceRankingsProps) {
  const [activeTab, setActiveTab] = useState<"products" | "clients" | "attendants">("products")
  const [sortField, setSortField] = useState<string>("value")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // If data is null, show skeleton loading
  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="flex space-x-2 mb-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-8 bg-gray-200 rounded w-24"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    )
  }

  // Get data for active tab
  const getActiveData = () => {
    switch (activeTab) {
      case "products":
        return data.topProducts || []
      case "clients":
        return data.topClients || []
      case "attendants":
        return data.topAttendants || []
      default:
        return []
    }
  }

  // Sort data
  const sortedData = [...getActiveData()].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Render sort indicator
  const renderSortIndicator = (field: string) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ArrowUp size={16} className="ml-1" /> : <ArrowDown size={16} className="ml-1" />
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Rankings de Desempenho</h3>

      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "products" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Mais Vendidos
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "clients" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("clients")}
        >
          Clientes Mais Ativos
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "attendants"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("attendants")}
        >
          Desempenho de Atendentes
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  {activeTab === "products" ? "Produto/Serviço" : activeTab === "clients" ? "Cliente" : "Atendente"}
                  {renderSortIndicator("name")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("value")}
              >
                <div className="flex items-center">
                  {activeTab === "products" ? "Vendas" : activeTab === "clients" ? "Compras" : "Atendimentos"}
                  {renderSortIndicator("value")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("revenue")}
              >
                <div className="flex items-center">
                  {activeTab === "products" ? "Receita" : activeTab === "clients" ? "Valor Total" : "Conversões"}
                  {renderSortIndicator("revenue")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {typeof item.revenue === "number" ? formatCurrency(item.revenue) : item.revenue}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhum dado disponível para o período selecionado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

