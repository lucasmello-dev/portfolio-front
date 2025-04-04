"use client"

import { Users, Clock, BarChart2, MessageCircle } from "lucide-react"

interface KeyMetricsCardsProps {
  metrics: {
    totalAttendances: number
    conversionRate: number
    averageTime: string
    attendantDistribution: {
      human: number
      bot: number
    }
  } | null
}

export default function KeyMetricsCards({ metrics }: KeyMetricsCardsProps) {
  // If metrics are null, show skeleton loading
  if (!metrics) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Attendances */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500">Total de Atendimentos</h3>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Users size={20} className="text-blue-600" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{metrics.totalAttendances.toLocaleString("pt-BR")}</p>
          <p className="text-sm text-gray-500">No período selecionado</p>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500">Taxa de Conversão</h3>
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <BarChart2 size={20} className="text-green-600" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{metrics.conversionRate}%</p>
          <p className="text-sm text-gray-500">Atendimentos convertidos em vendas</p>
        </div>
      </div>

      {/* Average Time */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500">Tempo Médio de Atendimento</h3>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <Clock size={20} className="text-amber-600" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{metrics.averageTime}</p>
          <p className="text-sm text-gray-500">Duração média por atendimento</p>
        </div>
      </div>

      {/* Attendant Distribution */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500">Distribuição por Atendente/Bot</h3>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <MessageCircle size={20} className="text-purple-600" />
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${metrics.attendantDistribution.human}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">{metrics.attendantDistribution.human}%</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Humano: {metrics.attendantDistribution.human}%</span>
            <span>Bot: {metrics.attendantDistribution.bot}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

