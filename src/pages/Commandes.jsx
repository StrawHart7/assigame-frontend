import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import api from '../api/axios'

const statutConfig = {
  EN_ATTENTE:  { label: 'En attente',  bg: 'rgba(245,166,35,0.1)',  border: 'rgba(245,166,35,0.3)',  color: '#F5A623' },
  CONFIRMEE:   { label: 'Confirmée',   bg: 'rgba(0,212,170,0.1)',   border: 'rgba(0,212,170,0.3)',   color: '#00D4AA' },
  EXPEDIEE:    { label: 'Expédiée',    bg: 'rgba(99,102,241,0.1)',  border: 'rgba(99,102,241,0.3)',  color: '#818CF8' },
  LIVREE:      { label: 'Livrée',      bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.3)',   color: '#22C55E' },
  ANNULEE:     { label: 'Annulée',     bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   color: '#EF4444' },
}

export default function Commandes() {
  const { utilisateur } = useAuth()
  const [commandes, setCommandes] = useState([])

  useEffect(() => {
    api.get(`/commande/utilisateur/${utilisateur.id_utilisateur}`)
      .then(res => setCommandes(res.data))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color: '#F0EDE8' }}>
            Mes Commandes
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '4px' }}>
            {commandes.length} commande{commandes.length > 1 ? 's' : ''}
          </p>
        </div>

        {commandes.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px',
            background: '#1A1A2E',
            border: '1px solid rgba(245,166,35,0.1)',
            borderRadius: '20px',
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>📋</div>
            <p style={{ color: '#9CA3AF', fontSize: '16px', marginBottom: '24px' }}>Aucune commande pour l'instant</p>
            <Link to="/produits" style={{
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #F5A623, #e8940f)',
              color: '#0A0A0F', padding: '12px 28px',
              borderRadius: '10px', fontWeight: 700,
              fontFamily: 'Syne, sans-serif', fontSize: '14px',
            }}>
              Commencer mes achats
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {commandes.map(c => {
              const statut = statutConfig[c.statut] || statutConfig.EN_ATTENTE
              return (
                <div key={c.id_commande} style={{
                  background: '#1A1A2E',
                  border: '1px solid rgba(245,166,35,0.1)',
                  borderRadius: '16px', overflow: 'hidden',
                }}>
                  {/* Header commande */}
                  <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(245,166,35,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255,255,255,0.02)',
                  }}>
                    <div>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#F0EDE8', fontSize: '15px' }}>
                        Commande #{c.id_commande}
                      </p>
                      <p style={{ color: '#6B7280', fontSize: '12px', marginTop: '2px' }}>
                        {new Date(c.date_commande).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <span style={{
                      background: statut.bg,
                      border: `1px solid ${statut.border}`,
                      color: statut.color,
                      fontSize: '12px', fontWeight: 600,
                      padding: '5px 12px', borderRadius: '20px',
                    }}>
                      {statut.label}
                    </span>
                  </div>

                  {/* Lignes */}
                  <div style={{ padding: '16px 20px' }}>
                    {c.lignes.map(l => (
                      <div key={l.id_lignecommande} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '20px' }}>📦</span>
                          <span style={{ color: '#D1D5DB', fontSize: '14px' }}>
                            {l.produit.nom_produit}
                            <span style={{ color: '#6B7280', marginLeft: '6px' }}>× {l.quantite}</span>
                          </span>
                        </div>
                        <span style={{ color: '#F0EDE8', fontWeight: 600, fontSize: '14px' }}>
                          {(l.prix_unitaire * l.quantite).toLocaleString('fr-FR')} FCFA
                        </span>
                      </div>
                    ))}

                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      marginTop: '16px', paddingTop: '12px',
                      borderTop: '1px solid rgba(245,166,35,0.1)',
                    }}>
                      <span style={{ color: '#9CA3AF', fontSize: '13px' }}>Total de la commande</span>
                      <span style={{
                        fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 800, color: '#F5A623',
                      }}>
                        {c.montant_total.toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}