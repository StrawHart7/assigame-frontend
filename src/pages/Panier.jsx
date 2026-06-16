import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function Panier() {
  const { utilisateur } = useAuth()
  const navigate = useNavigate()
  const [lignes, setLignes] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchPanier = () => {
    api.get(`/panier/${utilisateur.id_utilisateur}/lignes`).then(res => setLignes(res.data))
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
    setLoading(true)
    try {
      await api.post(`/commande/valider/${utilisateur.id_utilisateur}`)
      setMessage('Commande passée avec succès !')
      setLignes([])
      setTimeout(() => navigate('/commandes'), 2000)
    } catch {
      setMessage('Erreur lors de la validation')
    } finally {
      setLoading(false)
    }
  }

  const total = lignes.reduce((acc, l) => acc + l.produit.prix * l.quantite, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color: '#F0EDE8' }}>
            Mon Panier
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '4px' }}>
            {lignes.length} article{lignes.length > 1 ? 's' : ''}
          </p>
        </div>

        {message && (
          <div style={{
            background: message.includes('succès') ? 'rgba(0,212,170,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${message.includes('succès') ? 'rgba(0,212,170,0.3)' : 'rgba(239,68,68,0.3)'}`,
            color: message.includes('succès') ? '#00D4AA' : '#EF4444',
            padding: '14px 20px', borderRadius: '12px', marginBottom: '24px',
            fontSize: '14px', fontWeight: 500,
          }}>
            {message}
          </div>
        )}

        {lignes.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px',
            background: '#1A1A2E',
            border: '1px solid rgba(245,166,35,0.1)',
            borderRadius: '20px',
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🛒</div>
            <p style={{ color: '#9CA3AF', fontSize: '16px', marginBottom: '24px' }}>Votre panier est vide</p>
            <Link to="/produits" style={{
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #F5A623, #e8940f)',
              color: '#0A0A0F', padding: '12px 28px',
              borderRadius: '10px', fontWeight: 700,
              fontFamily: 'Syne, sans-serif', fontSize: '14px',
            }}>
              Découvrir le catalogue
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>

            {/* Lignes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {lignes.map(l => (
                <div key={l.id_lignepanier} style={{
                  background: '#1A1A2E',
                  border: '1px solid rgba(245,166,35,0.1)',
                  borderRadius: '16px', padding: '16px',
                  display: 'flex', alignItems: 'center', gap: '16px',
                }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '10px',
                    background: '#0F0F1A', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px',
                  }}>
                    {l.produit.image ? <img src={l.produit.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} /> : '📦'}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#F0EDE8', fontSize: '15px' }}>
                      {l.produit.nom_produit}
                    </p>
                    <p style={{ color: '#F5A623', fontWeight: 700, fontSize: '14px', marginTop: '4px' }}>
                      {l.produit.prix.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => updateQuantite(l.id_lignepanier, l.quantite - 1)} style={{
                      width: '30px', height: '30px', borderRadius: '8px',
                      background: 'rgba(245,166,35,0.1)',
                      border: '1px solid rgba(245,166,35,0.2)',
                      color: '#F5A623', cursor: 'pointer', fontSize: '16px',
                    }}>−</button>
                    <span style={{ color: '#F0EDE8', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                      {l.quantite}
                    </span>
                    <button onClick={() => updateQuantite(l.id_lignepanier, l.quantite + 1)} style={{
                      width: '30px', height: '30px', borderRadius: '8px',
                      background: 'rgba(245,166,35,0.1)',
                      border: '1px solid rgba(245,166,35,0.2)',
                      color: '#F5A623', cursor: 'pointer', fontSize: '16px',
                    }}>+</button>
                  </div>

                  <p style={{ color: '#F0EDE8', fontWeight: 700, minWidth: '100px', textAlign: 'right', fontSize: '15px' }}>
                    {(l.produit.prix * l.quantite).toLocaleString('fr-FR')} <span style={{ fontSize: '11px', color: '#6B7280' }}>FCFA</span>
                  </p>

                  <button onClick={() => supprimerLigne(l.id_lignepanier)} style={{
                    background: 'transparent', border: 'none',
                    color: '#EF4444', cursor: 'pointer', fontSize: '18px',
                    padding: '4px', opacity: 0.7,
                  }}>✕</button>
                </div>
              ))}
            </div>

            {/* Récap */}
            <div style={{
              background: '#1A1A2E',
              border: '1px solid rgba(245,166,35,0.15)',
              borderRadius: '16px', padding: '24px',
              position: 'sticky', top: '84px',
            }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#F0EDE8', marginBottom: '20px' }}>
                Récapitulatif
              </h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Sous-total</span>
                <span style={{ color: '#F0EDE8', fontWeight: 600 }}>{total.toLocaleString('fr-FR')} FCFA</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ color: '#9CA3AF', fontSize: '14px' }}>Livraison</span>
                <span style={{ color: '#00D4AA', fontWeight: 600 }}>Gratuite</span>
              </div>

              <div style={{
                borderTop: '1px solid rgba(245,166,35,0.1)',
                paddingTop: '16px', marginBottom: '20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#F0EDE8' }}>Total</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 800, color: '#F5A623' }}>
                  {total.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              <button onClick={validerPanier} disabled={loading} style={{
                width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #00D4AA, #00b899)',
                color: '#0A0A0F', border: 'none', borderRadius: '10px',
                fontSize: '15px', fontWeight: 700,
                fontFamily: 'Syne, sans-serif', cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}>
                {loading ? 'Traitement...' : '✓ Commander maintenant'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}