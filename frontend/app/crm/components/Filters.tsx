'use client'

import { useState } from 'react'
import { Search, Calendar, Filter, Plus, ChevronDown } from 'lucide-react'

export default function Filters() {
  const [calendarFilterOpen, setCalendarFilterOpen] = useState(false)
  const [statusFilterOpen, setStatusFilterOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input 
          type="search" 
          placeholder="Buscar clientes..." 
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">Todas Categorias</option>
            <option value="clinica-geral">Clínica Geral</option>
            <option value="odontologia">Odontologia</option>
            <option value="consultoria">Consultoria</option>
            <option value="coaching">Coaching</option>
            <option value="estetica">Estética</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
        
        <div className="relative">
          <button 
            className="flex items-center justify-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => {
              setCalendarFilterOpen(!calendarFilterOpen)
              setStatusFilterOpen(false)
            }}
          >
            <Calendar size={18} />
          </button>
          
          {calendarFilterOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-800">Período</h3>
              </div>
              <div className="p-2">
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Hoje</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Próximos 7 dias</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Próximos 30 dias</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Este mês</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Período personalizado</span>
                </label>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            className="flex items-center justify-center p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => {
              setStatusFilterOpen(!statusFilterOpen)
              setCalendarFilterOpen(false)
            }}
          >
            <Filter size={18} />
          </button>
          
          {statusFilterOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-800">Status</h3>
              </div>
              <div className="p-2">
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Todos</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Agendado</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Em Espera</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Concluído</span>
                </label>
                <label className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Cancelado</span>
                </label>
              </div>
            </div>
          )}
        </div>
        
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Plus size={16} className="mr-2" />
          <span>Novo Agendamento</span>
        </button>
      </div>
    </div>
  )
}
