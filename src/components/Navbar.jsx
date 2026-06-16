import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Navbar() {
  const { utilisateur, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      background: 'rgba(10, 10, 15, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(245, 166, 35, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '22px',
            fontWeight: 800,
            color: '#F0EDE8',
            letterSpacing: '-0.5px',
          }}>
            Assi<span style={{ color: '#F5A623' }}>game</span>
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {[
            { path: '/', label: 'Accueil' },
            { path: '/produits', label: 'Catalogue' },
            ...(utilisateur ? [
              { path: '/panier', label: 'Panier' },
              { path: '/commandes', label: 'Commandes' },
            ] : []),
          ].map(({ path, label }) => (
            <Link key={path} to={path} style={{
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: isActive(path) ? '#F5A623' : '#9CA3AF',
              borderBottom: isActive(path) ? '2px solid #F5A623' : '2px solid transparent',
              paddingBottom: '2px',
              transition: 'color 0.2s',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {utilisateur ? (
            <>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(245, 166, 35, 0.1)',
                border: '1px solid rgba(245, 166, 35, 0.25)',
                borderRadius: '20px',
                padding: '6px 14px',
              }}>
                <div style={{
                  width: '24px', height: '24px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F5A623, #00D4AA)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, color: '#0A0A0F',
                }}>
                  {utilisateur.Nom?.[0] || 'U'}
                </div>
                <span style={{ fontSize: '13px', color: '#F0EDE8', fontWeight: 500 }}>
                  {utilisateur.Nom}
                </span>
              </div>
              <button onClick={handleLogout} style={{
                background: 'transparent',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#EF4444',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.target.style.background = 'rgba(239,68,68,0.1)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                textDecoration: 'none',
                fontSize: '13px',
                color: '#9CA3AF',
                fontWeight: 500,
              }}>
                Connexion
              </Link>
              <Link to="/register" style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #F5A623, #e8940f)',
                color: '#0A0A0F',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: 'Syne, sans-serif',
              }}>
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}