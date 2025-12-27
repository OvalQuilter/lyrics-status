export interface IAuthMethod {
    name: string
    type: "field" | "oauth"
    value: string
    oauthUrl: string
    callbackUrl: string
}
