"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

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

interface ClienteModalProps {
  cliente: Cliente | null
  modoEdicao: boolean
  onSalvar: (id: string, cliente: any) => void
  onFechar: () => void
}

export default function ClienteModal({ cliente, modoEdicao, onSalvar, onFechar }: ClienteModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    endereco: "",
    tag: "Novo",
    atendenteResponsavel: "",
    ultimoAtendimento: {
      data: "",
      hora: "",
      status: "primeira consulta",
    },
    observacoes: "",
  })

  // Preencher o formulário se estiver em modo de edição
  useEffect(() => {
    if (modoEdicao && cliente) {
      setFormData({
        nome: cliente.nome,
        whatsapp: cliente.whatsapp,
        email: cliente.email || "",
        endereco: cliente.endereco || "",
        tag: cliente.tag,
        atendenteResponsavel: cliente.atendenteResponsavel || "",
        ultimoAtendimento: {
          data: cliente.ultimoAtendimento.data,
          hora: cliente.ultimoAtendimento.hora,
          status: cliente.ultimoAtendimento.status,
        },
        observacoes: cliente.observacoes || "",
      })
    }
  }, [modoEdicao, cliente])

  // Manipular mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
            ...(formData as any)[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Manipular envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar campos obrigatórios
    if (!formData.nome || !formData.whatsapp) {
      alert("Nome e WhatsApp são campos obrigatórios.")
      return
    }

    // Formatar data de cadastro para novos clientes
    const hoje = new Date()
    const dataCadastro = hoje.toLocaleDateString("pt-BR")

    if (modoEdicao && cliente) {
      onSalvar(cliente.id, formData)
    } else {
      onSalvar("", {
        ...formData,
        dataCadastro,
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">{modoEdicao ? "Editar Cliente" : "Novo Cliente"}</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onFechar}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome*
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp*
              </label>
              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <select
                id="tag"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Novo">Novo</option>
                <option value="VIP">VIP</option>
                <option value="Primeira consulta">Primeira consulta</option>
                <option value="Frequente">Frequente</option>
                <option value="Inativo">Inativo</option>
                <option value="Devedor">Devedor</option>
              </select>
            </div>

            <div>
              <label htmlFor="atendenteResponsavel" className="block text-sm font-medium text-gray-700 mb-1">
                Atendente Responsável
              </label>
              <input
                type="text"
                id="atendenteResponsavel"
                name="atendenteResponsavel"
                value={formData.atendenteResponsavel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {modoEdicao && (
              <>
                <div>
                  <label htmlFor="ultimoAtendimento.data" className="block text-sm font-medium text-gray-700 mb-1">
                    Data do Último Atendimento
                  </label>
                  <input
                    type="text"
                    id="ultimoAtendimento.data"
                    name="ultimoAtendimento.data"
                    value={formData.ultimoAtendimento.data}
                    onChange={handleChange}
                    placeholder="DD/MM/AAAA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="ultimoAtendimento.hora" className="block text-sm font-medium text-gray-700 mb-1">
                    Hora do Último Atendimento
                  </label>
                  <input
                    type="text"
                    id="ultimoAtendimento.hora"
                    name="ultimoAtendimento.hora"
                    value={formData.ultimoAtendimento.hora}
                    onChange={handleChange}
                    placeholder="HH:MM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="ultimoAtendimento.status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status do Último Atendimento
                  </label>
                  <select
                    id="ultimoAtendimento.status"
                    name="ultimoAtendimento.status"
                    value={formData.ultimoAtendimento.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="em andamento">Em Andamento</option>
                    <option value="concluído">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                    <option value="agendado">Agendado</option>
                    <option value="primeira consulta">Primeira Consulta</option>
                  </select>
                </div>
              </>
            )}

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                rows={4}
                value={formData.observacoes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onFechar}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {modoEdicao ? "Atualizar" : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

