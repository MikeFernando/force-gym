import { ReactNode, createContext, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserSave } from "@storage/storageUserSave";
import { storageUserGet } from "@storage/storageUserGet";

type AuthContextData = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
}

type Props = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        await storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()
      setUser(userLogged)

    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}