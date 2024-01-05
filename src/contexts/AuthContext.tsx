import { ReactNode, createContext, useEffect, useState } from "react"

import { api } from "@services/api"
import { UserDTO } from "@dtos/UserDTO"

import { storageDeleteUser, storageGetUser, storageSaveUser } from "@storage/user/storageUser"
import { storageDeleteToken, storageGetToken, storageSaveToken } from "@storage/token/storageToken"

type AuthContextData = {
  user: UserDTO;
  isLoadingStorageUserData: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updatingUserProfile: (userUpdated: UserDTO) => Promise<void>;
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

      await storageSaveToken(token)
      await storageSaveUser(userData)

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
      
      await storageDeleteUser()
      await storageDeleteToken()
      
    } catch (error) {
      throw error
    } finally {
      setIsLoadingStorageUserData(false)
    }
  }

  async function updatingUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated)
      await storageSaveUser(userUpdated)

    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorageUserData(true)

      const token = await storageGetToken()
      const userLogged = await storageGetUser()

      if (token && userLogged) {
        await updateUserAndToken(token, userLogged)
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

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => subscribe()
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        updatingUserProfile,
        isLoadingStorageUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
