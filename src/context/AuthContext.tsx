import * as React from 'react'

interface AuthContextValue {
  currentUser: string
  login: (username: string) => void
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextValue>({
  currentUser: '',
  login: () => {},
  logout: () => {},
})
