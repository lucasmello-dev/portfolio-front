'use client'

import { useState } from 'react'
import { User, Users, Calendar, Send, MessageSquare, Plus } from 'lucide-react'

export default function MessagesSection() {
  const [activeTab, setActiveTab] = useState('individual')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Central de Mensagens</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex items-center justify-center px-4 py-3 text-sm font-medium flex-1 ${
              activeTab === 'individual' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('individual')}
          >
            <User size={16} className="mr-2" />
            Individual
          </button>
          <button 
            className={`flex items-center justify-center px-4 py-3 text-sm font-medium flex-1 ${
              activeTab === 'grupo' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('grupo')}
          >
            <Users size={16} className="mr-2" />
            Grupos
          </button>
          <button 
            className={`flex items-center justify-center px-4 py-3 text-sm font-medium flex-1 ${
              activeTab === 'agendada' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('agendada')}
          >
            <Calendar size={16} className="mr-2" />
            Agendadas
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'individual' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800">Nova Mensagem</h3>
                  <p className="text-sm text-gray-500">Envie uma mensagem para um cliente específico</p>
                </div>
                <div className="p-4">
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                        Destinatário
                      </label>
                      <select 
                        id="recipient"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Selecione um cliente</option>
                        <option value="joao">João Silva</option>
                        <option value="maria">Maria Oliveira</option>
                        <option value="ana">Ana Ferreira</option>
                        <option value="carlos">Carlos Mendes</option>
                        <option value="empresa">Empresa XYZ</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Assunto
                      </label>
                      <input 
                        type="text" 
                        id="subject" 
                        placeholder="Digite o assunto da mensagem"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensagem
                      </label>
                      <textarea 
                        id="message" 
                        rows={5} 
                        placeholder="Digite sua mensagem aqui..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Cancelar
                  </button>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <Send size={16} className="mr-2" />
                    Enviar
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800">Modelos de Mensagem</h3>
                  <p className="text-sm text-gray-500">Use modelos pré-definidos para agilizar o envio</p>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <MessageSquare size={18} className="text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Confirmação de Agendamento</h4>
                          <p className="text-xs text-gray-500 mt-1">Olá [nome], confirmando seu agendamento para [data] às [hora]. Aguardamos sua presença!</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <MessageSquare size={18} className="text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Lembrete de Agendamento</h4>
                          <p className="text-xs text-gray-500 mt-1">Olá [nome], lembrando que você tem um agendamento amanhã às [hora]. Confirme sua presença.</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <MessageSquare size={18} className="text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Agradecimento</h4>
                          <p className="text-xs text-gray-500 mt-1">Olá [nome], agradecemos sua visita hoje. Esperamos que tenha tido uma ótima experiência!</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                      <div className="flex">
                        <MessageSquare size={18} className="text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Promoção</h4>
                          <p className="text-xs text-gray-500 mt-1">Olá [nome], temos uma promoção especial para você! Agende seu próximo serviço com 15% de desconto.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <Plus size={16} className="mr-2" />
                    Criar Novo Modelo
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'grupo' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Mensagem para Grupos</h3>
                <p className="text-sm text-gray-500">Envie mensagens para grupos de clientes</p>
              </div>
              <div className="p-4">
                <form className="space-y-4">
                  <div>
                    <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                      Selecionar Grupo
                    </label>
                    <select 
                      id="group"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Selecione um grupo</option>
                      <option value="todos">Todos os Clientes</option>
                      <option value="ativos">Clientes Ativos</option>
                      <option value="inativos">Clientes Inativos</option>
                      <option value="aniversariantes">Aniversariantes do Mês</option>
                      <option value="vip">Clientes VIP</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Assunto
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      placeholder="Digite o assunto da mensagem"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensagem
                    </label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      placeholder="Digite sua mensagem aqui..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="personalize" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="personalize" className="ml-2 block text-sm text-gray-700">
                      Personalizar com nome do cliente
                    </label>
                  </div>
                </form>
              </div>
              <div className="flex justify-between items-center p-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">Esta mensagem será enviada para 127 clientes</div>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Send size={16} className="mr-2" />
                  Enviar para Grupo
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'agendada' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Mensagens Agendadas</h3>
                <p className="text-sm text-gray-500">Programe mensagens para envio futuro</p>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Lembrete de Consulta</h4>
                        <p className="text-xs text-gray-500 mt-1">Para: 15 clientes com agendamentos amanhã</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-700">Agendada para: Amanhã, 08:00</p>
                        <p className="text-xs text-gray-500 mt-1">Status: Pendente</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Promoção de Fim de Mês</h4>
                        <p className="text-xs text-gray-500 mt-1">Para: Todos os clientes</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-700">Agendada para: 30/04/2025, 10:00</p>
                        <p className="text-xs text-gray-500 mt-1">Status: Pendente</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-800">Pesquisa de Satisfação</h4>
                        <p className="text-xs text-gray-500 mt-1">Para: Clientes atendidos esta semana</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-gray-700">Agendada para: 24/04/2025, 18:00</p>
                        <p className="text-xs text-green-600 mt-1">Status: Enviada</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Calendar size={16} className="mr-2" />
                  Agendar Nova Mensagem
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Histórico de Mensagens</h3>
          <p className="text-sm text-gray-500">Últimas mensagens enviadas</p>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-800">João Silva</h4>
                <p className="text-xs font-medium text-gray-700 mt-1">Confirmação de Consulta</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">Olá João, confirmando sua consulta para amanhã às 10:15. Aguardamos sua presença!</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Hoje, 14:30</p>
                <p className="text-xs text-gray-700 mt-1">Entregue</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-800">Grupo: Clientes Ativos</h4>
                <p className="text-xs font-medium text-gray-700 mt-1">Novos Serviços Disponíveis</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">Prezados clientes, temos o prazer de informar que estamos com novos serviços disponíveis...</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Ontem, 09:45</p>
                <p className="text-xs text-gray-700 mt-1">Entregue (45/50)</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-800">Maria Oliveira</h4>
                <p className="text-xs font-medium text-gray-700 mt-1">Reagendamento</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">Olá Maria, conforme conversamos, sua consulta foi reagendada para o dia 25/04 às 14:00.</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">22/04/2025</p>
                <p className="text-xs text-green-600 mt-1">Lida</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-800">Carlos Mendes</h4>
                <p className="text-xs font-medium text-gray-700 mt-1">Lembrete de Agendamento</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">Olá Carlos, lembrando que você tem um agendamento amanhã às 11:30. Confirme sua presença.</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">20/04/2025</p>
                <p className="text-xs text-gray-700 mt-1">Entregue</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Ver Todas as Mensagens
          </button>
        </div>
      </div>
    </div>
  )
}
