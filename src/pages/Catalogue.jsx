import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

export default function Catalogue() {
  const [produits, setProduits] = useState([])
  const [categories, setCategories] = useState([])
  const [categorieActive, setCategorieActive] = useState(null)

  useEffect(() => {
    api.get('/produit/list').then(res => setProduits(res.data))
    api.get('/categorieproduit/list').then(res => setCategories(res.data))
  }, [])

  const produitsFiltres = categorieActive
    ? produits.filter(p => p.categorieProduit?.idcategorie_produit === categorieActive)
    : produits

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Catalogue</h1>

      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setCategorieActive(null)}
          className={`px-4 py-1 rounded-full text-sm border ${!categorieActive ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-600 border-gray-300 hover:border-blue-400'}`}>
          Tous
        </button>
        {categories.map(c => (
          <button key={c.idcategorie_produit}
            onClick={() => setCategorieActive(c.idcategorie_produit)}
            className={`px-4 py-1 rounded-full text-sm border ${categorieActive === c.idcategorie_produit ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-600 border-gray-300 hover:border-blue-400'}`}>
            {c.nom_categorieproduit}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {produitsFiltres.map(p => (
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
    </div>
  )
}