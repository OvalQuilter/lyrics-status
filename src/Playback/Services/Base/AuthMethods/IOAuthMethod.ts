export interface IOAuthMethod {
    name: string
    type: "oauth"
    token: string
    oauthUrl: string
    callbackUrl: string
}
