import { Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer({ className = "" }) {
  return (
    <footer className={`bg-gray-900 text-white relative z-50 ${className}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Flow Crm</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Documentação
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center">
            <form className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                required
                className="flex-1 px-4 py-2 bg-gray-800 text-white border-0 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Inscrever-se
              </button>
            </form>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex space-x-4 mb-4">
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-300 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-300 hover:text-white">
                <Youtube size={24} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">© 2025 Flow Crm. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

