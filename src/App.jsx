import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Accueil from './pages/Accueil'
import Catalogue from './pages/Catalogue'
import ProduitDetail from './pages/ProduitDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Panier from './pages/Panier'
import Commandes from './pages/Commandes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/produits" element={<Catalogue />} />
            <Route path="/produits/:id" element={<ProduitDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/panier" element={<PrivateRoute><Panier /></PrivateRoute>} />
            <Route path="/commandes" element={<PrivateRoute><Commandes /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}