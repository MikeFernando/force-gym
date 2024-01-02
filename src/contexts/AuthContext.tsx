import { ReactNode, createContext, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

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
      }
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}