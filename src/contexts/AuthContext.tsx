import { ReactNode, createContext, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";

type AuthContextData = {
  user: UserDTO
  isLoadingStorageUserData: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

type Props = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingStorageUserData, setIsLoadingStorageUserData] = useState(false)

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

  async function signOut() {
    try {
      setIsLoadingStorageUserData(true)
      setUser({} as UserDTO)
      await storageUserRemove()

    } catch (error) {
      console.log(error);

    } finally {
      setIsLoadingStorageUserData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorageUserData(true)

      const userLogged = await storageUserGet()
      
      if (userLogged) {
        setUser(userLogged)
      }

    } catch (error) {
      throw error

    } finally {
      setIsLoadingStorageUserData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn,
      isLoadingStorageUserData,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}