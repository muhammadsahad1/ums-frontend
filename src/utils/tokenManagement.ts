import { ITokens } from "@/types/Token";

// managing tokens
export const getTokens = (): ITokens | null => {
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')

    return access_token && refresh_token ? { access_token, refresh_token } : null
}

export const setTokens = (tokens: ITokens): void => {
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
}


export const clearTokens = (): void => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}

