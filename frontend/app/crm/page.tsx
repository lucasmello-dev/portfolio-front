"use client"

import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"
import MetricsGrid from "./components/MetricsGrid"
import Filters from "./components/Filters"
import KanbanBoard from "./components/KanbanBoard"
import KanbanCategories from "./components/KanbanCategories"
import MessagesSection from "./components/MessagesSection"
import ProductServiceSection from "./components/services/ProductServiceSection"
import InsightsSection from "./components/insights/InsightsSection"
import ClientesPage from "./components/clientes/ClientesPage"


export default function CRMPage() {
  // State for sidebar and active section
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  // Handle navigation between sections
  const handleNavigation = (section: string) => {
    setActiveSection(section)
    if (window.innerWidth < 768) {
      setMobileSidebarOpen(false)
    }
  }

  // Listen for navigation events from the KanbanBoard component
  useEffect(() => {
    const handleNavigateEvent = (event: CustomEvent) => {
      if (event.detail && event.detail.section) {
        setActiveSection(event.detail.section)
      }
    }

    window.addEventListener("navigate", handleNavigateEvent as EventListener)

    return () => {
      window.removeEventListener("navigate", handleNavigateEvent as EventListener)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        onNavigate={handleNavigation}
        activeSection={activeSection}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobileOpen={mobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"} lg:ml-64`}>
        {/* Topbar */}
        <Topbar toggleMobileSidebar={toggleMobileSidebar} />

        {/* Page Content */}
        <main className="p-6 pt-24 pb-20">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

              {/* Métricas */}
              <MetricsGrid />

              {/* Fluxo de Atendimentos */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-800 mb-4">Fluxo de Atendimentos</h2>

                  {/* Filtros */}
                  <Filters />
                </div>

                {/* Kanban Board */}
                <KanbanBoard />
              </div>
            </div>
          )}
          {activeSection === "clientes" && <ClientesPage />}

          {/* Mensagens Section */}
          {activeSection === "mensagens" && <MessagesSection />}

          {/* Categorias de Coluna Section */}
          {activeSection === "gerenciar-categorias" && <KanbanCategories />}

          {/* Products & Services Section */}
          {activeSection === "servicos" && <ProductServiceSection />}

          {/* Insights Section */}
          {activeSection === "analises" && <InsightsSection />}

          {/* Other sections would be added here */}
          {activeSection !== "dashboard" &&
            activeSection !== "mensagens" &&
            activeSection !== "gerenciar-categorias" &&
            activeSection !== "servicos" &&
            activeSection !== "analises" && 
            activeSection !== "clientes" && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h1>
                <p className="text-gray-600">Esta seção está em desenvolvimento.</p>
              </div>
            )}
        </main>
      </div>
    </div>
  )
}

