/** TYPE **/
export type AuthenticationData = {
    id: string
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



