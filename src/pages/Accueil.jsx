import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

function ProduitCard({ p }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={`/produits/${p.id_produit}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'block',
        background: hovered ? '#16213E' : '#1A1A2E',
        border: `1px solid ${hovered ? 'rgba(245,166,35,0.4)' : 'rgba(245,166,35,0.1)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 40px rgba(245,166,35,0.15)' : 'none',
      }}
    >
      <div style={{
        height: '180px',
        background: 'linear-gradient(135deg, #0F0F1A, #1A1A2E)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {p.image ? (
          <img src={p.image} alt={p.nom_produit} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>📦</div>
            <span style={{ fontSize: '11px', color: '#4B5563', fontWeight: 500 }}>Pas d'image</span>
          </div>
        )}
        {p.categorieProduit && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            background: 'rgba(0,212,170,0.2)',
            border: '1px solid rgba(0,212,170,0.4)',
            color: '#00D4AA',
            fontSize: '10px', fontWeight: 600,
            padding: '3px 8px', borderRadius: '20px',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.5px',
          }}>
            {p.categorieProduit.nom_categorieproduit}
          </span>
        )}
      </div>
      <div style={{ padding: '16px' }}>
        <p style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 600, fontSize: '15px',
          color: '#F0EDE8', marginBottom: '8px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {p.nom_produit}
        </p>
        <p style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700, fontSize: '18px',
          color: '#F5A623',
        }}>
          {p.prix.toLocaleString('fr-FR')} <span style={{ fontSize: '12px', fontWeight: 500, color: '#9CA3AF' }}>FCFA</span>
        </p>
      </div>
    </Link>
  )
}

export default function Accueil() {
  const [produits, setProduits] = useState([])
  const { utilisateur } = useAuth()

  useEffect(() => {
    api.get('/produit/list').then(res => setProduits(res.data.slice(0, 8)))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 50%, #0A0A0F 100%)',
        borderBottom: '1px solid rgba(245,166,35,0.1)',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow background */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(245,166,35,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(0,212,170,0.1)',
            border: '1px solid rgba(0,212,170,0.3)',
            color: '#00D4AA',
            fontSize: '12px', fontWeight: 600,
            padding: '6px 16px', borderRadius: '20px',
            marginBottom: '24px',
            letterSpacing: '1px',
            fontFamily: 'Inter, sans-serif',
          }}>
            🌍 MARKETPLACE TOGOLAISE
          </span>

          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-2px',
          }}>
            Achetez et vendez<br />
            <span style={{
              background: 'linear-gradient(135deg, #F5A623, #00D4AA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              sans frontières
            </span>
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#9CA3AF',
            lineHeight: 1.7,
            marginBottom: '36px',
            fontFamily: 'Inter, sans-serif',
          }}>
            La plateforme de référence pour acheter et vendre vos produits au Togo. Simple, rapide, fiable.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/produits" style={{
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #F5A623, #e8940f)',
              color: '#0A0A0F',
              padding: '14px 32px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: 'Syne, sans-serif',
            }}>
              Explorer le catalogue →
            </Link>
            {!utilisateur && (
              <Link to="/register" style={{
                textDecoration: 'none',
                background: 'transparent',
                border: '1px solid rgba(245,166,35,0.3)',
                color: '#F5A623',
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: 'Syne, sans-serif',
              }}>
                Créer un compte
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '40px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}>
        {[
          { value: produits.length + '+', label: 'Produits disponibles' },
          { value: '100%', label: 'Sécurisé' },
          { value: 'Lomé', label: 'Basé au Togo' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#1A1A2E',
            border: '1px solid rgba(245,166,35,0.1)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: '#F5A623' }}>{s.value}</p>
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Produits récents */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <div>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '26px', fontWeight: 700,
              color: '#F0EDE8',
            }}>
              Produits récents
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Découvrez les dernières annonces</p>
          </div>
          <Link to="/produits" style={{
            textDecoration: 'none',
            color: '#F5A623',
            fontSize: '13px',
            fontWeight: 600,
            border: '1px solid rgba(245,166,35,0.3)',
            padding: '8px 16px',
            borderRadius: '8px',
          }}>
            Voir tout →
          </Link>
        </div>

        {produits.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px',
            background: '#1A1A2E',
            borderRadius: '16px',
            border: '1px solid rgba(245,166,35,0.1)',
          }}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>🛍️</p>
            <p style={{ color: '#6B7280' }}>Aucun produit pour l'instant</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {produits.map(p => <ProduitCard key={p.id_produit} p={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}