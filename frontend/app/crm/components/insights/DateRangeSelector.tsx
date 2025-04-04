"use client"

import { useState } from "react"
import { X, Calendar } from "lucide-react"

// Define date range type
type DateRange = {
  start: Date
  end: Date
  label: string
}

interface DateRangeSelectorProps {
  currentRange: DateRange
  onApply: (range: DateRange) => void
  onCancel: () => void
}

export default function DateRangeSelector({ currentRange, onApply, onCancel }: DateRangeSelectorProps) {
  // State for selected dates
  const [startDate, setStartDate] = useState<string>(formatDateForInput(currentRange.start))
  const [endDate, setEndDate] = useState<string>(formatDateForInput(currentRange.end))

  // Format date for input field (YYYY-MM-DD)
  function formatDateForInput(date: Date): string {
    return date.toISOString().split("T")[0]
  }

  // Format date for display (DD/MM/YYYY)
  function formatDateForDisplay(dateString: string): string {
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  }

  // Handle applying custom date range
  const handleApply = () => {
    if (!startDate || !endDate) {
      alert("Por favor, selecione as datas inicial e final.")
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start > end) {
      alert("A data inicial não pode ser posterior à data final.")
      return
    }

    onApply({
      start,
      end,
      label: `${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)}`,
    })
  }

  // Predefined date ranges
  const predefinedRanges = [
    {
      label: "Hoje",
      getRange: () => {
        const today = new Date()
        return {
          start: today,
          end: today,
          label: "Hoje",
        }
      },
    },
    {
      label: "Últimos 7 dias",
      getRange: () => {
        const end = new Date()
        const start = new Date()
        start.setDate(end.getDate() - 6)
        return {
          start,
          end,
          label: "Últimos 7 dias",
        }
      },
    },
    {
      label: "Últimos 30 dias",
      getRange: () => {
        const end = new Date()
        const start = new Date()
        start.setDate(end.getDate() - 29)
        return {
          start,
          end,
          label: "Últimos 30 dias",
        }
      },
    },
    {
      label: "Este mês",
      getRange: () => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), 1)
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        return {
          start,
          end,
          label: "Este mês",
        }
      },
    },
    {
      label: "Mês passado",
      getRange: () => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const end = new Date(now.getFullYear(), now.getMonth(), 0)
        return {
          start,
          end,
          label: "Mês passado",
        }
      },
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Selecionar Período</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Períodos Predefinidos</p>
            <div className="grid grid-cols-2 gap-2">
              {predefinedRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => onApply(range.getRange())}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Período Personalizado</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-xs text-gray-500 mb-1">
                  Data Inicial
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="endDate" className="block text-xs text-gray-500 mb-1">
                  Data Final
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  )
}

