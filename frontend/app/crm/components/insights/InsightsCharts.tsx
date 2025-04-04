"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface InsightsChartsProps {
  timeSeriesData: any
  distributionData: any
}

export default function InsightsCharts({ timeSeriesData, distributionData }: InsightsChartsProps) {
  const [timeSeriesInterval, setTimeSeriesInterval] = useState<"daily" | "weekly" | "monthly">("daily")

  // Colors for charts
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#6366f1"]

  // If data is null, show skeleton loading
  if (!timeSeriesData || !distributionData) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  // Format data for time series chart based on selected interval
  const formattedTimeSeriesData = timeSeriesData[timeSeriesInterval] || []

  // Format data for distribution charts
  const categoryDistribution = distributionData.byCategory || []
  const typeDistribution = distributionData.byType || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Time Series Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Histórico de Atendimentos</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeSeriesInterval("daily")}
              className={`px-3 py-1 text-xs rounded-md ${
                timeSeriesInterval === "daily"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Diário
            </button>
            <button
              onClick={() => setTimeSeriesInterval("weekly")}
              className={`px-3 py-1 text-xs rounded-md ${
                timeSeriesInterval === "weekly"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Semanal
            </button>
            <button
              onClick={() => setTimeSeriesInterval("monthly")}
              className={`px-3 py-1 text-xs rounded-md ${
                timeSeriesInterval === "monthly"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Mensal
            </button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedTimeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} atendimentos`, "Total"]}
                labelFormatter={(label) => `Período: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Atendimentos"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution by Category */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Distribuição por Categoria</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryDistribution} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip
                formatter={(value) => [`${value} atendimentos`, "Total"]}
                labelFormatter={(label) => `Categoria: ${label}`}
              />
              <Legend />
              <Bar dataKey="value" name="Atendimentos" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution by Type */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Distribuição por Tipo</h3>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={typeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {typeDistribution.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} atendimentos`, "Total"]}
                labelFormatter={(label) => `Tipo: ${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products/Services */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Produtos/Serviços Mais Vendidos</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionData.topItems || []} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`${value} vendas`, "Total"]}
                labelFormatter={(label) => `Item: ${label}`}
              />
              <Legend />
              <Bar dataKey="value" name="Vendas" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

