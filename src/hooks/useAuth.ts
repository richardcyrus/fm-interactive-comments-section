import { AuthContext } from '@/context/AuthContext'
import * as React from 'react'

export function useAuth() {
  return React.useContext(AuthContext)
}
