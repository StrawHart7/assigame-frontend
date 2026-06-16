import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Accueil() {
  const [produits, setProduits] = useState([])

  useEffect(() => {
    api.get('/produit/list').then(res => setProduits(res.data.slice(0, 8)))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenue sur Assigame</h1>
      <p className="text-gray-500 mb-8">Achetez et vendez en toute simplicité</p>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Produits récents</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {produits.map(p => (
          <Link to={`/produits/${p.id_produit}`} key={p.id_produit}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4">
            <div className="bg-gray-100 h-36 rounded mb-3 flex items-center justify-center text-gray-400 text-sm">
              {p.image ? <img src={p.image} alt={p.nom_produit} className="h-full object-cover rounded" /> : 'Pas d\'image'}
            </div>
            <p className="font-semibold text-gray-800 truncate">{p.nom_produit}</p>
            <p className="text-blue-600 font-bold mt-1">{p.prix} FCFA</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/produits" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Voir tout le catalogue
        </Link>
      </div>
    </div>
  )
}