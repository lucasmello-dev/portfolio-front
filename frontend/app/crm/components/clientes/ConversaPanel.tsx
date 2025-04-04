"use client"

import type React from "react"

import { useState } from "react"
import { X, Send, Paperclip, ChevronLeft, MoreVertical } from "lucide-react"

interface Cliente {
  id: string
  nome: string
  whatsapp: string
  ultimoAtendimento: {
    data: string
    hora: string
    status: string
  }
  tag: string
  dataCadastro: string
  atendenteResponsavel?: string
  email?: string
  endereco?: string
  observacoes?: string
}

interface Mensagem {
  id: string
  remetente: "cliente" | "atendente"
  texto: string
  timestamp: string
  lida: boolean
}

interface ConversaPanelProps {
  cliente: Cliente
  onFechar: () => void
}

export default function ConversaPanel({ cliente, onFechar }: ConversaPanelProps) {
  // Mensagens de exemplo
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: "1",
      remetente: "cliente",
      texto: "Olá, gostaria de confirmar meu horário para amanhã.",
      timestamp: "10:30",
      lida: true,
    },
    {
      id: "2",
      remetente: "atendente",
      texto: "Olá! Claro, seu agendamento está confirmado para amanhã às 14:30 com o Dr. Rodrigues.",
      timestamp: "10:32",
      lida: true,
    },
    {
      id: "3",
      remetente: "cliente",
      texto: "Perfeito! Preciso levar algum documento específico?",
      timestamp: "10:35",
      lida: true,
    },
    {
      id: "4",
      remetente: "atendente",
      texto:
        "Por favor, traga seu documento de identidade e cartão do convênio, se tiver. Também recomendamos chegar com 15 minutos de antecedência para o preenchimento da ficha.",
      timestamp: "10:38",
      lida: true,
    },
    {
      id: "5",
      remetente: "cliente",
      texto: "Entendi. Muito obrigado!",
      timestamp: "10:40",
      lida: true,
    },
    {
      id: "6",
      remetente: "atendente",
      texto: "Estamos à disposição! Até amanhã.",
      timestamp: "10:41",
      lida: true,
    },
  ])

  const [novaMensagem, setNovaMensagem] = useState("")
  const [infoClienteVisivel, setInfoClienteVisivel] = useState(false)

  const enviarMensagem = () => {
    if (novaMensagem.trim() === "") return

    const agora = new Date()
    const hora = agora.getHours().toString().padStart(2, "0")
    const minutos = agora.getMinutes().toString().padStart(2, "0")

    const mensagem: Mensagem = {
      id: Date.now().toString(),
      remetente: "atendente",
      texto: novaMensagem,
      timestamp: `${hora}:${minutos}`,
      lida: false,
    }

    setMensagens([...mensagens, mensagem])
    setNovaMensagem("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      enviarMensagem()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <button
              className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
              onClick={() => setInfoClienteVisivel(!infoClienteVisivel)}
            >
              {infoClienteVisivel ? <ChevronLeft size={20} /> : <MoreVertical size={20} />}
            </button>
            <div>
              <h3 className="text-lg font-medium text-gray-800">{cliente.nome}</h3>
              <p className="text-sm text-gray-500">{cliente.whatsapp}</p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100" onClick={onFechar}>
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Painel de informações do cliente (visível em desktop ou quando ativado em mobile) */}
          <div
            className={`bg-gray-50 border-r border-gray-200 w-80 p-4 overflow-y-auto
              ${infoClienteVisivel ? "block" : "hidden md:block"}`}
          >
            <h4 className="font-medium text-gray-700 mb-4">Informações do Cliente</h4>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Nome</p>
                <p className="text-sm font-medium">{cliente.nome}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">WhatsApp</p>
                <p className="text-sm">{cliente.whatsapp}</p>
              </div>

              {cliente.email && (
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm">{cliente.email}</p>
                </div>
              )}

              {cliente.endereco && (
                <div>
                  <p className="text-xs text-gray-500">Endereço</p>
                  <p className="text-sm">{cliente.endereco}</p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-500">Tag</p>
                <p className="text-sm">{cliente.tag}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Último Atendimento</p>
                <p className="text-sm">
                  {cliente.ultimoAtendimento.data} às {cliente.ultimoAtendimento.hora}
                  <span className="block text-xs mt-1">
                    Status:{" "}
                    {cliente.ultimoAtendimento.status
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Data de Cadastro</p>
                <p className="text-sm">{cliente.dataCadastro}</p>
              </div>

              {cliente.atendenteResponsavel && (
                <div>
                  <p className="text-xs text-gray-500">Atendente Responsável</p>
                  <p className="text-sm">{cliente.atendenteResponsavel}</p>
                </div>
              )}

              {cliente.observacoes && (
                <div>
                  <p className="text-xs text-gray-500">Observações</p>
                  <p className="text-sm whitespace-pre-line">{cliente.observacoes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Área de conversa */}
          <div className={`flex-1 flex flex-col ${infoClienteVisivel ? "hidden md:flex" : "flex"}`}>
            {/* Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
              <div className="space-y-4">
                {mensagens.map((mensagem) => (
                  <div
                    key={mensagem.id}
                    className={`flex ${mensagem.remetente === "atendente" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                        mensagem.remetente === "atendente"
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{mensagem.texto}</p>
                      <p
                        className={`text-xs mt-1 text-right ${
                          mensagem.remetente === "atendente" ? "text-blue-100" : "text-gray-500"
                        }`}
                      >
                        {mensagem.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Área de digitação */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-end gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                  <Paperclip size={20} />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={2}
                  ></textarea>
                </div>
                <button
                  onClick={enviarMensagem}
                  disabled={novaMensagem.trim() === ""}
                  className={`p-3 rounded-full ${
                    novaMensagem.trim() === ""
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

