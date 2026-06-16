import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function ProduitDetail() {
  const { id } = useParams()
  const { utilisateur } = useAuth()
  const navigate = useNavigate()
  const [produit, setProduit] = useState(null)
  const [quantite, setQuantite] = useState(1)
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get(`/produit/list`).then(res => {
      const found = res.data.find(p => p.id_produit === parseInt(id))
      setProduit(found)
    })
  }, [id])

  const ajouterAuPanier = async () => {
    if (!utilisateur) { navigate('/login'); return }
    try {
      await api.post(`/panier/${utilisateur.id_utilisateur}/ajouter`, null, {
        params: { idProduit: produit.id_produit, quantite }
      })
      setMessage('Produit ajouté au panier !')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Erreur lors de l\'ajout au panier')
    }
  }

  if (!produit) return <div className="text-center py-20 text-gray-400">Chargement...</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
        <div className="bg-gray-100 rounded-lg h-64 w-full md:w-72 flex items-center justify-center text-gray-400">
          {produit.image ? <img src={produit.image} alt={produit.nom_produit} className="h-full object-cover rounded-lg" /> : 'Pas d\'image'}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{produit.nom_produit}</h1>
          <p className="text-gray-500 mb-4">{produit.description || 'Aucune description'}</p>
          <p className="text-3xl font-bold text-blue-600 mb-4">{produit.prix} FCFA</p>
          <p className="text-sm text-gray-400 mb-6">Catégorie : {produit.categorieProduit?.nom_categorieproduit}</p>

          <div className="flex items-center gap-3 mb-4">
            <label className="text-sm text-gray-600">Quantité :</label>
            <input type="number" min="1" value={quantite}
              onChange={e => setQuantite(parseInt(e.target.value))}
              className="border rounded w-16 px-2 py-1 text-center" />
          </div>

          <button onClick={ajouterAuPanier}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold">
            Ajouter au panier
          </button>

          {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}
        </div>
      </div>
    </div>
  )
}