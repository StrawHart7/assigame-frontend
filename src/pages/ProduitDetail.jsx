import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function ProduitDetail() {
  const { id } = useParams()
  const { utilisateur } = useAuth()
  const navigate = useNavigate()
  const [produit, setProduit] = useState(null)
  const [quantite, setQuantite] = useState(1)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/produit/list').then(res => {
      const found = res.data.find(p => p.id_produit === parseInt(id))
      setProduit(found)
    })
  }, [id])

  const ajouterAuPanier = async () => {
    if (!utilisateur) { navigate('/login'); return }
    setLoading(true)
    try {
      await api.post(`/panier/${utilisateur.id_utilisateur}/ajouter`, null, {
        params: { idProduit: produit.id_produit, quantite }
      })
      setMessage('✓ Ajouté au panier')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Erreur lors de l\'ajout')
    } finally {
      setLoading(false)
    }
  }

  if (!produit) return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0F',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '12px' }}>⏳</div>
        <p style={{ color: '#6B7280' }}>Chargement...</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/produits" style={{ color: '#6B7280', textDecoration: 'none', fontSize: '13px' }}>Catalogue</Link>
          <span style={{ color: '#4B5563' }}>›</span>
          <span style={{ color: '#F5A623', fontSize: '13px' }}>{produit.nom_produit}</span>
        </div>

        <div style={{
          background: '#1A1A2E',
          border: '1px solid rgba(245,166,35,0.15)',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
        }}>
          {/* Image */}
          <div style={{
            background: 'linear-gradient(135deg, #0F0F1A, #1A1A2E)',
            minHeight: '360px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {produit.image
              ? <img src={produit.image} alt={produit.nom_produit} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '64px', marginBottom: '12px' }}>📦</div>
                  <p style={{ color: '#4B5563', fontSize: '13px' }}>Pas d'image disponible</p>
                </div>
            }
          </div>

          {/* Infos */}
          <div style={{ padding: '40px' }}>
            {produit.categorieProduit && (
              <span style={{
                display: 'inline-block',
                background: 'rgba(0,212,170,0.1)',
                border: '1px solid rgba(0,212,170,0.3)',
                color: '#00D4AA', fontSize: '11px', fontWeight: 600,
                padding: '4px 12px', borderRadius: '20px',
                marginBottom: '16px', letterSpacing: '0.5px',
              }}>
                {produit.categorieProduit.nom_categorieproduit}
              </span>
            )}

            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800,
              color: '#F0EDE8', marginBottom: '12px', lineHeight: 1.2,
            }}>
              {produit.nom_produit}
            </h1>

            <p style={{
              fontFamily: 'Syne, sans-serif', fontSize: '36px', fontWeight: 800,
              color: '#F5A623', marginBottom: '20px',
            }}>
              {produit.prix.toLocaleString('fr-FR')}
              <span style={{ fontSize: '16px', color: '#6B7280', fontWeight: 500, marginLeft: '6px' }}>FCFA</span>
            </p>

            {produit.description && (
              <p style={{
                color: '#9CA3AF', fontSize: '14px', lineHeight: 1.7,
                marginBottom: '28px', fontFamily: 'Inter, sans-serif',
              }}>
                {produit.description}
              </p>
            )}

            <div style={{
              background: 'rgba(245,166,35,0.05)',
              border: '1px solid rgba(245,166,35,0.1)',
              borderRadius: '10px', padding: '16px', marginBottom: '24px',
            }}>
              <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', fontWeight: 600 }}>QUANTITÉ</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button onClick={() => setQuantite(Math.max(1, quantite - 1))} style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.2)',
                  color: '#F5A623', fontSize: '18px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>−</button>
                <span style={{
                  fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 700,
                  color: '#F0EDE8', minWidth: '32px', textAlign: 'center',
                }}>{quantite}</span>
                <button onClick={() => setQuantite(quantite + 1)} style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: 'rgba(245,166,35,0.1)',
                  border: '1px solid rgba(245,166,35,0.2)',
                  color: '#F5A623', fontSize: '18px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>+</button>
              </div>
            </div>

            <button
              onClick={ajouterAuPanier}
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: message.startsWith('✓')
                  ? 'linear-gradient(135deg, #00D4AA, #00b899)'
                  : 'linear-gradient(135deg, #F5A623, #e8940f)',
                color: '#0A0A0F', border: 'none',
                borderRadius: '10px', fontSize: '15px', fontWeight: 700,
                fontFamily: 'Syne, sans-serif', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s', opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Ajout...' : message.startsWith('✓') ? message : '🛒 Ajouter au panier'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}