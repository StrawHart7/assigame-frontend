import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    Nom: '',
    Prenom: '',
    Email: '',
    Motdepasse: '',
    Login: '',
    telephone: '',
    statut: 'actif',
  })
  const [erreur, setErreur] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')
    try {
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setErreur(err.response?.data?.erreur || "Erreur lors de l'inscription")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Inscription</h2>

        {erreur && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="Nom" placeholder="Nom" value={form.Nom} onChange={handleChange} required
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="Prenom" placeholder="Prénom" value={form.Prenom} onChange={handleChange} required
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="Email" type="email" placeholder="Email" value={form.Email} onChange={handleChange} required
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="Login" placeholder="Login" value={form.Login} onChange={handleChange} required
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input name="Motdepasse" type="password" placeholder="Mot de passe" value={form.Motdepasse} onChange={handleChange} required
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold">
            S'inscrire
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}