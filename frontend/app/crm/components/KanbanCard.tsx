'use client'

import { useState } from 'react'
import { MoreHorizontal, ArrowRight } from 'lucide-react'

interface KanbanCardProps {
  title: string
  subtitle: string
  status: string
  description: string
  time: string
  statusType?: 'default' | 'success' | 'warning' | 'danger'
}

export default function KanbanCard({ 
  title, 
  subtitle, 
  status, 
  description, 
  time,
  statusType = 'default'
}: KanbanCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const getStatusClass = () => {
    switch (statusType) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-amber-100 text-amber-800'
      case 'danger': return 'bg-red-100 text-red-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-800">{title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          </div>
          <div className="relative">
            <button 
              className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MoreHorizontal size={16} />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                <div className="px-3 py-2 border-b border-gray-200">
                  <h4 className="text-xs font-medium text-gray-500">Ações</h4>
                </div>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Ver Detalhes</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Atualizar Status</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Adicionar Observação</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Reagendar</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Enviar Mensagem</a>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass()}`}>
            {status}
          </span>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-200">
        <span className="text-xs text-gray-500">{time}</span>
        <button className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100">
          <ArrowRight size={12} className="mr-1" />
          Detalhes
        </button>
      </div>
    </div>
  )
}
