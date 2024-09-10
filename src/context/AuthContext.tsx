import { useLocalStorage } from '@/hooks/useLocalStorage'
import { getUser } from '@/models/users'
import * as React from 'react'

interface AuthContextValue {
  currentUser: string
  login: (username: string) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue>({
  currentUser: '',
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useLocalStorage(
    'currentuser',
    'juliusomo'
  )

  const login = async (username: string) => {
    try {
      const user = await getUser(username)
      if (user) {
        setCurrentUser(user.username)
        return
      }
      throw new Error(`'User ${username} not found'`)
    } catch (err) {
      console.error(err)
    }
  }

  const logout = () => {
    setCurrentUser('')
    return
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return React.useContext(AuthContext)
}
