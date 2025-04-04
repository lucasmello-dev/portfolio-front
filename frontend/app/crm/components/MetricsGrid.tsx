import { Calendar, Users, DollarSign, Briefcase } from 'lucide-react'

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500">Agendamentos</h3>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Calendar size={20} className="text-blue-600" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">248</p>
          <p className="text-sm text-gray-500">Próximos 30 dias</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500">Clientes Ativos</h3>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Users size={20} className="text-indigo-600" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">1.257</p>
          <p className="text-sm text-gray-500">+12% do mês anterior</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500">Faturamento</h3>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <DollarSign size={20} className="text-amber-600" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">R$ 84.350</p>
          <p className="text-sm text-gray-500">Mês atual</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-gray-500">Serviços Realizados</h3>
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <Briefcase size={20} className="text-gray-600" />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">3.672</p>
          <p className="text-sm text-gray-500">No ano corrente</p>
        </div>
      </div>
    </div>
  )
}
