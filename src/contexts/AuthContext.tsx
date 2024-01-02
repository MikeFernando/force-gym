import { ReactNode, createContext, useEffect, useState } from "react"

import { api } from "@services/api"
import { UserDTO } from "@dtos/UserDTO"

import { deleteUser, getUser, saveUser } from "@storage/user/storageUser"
import { deleteToken, getToken, saveToken } from "@storage/token/storageToken"

type AuthContextData = {
  user: UserDTO;
  isLoadingStorageUserData: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingStorageUserData, setIsLoadingStorageUserData] = useState(false)

  async function updateUserAndToken(token: string, userData: UserDTO) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userData);
  }

  async function saveUserAndTokenStorage(token: string, userData: UserDTO) {
    try {
      setIsLoadingStorageUserData(true)

      await saveToken(token)
      await saveUser(userData)

    } catch (error) {
      throw error
    } finally {
      setIsLoadingStorageUserData(false)
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password })

      if (data.user) {
        await saveUserAndTokenStorage(data.token, data.user)
        updateUserAndToken(data.token, data.user)
      }
    } catch (error) {
      throw error
    } 
  }

  async function signOut() {
    try {
      setIsLoadingStorageUserData(true)

      setUser({} as UserDTO)
      
      await deleteUser()
      await deleteToken()
      
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStorageUserData(false)
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorageUserData(true)

      const token = await getToken()
      const userLogged = await getUser()

      if (token && userLogged) {
        updateUserAndToken(token, userLogged)
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUserData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingStorageUserData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
