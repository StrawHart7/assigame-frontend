import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

const fields = [
  { name: 'Nom', type: 'text', label: 'Nom', placeholder: 'Votre nom' },
  { name: 'Prenom', type: 'text', label: 'Prénom', placeholder: 'Votre prénom' },
  { name: 'Email', type: 'email', label: 'Email', placeholder: 'votre@email.com' },
  { name: 'Login', type: 'text', label: 'Login', placeholder: 'Identifiant unique' },
  { name: 'telephone', type: 'text', label: 'Téléphone', placeholder: '+228 XX XX XX XX' },
  { name: 'Motdepasse', type: 'password', label: 'Mot de passe', placeholder: '••••••••' },
]

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ Nom: '', Prenom: '', Email: '', Motdepasse: '', Login: '', telephone: '', statut: 'actif' })
  const [erreur, setErreur] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setErreur('')
    setLoading(true)
    try {
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setErreur(err.response?.data?.erreur || "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0A0F',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color: '#F0EDE8' }}>
              Assi<span style={{ color: '#F5A623' }}>game</span>
            </span>
          </Link>
          <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '8px' }}>Créez votre compte gratuitement</p>
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
              borderRadius: '10px', marginBottom: '20px', fontSize: '13px',
            }}>
              {erreur}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px',
            }}>
              {fields.slice(0, 2).map(f => (
                <div key={f.name}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginBottom: '8px', letterSpacing: '0.5px' }}>
                    {f.label.toUpperCase()}
                  </label>
                  <input type={f.type} name={f.name} placeholder={f.placeholder}
                    value={form[f.name]} onChange={handleChange} required
                    style={{
                      width: '100%', padding: '12px 14px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(245,166,35,0.2)',
                      borderRadius: '10px', color: '#F0EDE8', fontSize: '14px',
                      outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {fields.slice(2).map(f => (
                <div key={f.name}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', marginBottom: '8px', letterSpacing: '0.5px' }}>
                    {f.label.toUpperCase()}
                  </label>
                  <input type={f.type} name={f.name} placeholder={f.placeholder}
                    value={form[f.name]} onChange={handleChange}
                    required={f.name !== 'telephone'}
                    style={{
                      width: '100%', padding: '12px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(245,166,35,0.2)',
                      borderRadius: '10px', color: '#F0EDE8', fontSize: '14px',
                      outline: 'none', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #F5A623, #e8940f)',
              color: '#0A0A0F', border: 'none', borderRadius: '10px',
              fontSize: '15px', fontWeight: 700, fontFamily: 'Syne, sans-serif',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#6B7280', marginTop: '20px' }}>
          Déjà un compte ?{' '}
          <Link to="/login" style={{ color: '#F5A623', textDecoration: 'none', fontWeight: 600 }}>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}