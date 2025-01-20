export interface ITokens {
    access_token: string,
    refresh_token: string;
}


export interface IRefreshResponse {
    status: number,
    message: string,
    tokens: ITokens
}