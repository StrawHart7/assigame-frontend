import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', motdepasse: '' })
  const [erreur, setErreur] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setErreur('')
    setLoading(true)
    try {
      const res = await api.post('/auth/login', form)
      login(res.data)
      navigate('/')
    } catch (err) {
      setErreur(err.response?.data?.erreur || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0F',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color: '#F0EDE8' }}>
              Assi<span style={{ color: '#F5A623' }}>game</span>
            </span>
          </Link>
          <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '8px' }}>Connectez-vous à votre compte</p>
        </div>

        <div style={{
          background: '#1A1A2E',
          border: '1px solid rgba(245,166,35,0.15)',
          borderRadius: '20px', padding: '36px',
        }}>
          {erreur && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#EF4444', padding: '12px 16px',
              borderRadius: '10px', marginBottom: '20px',
              fontSize: '13px', fontFamily: 'Inter, sans-serif',
            }}>
              {erreur}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'email', type: 'email', label: 'Email', placeholder: 'votre@email.com' },
              { name: 'motdepasse', type: 'password', label: 'Mot de passe', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.name}>
                <label style={{
                  display: 'block', fontSize: '12px', fontWeight: 600,
                  color: '#9CA3AF', marginBottom: '8px', letterSpacing: '0.5px',
                }}>
                  {field.label.toUpperCase()}
                </label>
                <input
                  type={field.type} name={field.name}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange} required
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(245,166,35,0.2)',
                    borderRadius: '10px', color: '#F0EDE8',
                    fontSize: '14px', outline: 'none',
                    fontFamily: 'Inter, sans-serif',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}

            <button type="submit" disabled={loading} style={{
              padding: '14px',
              background: 'linear-gradient(135deg, #F5A623, #e8940f)',
              color: '#0A0A0F', border: 'none',
              borderRadius: '10px', fontSize: '15px', fontWeight: 700,
              fontFamily: 'Syne, sans-serif', cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px', opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B7280', marginTop: '20px' }}>
          Pas encore de compte ?{' '}
          <Link to="/register" style={{ color: '#F5A623', textDecoration: 'none', fontWeight: 600 }}>
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}