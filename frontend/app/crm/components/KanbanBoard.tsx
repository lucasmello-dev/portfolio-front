"use client"

import KanbanColumn from "./KanbanColumn"
import KanbanCard from "./KanbanCard"
import { Settings } from "lucide-react"

export default function KanbanBoard() {
  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex items-center justify-between mb-4 px-6">
        <h3 className="text-lg font-medium text-gray-800">Quadro de Atendimentos</h3>
        <button
          onClick={(e) => {
            e.preventDefault()
            // This assumes you have a way to navigate between sections
            if (typeof window !== "undefined") {
              const event = new CustomEvent("navigate", {
                detail: { section: "gerenciar-categorias" },
              })
              window.dispatchEvent(event)
            }
          }}
          className="inline-flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Settings size={16} className="mr-2" />
          Gerenciar Categorias
        </button>
      </div>
      <div className="flex space-x-6 p-6 min-w-max">
        <KanbanColumn title="Agendados" count={3}>
          <KanbanCard
            title="João Silva"
            subtitle="45 anos • Clínica Geral"
            status="Primeira Consulta"
            description="Paciente com histórico de hipertensão"
            time="Hoje, 14:30"
          />
          <KanbanCard
            title="Maria Oliveira"
            subtitle="32 anos • Odontologia"
            status="Retorno"
            description="Avaliação de tratamento de canal"
            time="Amanhã, 10:15"
          />
          <KanbanCard
            title="Empresa XYZ"
            subtitle="Consultoria Financeira"
            status="Reunião Inicial"
            description="Análise de viabilidade para expansão"
            time="Quinta, 09:00"
          />
        </KanbanColumn>

        <KanbanColumn title="Em Espera" count={2}>
          <KanbanCard
            title="Ana Ferreira"
            subtitle="28 anos • Cardiologia"
            status="Chegou"
            description="Aguardando na recepção há 10 minutos"
            time="Hoje, 13:45"
          />
          <KanbanCard
            title="Carlos Mendes"
            subtitle="52 anos • Coaching Executivo"
            status="Atrasado"
            statusType="warning"
            description="Confirmou que está a caminho"
            time="Hoje, 11:30"
          />
        </KanbanColumn>

        <KanbanColumn title="Em Atendimento" count={2}>
          <KanbanCard
            title="Juliana Costa"
            subtitle="41 anos • Clínica Geral"
            status="Com Dr. Rodrigues"
            description="Consulta em andamento há 25 minutos"
            time="Iniciado às 14:05"
          />
          <KanbanCard
            title="Roberto Alves"
            subtitle="35 anos • Odontologia"
            status="Com Dra. Martins"
            description="Procedimento de limpeza"
            time="Iniciado às 14:15"
          />
        </KanbanColumn>

        <KanbanColumn title="Concluídos" count={3}>
          <KanbanCard
            title="Luísa Andrade"
            subtitle="39 anos • Cardiologia"
            status="Finalizado"
            statusType="success"
            description="Retorno em 3 meses"
            time="Hoje, 11:30"
          />
          <KanbanCard
            title="Tiago Ribeiro"
            subtitle="47 anos • Consultoria Jurídica"
            status="Finalizado"
            statusType="success"
            description="Encaminhado para departamento fiscal"
            time="Hoje, 10:00"
          />
          <KanbanCard
            title="Patrícia Martins"
            subtitle="29 anos • Estética"
            status="Cancelado"
            statusType="danger"
            description="Remarcado para próxima semana"
            time="Hoje, 09:15"
          />
        </KanbanColumn>
      </div>
    </div>
  )
}

