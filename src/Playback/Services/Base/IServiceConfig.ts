import { IAuthMethod } from "./IAuthMethod"

export interface IServiceConfig {
    name: string
    isMainService: boolean // Literally, is Spotify service
    authMethods: IAuthMethod[]
}
