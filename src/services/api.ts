import axios, { AxiosInstance } from "axios"

import { AppError } from "@utils/AppError"
import { storageGetToken } from "@storage/token/storageToken"

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: "http://192.168.0.2:3333",
}) as APIInstanceProps

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response, async (reqError) => {
      if (reqError?.response?.status === 401) {
        if (reqError.response?.data === 'token.expired' || reqError.response?.data === 'token.invalid') {
          const { refresh_token } = await storageGetToken()

          if (!refresh_token) {
            signOut()
            return Promise.reject(reqError)
          }
        }

        signOut()
      }

      if (reqError.response && reqError.response.data) {
        return Promise.reject(new AppError(reqError.response.data.message)) 
      } else {
        return Promise.reject(reqError)
      }
    })
  
  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}


export { api }
