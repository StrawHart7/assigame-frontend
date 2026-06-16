import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Commandes() {
  const { utilisateur } = useAuth()
  const [commandes, setCommandes] = useState([])

  useEffect(() => {
    api.get(`/commande/utilisateur/${utilisateur.id_utilisateur}`)
      .then(res => setCommandes(res.data))
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Commandes</h1>

      {commandes.length === 0 ? (
        <p className="text-gray-400 text-center py-20">Aucune commande pour l'instant</p>
      ) : (
        <div className="flex flex-col gap-4">
          {commandes.map(c => (
            <div key={c.id_commande} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-800">Commande #{c.id_commande}</p>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  c.statut === 'LIVREE' ? 'bg-green-100 text-green-700' :
                  c.statut === 'ANNULEE' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-700'
                }`}>{c.statut}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                {new Date(c.date_commande).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
              <div className="flex flex-col gap-1 mb-3">
                {c.lignes.map(l => (
                  <div key={l.id_lignecommande} className="flex justify-between text-sm text-gray-600">
                    <span>{l.produit.nom_produit} × {l.quantite}</span>
                    <span>{(l.prix_unitaire * l.quantite).toFixed(0)} FCFA</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>{c.montant_total.toFixed(0)} FCFA</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}