import { AuthenticationData } from "../dtos/dtoPost";

export interface ITokenManager{
    generateToken:(id: string)=>string,
    getTokenData:(token: string)=>AuthenticationData
}