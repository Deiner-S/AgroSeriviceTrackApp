import { AuthTokens, getTokenStorange, saveTokenStorange } from "@/storange/authStorange"
import { httpRequest } from "./networkService"

type login = {
    username: string,
    password: string
}

export async function haveToken(): Promise<boolean>{
  const token = await getTokenStorange()
  return token?.access != null
}


export async function requestToken({username,password}:login){
    const response = await httpRequest<AuthTokens>({
            method: 'POST',
            endpoint: '/api/token/',
            BASE_URL: "https://ringless-equivalently-alijah.ngrok-free.dev/gerenciador",
            body: {username,password}
    })
    
    
    if (!response.access && !response.refresh) throw Error("REQUEST_FAILURE")
      console.log('REQUEST TOKEN:', response.access)
      await saveTokenStorange({
        access: response.access,
        refresh: response.refresh
      })     
    
}


export async function refreshToken(): Promise<void> {
  const tokens = await getTokenStorange()
  if (!tokens?.refresh) throw new Error('NO_REFRESH_TOKEN')

  const response = await httpRequest<{ access: string }>({
    method: 'POST',
    endpoint: '/api/token/refresh/',
    BASE_URL: 'https://ringless-equivalently-alijah.ngrok-free.dev/gerenciador',
    body: { refresh: tokens.refresh },
  })

  if (!response.access) throw new Error('REFRESH_FAILED')

  await saveTokenStorange({
    access: response.access,
    refresh: tokens.refresh, 
  })
}