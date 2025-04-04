"use client"

import { AlertTriangle } from "lucide-react"

interface ConfirmacaoModalProps {
  titulo: string
  mensagem: string
  onConfirmar: () => void
  onCancelar: () => void
}

export default function ConfirmacaoModal({ titulo, mensagem, onConfirmar, onCancelar }: ConfirmacaoModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 bg-red-100 rounded-full p-2 mr-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{titulo}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4">{mensagem}</p>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancelar}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirmar}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

