import { AuthenticationData } from "../dtos/dtoUser"


export interface IidGenerator{
    generateId: () => string
}

export interface ITokenManager{
    generateToken:(id: string)=>string,
    getTokenData:(token: string)=>AuthenticationData
}

export interface IHashManager{
    generateHash:(password: string)=>Promise<string>
    compareHash:(hashNow:string, hashBd: string)=>Promise<boolean>
}


