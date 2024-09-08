
export interface IAuthRequest {
    message: string
    user: {
        name: string
        email: string
        role: string
    }
    token: string
}
