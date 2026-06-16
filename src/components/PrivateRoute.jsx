import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { utilisateur } = useAuth()
  return utilisateur ? children : <Navigate to="/login" replace />
}