/* 
separar em input e output

 */

enum POST_TYPES {
    NORMAL = "normal",
    EVENT = "event"
}


export interface createPostInputDTO {
    photo: string,
    description: string,
    type: POST_TYPES,
    author_id: string
    token: string
}

export interface getPostOutputDTO {
    photo: string,
    description: string,
    type: POST_TYPES,
    createdAt: Date
}

export interface getPostInputDTO {
    id: string
}

export interface inputCommentPostDTO {
    comment_post: string,
    idPost: string,
    token: string
}

export interface inputCommentPostDataDTO {
    id: string
    comment_post: string,
    idUser: string,
    idPost: string
}

export interface inputFeedDTO {
    token: string,
    page: number
}

export interface inputTypeFeedDTO {
    typePost: POST_TYPES,
    page: number,
    token: string
}

export interface inputFeedDataDTO {
    size: number,
    offset: number,
    typePost: string
}

export interface inputPostLikeDTO {
    idPost: string,
    token: string
}

export interface inputPostLikeDataDTO {
    id: string,
    idPost: string,
    idUser: string
}

export interface inputPostUnlikeDataDTO {
    id: string,
    idPost: string,
    idUser: string
}

export interface getIdLikeDTO {
    idPost: string,
    idUser: string
}

export type Post = {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    createdAt: Date,
    author_id: string
}

/* colocar na camada de data pq estou modelando o que sai do banco  */

export function postModel(obj: any): Post {
    return obj && {
        id: obj.id,
        photo: obj.photo,
        description: obj.description,
        type: obj.type,
        createdAt: obj.create_at,
        author_id: obj.author_id
    }
}



