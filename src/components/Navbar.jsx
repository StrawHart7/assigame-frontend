import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { utilisateur, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">
        Assigame
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Accueil</Link>
        <Link to="/produits" className="text-gray-600 hover:text-blue-600">Catalogue</Link>

        {utilisateur ? (
          <>
            <Link to="/panier" className="text-gray-600 hover:text-blue-600">Panier</Link>
            <Link to="/commandes" className="text-gray-600 hover:text-blue-600">Commandes</Link>
            <span className="text-sm text-gray-500">👤 {utilisateur.Nom}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Connexion</Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}