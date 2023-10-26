import { useState, useEffect, createContext, useContext } from 'react';
import { apiInstance, getUserDetails } from '../services/ApiService';
import { AuthType } from '../utils/types';

export const useAuthProvider = () => {
  
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const setAuthToken = (token: any) =>  setToken(token);
  const getToken = () => localStorage.getItem('token')
  const getUser = () => JSON.parse(localStorage.getItem('user') as string)

  const logoutUser = () => {
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setAuthToken(storedToken);

    const storedUser = JSON.parse(localStorage.getItem('user') as string)
    if (storedUser) setUser(storedUser)
  }, [])

  useEffect(() => {
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token'); 
  }, [token])

  useEffect(() => {
    user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user'); 
  }, [user])

  useEffect(() => {
    // Fetch user details when the token changes
    if (token) {
      (async () => {
        try {
          apiInstance.defaults.headers.common.Authorization = `${token}`

          if (!user) {
            const { data } = await getUserDetails()
            if (data.ack === 0 || data.ack === 2) throw new Error(data.message)
            if (data.ack === 1) {
              setUser(data.user)
            }
          }
        } catch (error) {  
          logoutUser()
        }    
      })()
    }
  // eslint-disable-next-line
  }, [token, user])

  useEffect(() => {
    setIsAuthenticated(!!token && !!user)
  }, [token, user])

  return {
    user,
    isAuthenticated,
    setToken,
    getToken,
    getUser,
    logoutUser
  }
}

export const AuthContext = createContext<AuthType | null>(null)

export default function useAuth() {
  return useContext(AuthContext)
}
