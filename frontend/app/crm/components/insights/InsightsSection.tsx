"use client"

import { useState, useEffect } from "react"
import { Calendar, Download, AlertTriangle } from "lucide-react"
import KeyMetricsCards from "./KeyMetricsCards"
import InsightsCharts from "./InsightsCharts"
import DateRangeSelector from "./DateRangeSelector"
import PerformanceRankings from "./PerformanceRankings"
import { fetchKeyMetrics, fetchTimeSeriesData, fetchDistributionData, fetchRankingData } from "./insightsApi"

// Define date range type
type DateRange = {
  start: Date
  end: Date
  label: string
}

export default function InsightsSection() {
  // State for date range
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    end: new Date(),
    label: "Últimos 7 dias",
  })

  // State for data
  const [keyMetrics, setKeyMetrics] = useState<any>(null)
  const [timeSeriesData, setTimeSeriesData] = useState<any>(null)
  const [distributionData, setDistributionData] = useState<any>(null)
  const [rankingData, setRankingData] = useState<any>(null)

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // State for date range selector modal
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false)

  // Fetch data when date range changes
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch all data in parallel
        const [metrics, timeSeries, distribution, ranking] = await Promise.all([
          fetchKeyMetrics(dateRange),
          fetchTimeSeriesData("attendances", "daily", dateRange),
          fetchDistributionData("category", dateRange),
          fetchRankingData("topProducts", dateRange, 5),
        ])

        setKeyMetrics(metrics)
        setTimeSeriesData(timeSeries)
        setDistributionData(distribution)
        setRankingData(ranking)
      } catch (err) {
        console.error("Failed to load insights data:", err)
        setError("Falha ao carregar dados. Tente novamente mais tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [dateRange])

  // Handle date range change
  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange)
    setIsDateSelectorOpen(false)
  }

  // Handle export data
  const handleExportData = () => {
    // In a real app, this would trigger a download of the data
    alert("Exportação de dados iniciada. O arquivo será baixado em breve.")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Insights</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsDateSelectorOpen(true)}
            className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Calendar size={16} className="mr-2" />
            {dateRange.label}
          </button>
          <button
            onClick={handleExportData}
            className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Download size={16} className="mr-2" />
            Exportar Dados
          </button>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados de insights...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-red-500 mb-2">
            <AlertTriangle size={48} className="mx-auto" />
          </div>
          <p className="text-red-600 font-medium">{error}</p>
          <p className="mt-2 text-gray-600">Tente novamente mais tarde ou contate o suporte.</p>
        </div>
      ) : (
        <>
          {/* Key Metrics Cards */}
          <KeyMetricsCards metrics={keyMetrics} />

          {/* Charts */}
          <InsightsCharts timeSeriesData={timeSeriesData} distributionData={distributionData} />

          {/* Performance Rankings */}
          <PerformanceRankings data={rankingData} />
        </>
      )}

      {/* Date Range Selector Modal */}
      {isDateSelectorOpen && (
        <DateRangeSelector
          currentRange={dateRange}
          onApply={handleDateRangeChange}
          onCancel={() => setIsDateSelectorOpen(false)}
        />
      )}
    </div>
  )
}

