/** TYPE **/
export type AuthenticationData = {
    id: string
}

export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}

/** INPUT **/

export interface SignupInputDTO {
    name: string,
    email: string,
    password: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface FriendshipInputDTO{
    emailFriend: string,
    token: string
}


export interface UnfriendInputDTO{
    id_friend: string,
    token: string
}



