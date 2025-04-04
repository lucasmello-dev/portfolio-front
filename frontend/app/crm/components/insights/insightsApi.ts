// Mock API for insights data

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch key metrics
export const fetchKeyMetrics = async (dateRange: any) => {
  await delay(800)

  return {
    totalAttendances: 1248,
    conversionRate: 68,
    averageTime: "18min",
    attendantDistribution: {
      human: 65,
      bot: 35,
    },
  }
}

// Fetch time series data
export const fetchTimeSeriesData = async (metric: string, interval: string, dateRange: any) => {
  await delay(600)

  // Generate mock data based on interval
  const generateData = (count: number, baseValue: number) => {
    const data = []
    for (let i = 0; i < count; i++) {
      data.push({
        name: interval === "daily" ? `${i + 1}/4` : interval === "weekly" ? `Semana ${i + 1}` : `Mês ${i + 1}`,
        value: baseValue + Math.floor(Math.random() * 50),
      })
    }
    return data
  }

  return {
    daily: generateData(7, 30),
    weekly: generateData(4, 180),
    monthly: generateData(6, 750),
  }
}

// Fetch distribution data
export const fetchDistributionData = async (category: string, dateRange: any) => {
  await delay(700)

  return {
    byCategory: [
      { name: "Consultas", value: 450 },
      { name: "Exames", value: 320 },
      { name: "Procedimentos", value: 280 },
      { name: "Tratamentos", value: 198 },
    ],
    byType: [
      { name: "Presencial", value: 720 },
      { name: "Online", value: 380 },
      { name: "Domiciliar", value: 148 },
    ],
    topItems: [
      { name: "Consulta Geral", value: 210 },
      { name: "Exame de Sangue", value: 180 },
      { name: "Limpeza Facial", value: 150 },
      { name: "Massagem", value: 120 },
      { name: "Avaliação Física", value: 90 },
    ],
  }
}

// Fetch ranking data
export const fetchRankingData = async (type: string, dateRange: any, limit: number) => {
  await delay(500)

  return {
    topProducts: [
      { id: "1", name: "Consulta Clínica Geral", value: 210, revenue: 31500 },
      { id: "2", name: "Exame de Sangue Completo", value: 180, revenue: 21600 },
      { id: "3", name: "Pacote de Estética Facial", value: 150, revenue: 52500 },
      { id: "4", name: "Aparelho de Pressão Digital", value: 120, revenue: 22788 },
      { id: "5", name: "Kit de Primeiros Socorros", value: 90, revenue: 6795 },
    ],
    topClients: [
      { id: "1", name: "João da Silva", value: 12, revenue: 3600 },
      { id: "2", name: "Maria Oliveira", value: 10, revenue: 4500 },
      { id: "3", name: "Carlos Mendes", value: 8, revenue: 2800 },
      { id: "4", name: "Ana Ferreira", value: 7, revenue: 3150 },
      { id: "5", name: "Roberto Alves", value: 6, revenue: 1800 },
    ],
    topAttendants: [
      { id: "1", name: "Dr. Rodrigues", value: 85, revenue: "72%" },
      { id: "2", name: "Dra. Martins", value: 78, revenue: "68%" },
      { id: "3", name: "Dr. Santos", value: 65, revenue: "65%" },
      { id: "4", name: "Dra. Oliveira", value: 62, revenue: "60%" },
      { id: "5", name: "Dr. Costa", value: 58, revenue: "55%" },
    ],
  }
}

// Export data
export const exportInsightsData = async (config: any) => {
  await delay(1000)

  // In a real app, this would generate and return a file
  return { success: true, message: "Data exported successfully" }
}

