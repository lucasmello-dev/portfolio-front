"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  ChevronDown,
  MoreHorizontal,
  MessageSquare,
  Edit,
  Trash2,
  X,
  Check,
  AlertTriangle,
} from "lucide-react"
import ClienteModal from "./ClienteModal"
import ConfirmacaoModal from "./ConfirmacaoModal"
import ConversaPanel from "./ConversaPanel"

// Tipos
interface Cliente {
  id: string
  nome: string
  whatsapp: string
  ultimoAtendimento: {
    data: string
    hora: string
    status: "em andamento" | "concluído" | "cancelado" | "agendado" | "primeira consulta"
  }
  tag: "VIP" | "Primeira consulta" | "Frequente" | "Inativo" | "Devedor" | "Novo"
  dataCadastro: string
  atendenteResponsavel?: string
  email?: string
  endereco?: string
  observacoes?: string
}

// Dados de exemplo
const clientesIniciais: Cliente[] = [
  {
    id: "1",
    nome: "João da Silva",
    whatsapp: "(11) 99999-9999",
    ultimoAtendimento: {
      data: "25/03/2025",
      hora: "14:30",
      status: "concluído",
    },
    tag: "Primeira consulta",
    dataCadastro: "15/01/2025",
    atendenteResponsavel: "Dr. Rodrigues",
    email: "joao.silva@email.com",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    observacoes: "Cliente com histórico de hipertensão. Prefere atendimento no período da tarde.",
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    whatsapp: "(21) 98888-8888",
    ultimoAtendimento: {
      data: "01/04/2025",
      hora: "10:15",
      status: "em andamento",
    },
    tag: "VIP",
    dataCadastro: "03/06/2024",
    atendenteResponsavel: "Dra. Martins",
    email: "maria.oliveira@email.com",
    endereco: "Av. Paulista, 1000 - São Paulo, SP",
  },
  {
    id: "3",
    nome: "Carlos Mendes",
    whatsapp: "(31) 97777-7777",
    ultimoAtendimento: {
      data: "28/03/2025",
      hora: "09:00",
      status: "cancelado",
    },
    tag: "Frequente",
    dataCadastro: "12/11/2024",
    email: "carlos.mendes@email.com",
  },
  {
    id: "4",
    nome: "Ana Ferreira",
    whatsapp: "(41) 96666-6666",
    ultimoAtendimento: {
      data: "05/04/2025",
      hora: "16:45",
      status: "agendado",
    },
    tag: "Novo",
    dataCadastro: "20/03/2025",
    atendenteResponsavel: "Dr. Santos",
  },
  {
    id: "5",
    nome: "Roberto Alves",
    whatsapp: "(51) 95555-5555",
    ultimoAtendimento: {
      data: "15/02/2025",
      hora: "11:30",
      status: "concluído",
    },
    tag: "Inativo",
    dataCadastro: "05/08/2024",
  },
  {
    id: "6",
    nome: "Juliana Costa",
    whatsapp: "(61) 94444-4444",
    ultimoAtendimento: {
      data: "10/04/2025",
      hora: "13:00",
      status: "primeira consulta",
    },
    tag: "Novo",
    dataCadastro: "01/04/2025",
    atendenteResponsavel: "Dra. Oliveira",
  },
  {
    id: "7",
    nome: "Marcelo Santos",
    whatsapp: "(71) 93333-3333",
    ultimoAtendimento: {
      data: "22/03/2025",
      hora: "15:15",
      status: "concluído",
    },
    tag: "Devedor",
    dataCadastro: "10/10/2024",
    observacoes: "Cliente com pendência financeira de R$ 350,00 referente à consulta de 22/02/2025.",
  },
]

export default function ClientesPage() {
  // Estados
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciais)
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>(clientesIniciais)
  const [termoBusca, setTermoBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null)
  const [filtroTag, setFiltroTag] = useState<string | null>(null)
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [modoEdicao, setModoEdicao] = useState(false)
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false)
  const [clienteParaExcluir, setClienteParaExcluir] = useState<string | null>(null)
  const [conversaAberta, setConversaAberta] = useState(false)
  const [clienteConversa, setClienteConversa] = useState<Cliente | null>(null)
  const [menuAberto, setMenuAberto] = useState<string | null>(null)
  const [toastVisivel, setToastVisivel] = useState(false)
  const [toastMensagem, setToastMensagem] = useState("")
  const [toastTipo, setToastTipo] = useState<"sucesso" | "erro">("sucesso")

  // Efeito para filtrar clientes
  useEffect(() => {
    let resultado = clientes

    // Filtrar por termo de busca
    if (termoBusca) {
      resultado = resultado.filter(
        (cliente) =>
          cliente.nome.toLowerCase().includes(termoBusca.toLowerCase()) || cliente.whatsapp.includes(termoBusca),
      )
    }

    // Filtrar por status
    if (filtroStatus) {
      resultado = resultado.filter((cliente) => cliente.ultimoAtendimento.status === filtroStatus)
    }

    // Filtrar por tag
    if (filtroTag) {
      resultado = resultado.filter((cliente) => cliente.tag === filtroTag)
    }

    setClientesFiltrados(resultado)
  }, [clientes, termoBusca, filtroStatus, filtroTag])

  // Função para adicionar novo cliente
  const adicionarCliente = (cliente: Omit<Cliente, "id">) => {
    const novoCliente: Cliente = {
      ...cliente,
      id: Date.now().toString(),
    }
    setClientes([novoCliente, ...clientes])
    setModalAberto(false)
    mostrarToast("Cliente adicionado com sucesso!", "sucesso")
  }

  // Função para editar cliente
  const editarCliente = (id: string, dadosAtualizados: Partial<Cliente>) => {
    const clientesAtualizados = clientes.map((cliente) =>
      cliente.id === id ? { ...cliente, ...dadosAtualizados } : cliente,
    )
    setClientes(clientesAtualizados)
    setModalAberto(false)
    mostrarToast("Cliente atualizado com sucesso!", "sucesso")
  }

  // Função para excluir cliente
  const excluirCliente = (id: string) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id))
    setConfirmacaoAberta(false)
    setClienteParaExcluir(null)
    mostrarToast("Cliente excluído com sucesso!", "sucesso")
  }

  // Função para abrir modal de novo cliente
  const abrirModalNovoCliente = () => {
    setClienteSelecionado(null)
    setModoEdicao(false)
    setModalAberto(true)
  }

  // Função para abrir modal de edição
  const abrirModalEdicao = (cliente: Cliente) => {
    setClienteSelecionado(cliente)
    setModoEdicao(true)
    setModalAberto(true)
    setMenuAberto(null)
  }

  // Função para abrir confirmação de exclusão
  const abrirConfirmacaoExclusao = (id: string) => {
    setClienteParaExcluir(id)
    setConfirmacaoAberta(true)
    setMenuAberto(null)
  }

  // Função para abrir painel de conversa
  const abrirPainelConversa = (cliente: Cliente) => {
    setClienteConversa(cliente)
    setConversaAberta(true)
    setMenuAberto(null)
  }

  // Função para mostrar toast
  const mostrarToast = (mensagem: string, tipo: "sucesso" | "erro") => {
    setToastMensagem(mensagem)
    setToastTipo(tipo)
    setToastVisivel(true)
    setTimeout(() => setToastVisivel(false), 3000)
  }

  // Função para alternar menu de ações
  const alternarMenu = (id: string) => {
    setMenuAberto(menuAberto === id ? null : id)
  }

  // Função para obter classe de cor baseada no status
  const getStatusClass = (status: string) => {
    switch (status) {
      case "em andamento":
        return "bg-blue-100 text-blue-800"
      case "concluído":
        return "bg-green-100 text-green-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      case "agendado":
        return "bg-purple-100 text-purple-800"
      case "primeira consulta":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Função para obter classe de cor baseada na tag
  const getTagClass = (tag: string) => {
    switch (tag) {
      case "VIP":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "Primeira consulta":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Frequente":
        return "bg-green-100 text-green-800 border-green-200"
      case "Inativo":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Devedor":
        return "bg-red-100 text-red-800 border-red-200"
      case "Novo":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Clientes</h1>
        <button
          onClick={abrirModalNovoCliente}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Novo Cliente
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nome ou WhatsApp..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={filtroStatus || ""}
                onChange={(e) => setFiltroStatus(e.target.value || null)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos os Status</option>
                <option value="em andamento">Em Andamento</option>
                <option value="concluído">Concluído</option>
                <option value="cancelado">Cancelado</option>
                <option value="agendado">Agendado</option>
                <option value="primeira consulta">Primeira Consulta</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            <div className="relative">
              <select
                value={filtroTag || ""}
                onChange={(e) => setFiltroTag(e.target.value || null)}
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todas as Tags</option>
                <option value="VIP">VIP</option>
                <option value="Primeira consulta">Primeira Consulta</option>
                <option value="Frequente">Frequente</option>
                <option value="Inativo">Inativo</option>
                <option value="Devedor">Devedor</option>
                <option value="Novo">Novo</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            {(filtroStatus || filtroTag || termoBusca) && (
              <button
                onClick={() => {
                  setFiltroStatus(null)
                  setFiltroTag(null)
                  setTermoBusca("")
                }}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                <X size={16} className="mr-1" />
                Limpar Filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  WhatsApp
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Último Atendimento
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tag
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Data de Cadastro
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Atendente
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
                      {cliente.email && <div className="text-xs text-gray-500">{cliente.email}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cliente.whatsapp}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                            cliente.ultimoAtendimento.status,
                          )}`}
                        >
                          {cliente.ultimoAtendimento.status
                            .split(" ")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          {cliente.ultimoAtendimento.data} às {cliente.ultimoAtendimento.hora}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md border ${getTagClass(
                          cliente.tag,
                        )}`}
                      >
                        {cliente.tag}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.dataCadastro}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {cliente.atendenteResponsavel || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => abrirPainelConversa(cliente)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver conversa"
                        >
                          <MessageSquare size={18} />
                        </button>
                        <button
                          onClick={() => abrirModalEdicao(cliente)}
                          className="text-amber-600 hover:text-amber-900"
                          title="Editar cliente"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => abrirConfirmacaoExclusao(cliente.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir cliente"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum cliente encontrado com os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visualização Mobile (Cards) */}
      <div className="md:hidden space-y-4 mt-4">
        {clientesFiltrados.length > 0 ? (
          clientesFiltrados.map((cliente) => (
            <div key={cliente.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{cliente.nome}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{cliente.whatsapp}</p>
                    {cliente.email && <p className="text-xs text-gray-500">{cliente.email}</p>}
                  </div>
                  <div className="relative">
                    <button
                      className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                      onClick={() => alternarMenu(cliente.id)}
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {menuAberto === cliente.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                        <button
                          onClick={() => abrirPainelConversa(cliente)}
                          className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        >
                          <MessageSquare size={16} className="mr-2 text-blue-600" />
                          Ver Conversa
                        </button>
                        <button
                          onClick={() => abrirModalEdicao(cliente)}
                          className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        >
                          <Edit size={16} className="mr-2 text-amber-600" />
                          Editar Cliente
                        </button>
                        <button
                          onClick={() => abrirConfirmacaoExclusao(cliente.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                        >
                          <Trash2 size={16} className="mr-2 text-red-600" />
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                      cliente.ultimoAtendimento.status,
                    )}`}
                  >
                    {cliente.ultimoAtendimento.status
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagClass(
                      cliente.tag,
                    )}`}
                  >
                    {cliente.tag}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>
                    <span className="font-medium">Último atendimento:</span>
                    <p>
                      {cliente.ultimoAtendimento.data} às {cliente.ultimoAtendimento.hora}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Cadastro:</span>
                    <p>{cliente.dataCadastro}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Atendente:</span>
                    <p>{cliente.atendenteResponsavel || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center text-sm text-gray-500">
            Nenhum cliente encontrado com os filtros selecionados.
          </div>
        )}
      </div>

      {/* Modal de Cliente (Novo/Edição) */}
      {modalAberto && (
        <ClienteModal
          cliente={clienteSelecionado}
          modoEdicao={modoEdicao}
          onSalvar={(id, dados) => {
            if (modoEdicao) {
              editarCliente(id, dados)
            } else {
              adicionarCliente(dados)
            }
          }}
          onFechar={() => setModalAberto(false)}
        />
      )}

      {/* Modal de Confirmação de Exclusão */}
      {confirmacaoAberta && (
        <ConfirmacaoModal
          titulo="Excluir Cliente"
          mensagem="Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita."
          onConfirmar={() => clienteParaExcluir && excluirCliente(clienteParaExcluir)}
          onCancelar={() => {
            setConfirmacaoAberta(false)
            setClienteParaExcluir(null)
          }}
        />
      )}

      {/* Painel de Conversa */}
      {conversaAberta && clienteConversa && (
        <ConversaPanel cliente={clienteConversa} onFechar={() => setConversaAberta(false)} />
      )}

      {/* Toast de Notificação */}
      {toastVisivel && (
        <div
          className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg border ${
            toastTipo === "sucesso" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          } max-w-xs z-50`}
        >
          <div
            className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
              toastTipo === "sucesso" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
            }`}
          >
            {toastTipo === "sucesso" ? <Check size={16} /> : <AlertTriangle size={16} />}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">{toastMensagem}</p>
          </div>
        </div>
      )}
    </div>
  )
}

