"use client"

import type React from "react"
import {
  Home,
  Calendar,
  Users,
  Briefcase,
  MessageSquare,
  FileText,
  BarChart2,
  Columns,
  Settings,
  Menu,
  ChevronLeft,
} from "lucide-react"

interface SidebarProps {
  onNavigate: (section: string) => void
  activeSection: string
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  isMobileOpen: boolean
}

export default function Sidebar({
  onNavigate,
  activeSection,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
}: SidebarProps) {
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault()
    onNavigate(section)
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => onNavigate(activeSection)}
        />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 bg-white border-r border-gray-200 z-30 transition-all duration-300 
          ${isCollapsed ? "w-20" : "w-64"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ height: "calc(100vh - 20rem)" }} // Fixed height that accounts for navbar and footer
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : ""}`}>
            <h2 className={`font-semibold text-blue-900 ${isCollapsed ? "hidden" : "text-lg"}`}>Flow Crm</h2>
            {isCollapsed && <span className="text-blue-900 text-xl font-bold">IB</span>}
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none lg:block hidden"
            onClick={toggleSidebar}
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="mt-4 px-2 overflow-y-auto h-full pb-20">
          <ul className="space-y-1">
            <li>
              <a
                href="#dashboard"
                onClick={(e) => handleNavigation(e, "dashboard")}
                className={`flex items-center py-2.5 px-3 rounded-md transition-colors
                  ${activeSection === "dashboard" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <Home size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Dashboard</span>}
              </a>
            </li>
            <li>
              <a
                href="#agendamentos"
                onClick={(e) => handleNavigation(e, "agendamentos")}
                className={`flex items-center py-2.5 px-3 rounded-md transition-colors
                  ${activeSection === "agendamentos" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <Calendar size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Agendamentos</span>}
              </a>
            </li>
            <li>
              <a
                href="#clientes"
                onClick={(e) => handleNavigation(e, "clientes")}
                className={`flex items-center py-2.5 px-3 rounded-md transition-colors
                  ${activeSection === "clientes" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <Users size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Clientes</span>}
              </a>
            </li>
            <li>
              <a
                href="#servicos"
                onClick={(e) => handleNavigation(e, "servicos")}
                className={`flex items-center py-2.5 px-3 rounded-md transition-colors
                  ${activeSection === "servicos" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <Briefcase size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Serviços</span>}
              </a>
            </li>
            <li>
              <a
                href="#mensagens"
                onClick={(e) => handleNavigation(e, "mensagens")}
                className={`flex items-center py-2.5 px-3 rounded-md transition-colors
                  ${activeSection === "mensagens" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <MessageSquare size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Mensagens</span>}
              </a>
            </li>
            <li>
              <a
                href="#relatorios"
                onClick={(e) => handleNavigation(e, "relatorios")}
                className={`flex items-center py-2.5 px-3 rounded-md transition-colors
                  ${activeSection === "relatorios" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <FileText size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Relatórios</span>}
              </a>
            </li>
            <li>
              <a
                href="#analises"
                onClick={(e) => handleNavigation(e, "analises")}
                className={`flex items-center py-2.5 px-3 rounded-md transition-colors
                  ${activeSection === "analises" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <BarChart2 size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Análises</span>}
              </a>
            </li>
            <li>
              <a
                href="#gerenciar-categorias"
                onClick={(e) => handleNavigation(e, "gerenciar-categorias")}
                className={`flex items-center py-2.5 px-3 rounded-md transition-colors
                  ${
                    activeSection === "gerenciar-categorias"
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <Columns size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Categorias de Coluna</span>}
              </a>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <a
            href="#configuracoes"
            onClick={(e) => handleNavigation(e, "configuracoes")}
            className={`flex items-center py-2.5 px-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors
              ${isCollapsed ? "justify-center" : "justify-start"}
            `}
          >
            <Settings size={20} className={isCollapsed ? "" : "mr-3"} />
            {!isCollapsed && <span>Configurações</span>}
          </a>
        </div>
      </aside>
    </>
  )
}

