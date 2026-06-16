import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Panier() {
  const { utilisateur } = useAuth()
  const navigate = useNavigate()
  const [lignes, setLignes] = useState([])
  const [message, setMessage] = useState('')

  const fetchPanier = () => {
    api.get(`/panier/${utilisateur.id_utilisateur}/lignes`)
      .then(res => setLignes(res.data))
  }

  useEffect(() => { fetchPanier() }, [])

  const updateQuantite = async (idLigne, quantite) => {
    if (quantite < 1) return
    await api.put(`/panier/ligne/${idLigne}`, null, { params: { quantite } })
    fetchPanier()
  }

  const supprimerLigne = async (idLigne) => {
    await api.delete(`/panier/ligne/${idLigne}`)
    fetchPanier()
  }

  const validerPanier = async () => {
    try {
      await api.post(`/commande/valider/${utilisateur.id_utilisateur}`)
      setMessage('Commande passée avec succès !')
      setLignes([])
      setTimeout(() => navigate('/commandes'), 2000)
    } catch {
      setMessage('Erreur lors de la validation')
    }
  }

  const total = lignes.reduce((acc, l) => acc + l.produit.prix * l.quantite, 0)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mon Panier</h1>

      {message && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">{message}</div>}

      {lignes.length === 0 ? (
        <p className="text-gray-400 text-center py-20">Votre panier est vide</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {lignes.map(l => (
              <div key={l.id_lignepanier} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                <div className="bg-gray-100 h-16 w-16 rounded flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                  {l.produit.image ? <img src={l.produit.image} alt="" className="h-full object-cover rounded" /> : 'img'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{l.produit.nom_produit}</p>
                  <p className="text-blue-600 font-bold">{l.produit.prix} FCFA</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantite(l.id_lignepanier, l.quantite - 1)}
                    className="w-7 h-7 rounded-full border text-gray-600 hover:bg-gray-100">−</button>
                  <span className="w-6 text-center">{l.quantite}</span>
                  <button onClick={() => updateQuantite(l.id_lignepanier, l.quantite + 1)}
                    className="w-7 h-7 rounded-full border text-gray-600 hover:bg-gray-100">+</button>
                </div>
                <p className="w-24 text-right font-semibold">{(l.produit.prix * l.quantite).toFixed(0)} FCFA</p>
                <button onClick={() => supprimerLigne(l.id_lignepanier)}
                  className="text-red-400 hover:text-red-600 text-lg ml-2">✕</button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <p className="text-lg font-bold text-gray-800">Total : {total.toFixed(0)} FCFA</p>
            <button onClick={validerPanier}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold">
              Valider la commande
            </button>
          </div>
        </>
      )}
    </div>
  )
}