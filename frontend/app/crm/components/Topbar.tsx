'use client'

import { useState } from 'react'
import { Menu, Bell, Plus, ChevronDown, User } from 'lucide-react'
import Image from 'next/image'

interface TopbarProps {
  toggleMobileSidebar: () => void
}

export default function Topbar({ toggleMobileSidebar }: TopbarProps) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b border-gray-200 z-20 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center">
        <button 
          className="lg:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={toggleMobileSidebar}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Flow Crm CRM</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Plus size={16} className="mr-2" />
          <span>Nova Consulta</span>
        </button>
        
        <div className="relative">
          <button 
            className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full focus:outline-none"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-30">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Notificações</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">Novo agendamento</p>
                  <p className="text-xs text-gray-500">João Silva agendou uma consulta para amanhã às 10:15</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">Lembrete</p>
                  <p className="text-xs text-gray-500">Você tem 3 consultas agendadas para hoje</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50">
                  <p className="text-sm font-medium text-gray-800">Mensagem recebida</p>
                  <p className="text-xs text-gray-500">Maria Oliveira respondeu sua mensagem</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Ver todas</a>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
              <User size={20} className="text-gray-500" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">Clínica Médica</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
            <ChevronDown size={16} className="hidden md:block text-gray-500" />
          </button>
          
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-30">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-800">Minha Conta</p>
              </div>
              <a href="#perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Perfil</a>
              <a href="#configuracoes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configurações</a>
              <a href="#faturamento" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Faturamento</a>
              <div className="border-t border-gray-200 my-1"></div>
              <a href="#sair" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
