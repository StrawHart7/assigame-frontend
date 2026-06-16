import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', motdepasse: '' })
  const [erreur, setErreur] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')
    try {
      const res = await api.post('/auth/login', form)
      login(res.data)
      navigate('/')
    } catch (err) {
      setErreur(err.response?.data?.erreur || 'Erreur de connexion')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Connexion</h2>

        {erreur && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="motdepasse"
            placeholder="Mot de passe"
            value={form.motdepasse}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}