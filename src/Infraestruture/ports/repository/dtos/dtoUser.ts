export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}


export interface FriendshipInputDataDTO{
    id: string,
    id_user: string,
    id_friend: string
}

export interface UnfriendInputDTO{
    id_friend: string,
    token: string
}

export interface UnfriendInputDataDTO{
    id_user: string,
    id_friend: string
}


export function toUserModel(obj:any): User{
    return obj && {
        id: obj.id,
        email: obj.email,
        name: obj.name,
        password: obj.password
    }
}