import { createContext, useContext, ReactNode, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ 
  children, 
  value 
}: { 
  children: ReactNode
  value?: Partial<AuthContextType>
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(value?.isAuthenticated || false)
  const [user, setUser] = useState<User | null>(null)

  // Mock login function - would connect to backend in production
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful login
    if (email && password) {
      setUser({
        id: '1',
        name: 'Demo User',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      })
      setIsAuthenticated(true)
    } else {
      throw new Error('Invalid credentials')
    }
  }

  // Mock register function
  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful registration
    if (email && password && name) {
      setUser({
        id: '1',
        name: name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      })
      setIsAuthenticated(true)
    } else {
      throw new Error('Invalid registration data')
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      setIsAuthenticated: value?.setIsAuthenticated || setIsAuthenticated,
      user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
