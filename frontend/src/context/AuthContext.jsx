import { createContext, useState, useContext, useEffect } from 'react'
import api from '../utils/axios'

// Create the context
const AuthContext = createContext()

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/users/profile')
        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      } catch (error) {
        localStorage.removeItem('user')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  // Register
  const register = async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  }

  // Login
  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    setUser(response.data.user)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    return response.data
  }

  // Logout
  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
    localStorage.removeItem('user')
  }

  // Update profile
  const updateProfile = async (profileData) => {
    const response = await api.put('/users/profile', profileData)
    setUser(response.data.user)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    return response.data
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAdmin: user?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext