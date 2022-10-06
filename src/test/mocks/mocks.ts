import {IHashManager, IidGenerator, ITokenManager} from "../../Core/business/ports/repository/repositories/repositoriesServices"
import { IUserDataBase } from "../../Infraestruture/ports/repository/repositories/repositoriesUserData"


export class IdGeneratorMock implements IidGenerator {
    generateId = jest.fn(()=>"489")
}

export class TokenGeneratorMock implements ITokenManager {
    generateToken = jest.fn(()=>"teste")
    getTokenData = jest.fn()
}

export class HashGeneratorMock implements IHashManager {
    async generateHash(password: string):Promise<string>{
        return "hash"
    }

    async compareHash(password: string, hashBd: string):Promise<boolean>{
        return password === hashBd
    }
}

export class UserDataBaseMock implements IUserDataBase{
    insertUser = jest.fn()
    getUserEmail = jest.fn()
    getUserId = jest.fn()
    newFriendship = jest.fn()
    unfriend = jest.fn()
    getAllFriendsById = jest.fn()
    getIdFriends = jest.fn()
}