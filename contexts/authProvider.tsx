import { haveToken, requestToken } from '@/services/authService'
import { clearTokenStorange } from '@/storange/authStorange'
import { useEffect, useState } from 'react'
import { AuthContext } from './authContext'

type props={
  children: React.ReactNode
}

export function AuthProvider({children} : props) {
  const [loged, setloged] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function bootstrap() {
      setLoading(false)
      const containsToken = await haveToken()
      setloged(containsToken)
    }

    bootstrap()
  }, [])

  async function login(username: string, password: string){
    try{
      await requestToken({username,password})
      setloged(true)
    }catch(err){
      console.log(`LOG ERROR ${err}`)
    }

  }

  function logout() {
    clearTokenStorange()
    setloged(false)
  }

  return (
    <AuthContext.Provider value={{ loged, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
