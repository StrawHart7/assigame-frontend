import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {p.image
          ? <img src={p.image} alt={p.nom_produit} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px' }}>📦</div>
              <span style={{ fontSize: '11px', color: '#4B5563' }}>Pas d'image</span>
            </div>
        }
        {p.categorieProduit && (
          <span style={{
            position: 'absolute', top: '10px', left: '10px',
            background: 'rgba(0,212,170,0.15)',
            border: '1px solid rgba(0,212,170,0.35)',
            color: '#00D4AA', fontSize: '10px', fontWeight: 600,
            padding: '3px 8px', borderRadius: '20px',
          }}>
            {p.categorieProduit.nom_categorieproduit}
          </span>
        )}
      </div>
      <div style={{ padding: '16px' }}>
        <p style={{
          fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '14px',
          color: '#F0EDE8', marginBottom: '8px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {p.nom_produit}
        </p>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '17px', color: '#F5A623' }}>
          {p.prix.toLocaleString('fr-FR')} <span style={{ fontSize: '11px', fontWeight: 500, color: '#6B7280' }}>FCFA</span>
        </p>
      </div>
    </Link>
  )
}

export default function Catalogue() {
  const [produits, setProduits] = useState([])
  const [categories, setCategories] = useState([])
  const [categorieActive, setCategorieActive] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/produit/list').then(res => setProduits(res.data))
    api.get('/categorieproduit/list').then(res => setCategories(res.data))
  }, [])

  const produitsFiltres = produits
    .filter(p => !categorieActive || p.categorieProduit?.idcategorie_produit === categorieActive)
    .filter(p => p.nom_produit.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #1A1A2E 0%, #0A0A0F 100%)',
        padding: '48px 24px 36px',
        borderBottom: '1px solid rgba(245,166,35,0.1)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '36px', fontWeight: 800,
            color: '#F0EDE8', marginBottom: '8px',
          }}>
            Catalogue
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '28px' }}>
            {produits.length} produit{produits.length > 1 ? 's' : ''} disponible{produits.length > 1 ? 's' : ''}
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '400px', marginBottom: '20px' }}>
            <span style={{
              position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
              color: '#6B7280', fontSize: '16px',
            }}>🔍</span>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px 12px 40px',
                background: '#1A1A2E',
                border: '1px solid rgba(245,166,35,0.2)',
                borderRadius: '10px',
                color: '#F0EDE8', fontSize: '14px',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </div>

          {/* Filtres */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCategorieActive(null)}
              style={{
                padding: '7px 16px', borderRadius: '20px', fontSize: '13px',
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                border: !categorieActive ? 'none' : '1px solid rgba(245,166,35,0.25)',
                background: !categorieActive ? 'linear-gradient(135deg, #F5A623, #e8940f)' : 'transparent',
                color: !categorieActive ? '#0A0A0F' : '#9CA3AF',
                fontFamily: 'Inter, sans-serif',
              }}>
              Tous
            </button>
            {categories.map(c => (
              <button key={c.idcategorie_produit}
                onClick={() => setCategorieActive(c.idcategorie_produit)}
                style={{
                  padding: '7px 16px', borderRadius: '20px', fontSize: '13px',
                  fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  border: categorieActive === c.idcategorie_produit ? 'none' : '1px solid rgba(245,166,35,0.25)',
                  background: categorieActive === c.idcategorie_produit ? 'linear-gradient(135deg, #F5A623, #e8940f)' : 'transparent',
                  color: categorieActive === c.idcategorie_produit ? '#0A0A0F' : '#9CA3AF',
                  fontFamily: 'Inter, sans-serif',
                }}>
                {c.nom_categorieproduit}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {produitsFiltres.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px',
            background: '#1A1A2E', borderRadius: '16px',
            border: '1px solid rgba(245,166,35,0.1)',
          }}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</p>
            <p style={{ color: '#9CA3AF', fontSize: '15px' }}>Aucun produit trouvé</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {produitsFiltres.map(p => <ProduitCard key={p.id_produit} p={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}