/* colocar na camada de data pq estou modelando o que sai do banco  */

enum POST_TYPES {
    NORMAL = "normal",
    EVENT = "event"
}

export type Post = {
    id: string,
    photo: string,
    description: string,
    type: POST_TYPES,
    createdAt: Date,
    authorId: string
}

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

/*** DATABASE ***/

export interface inputFeedDataDTO {
    size: number,
    offset: number,
    typePost: string
}

export interface getIdLikeDTO {
    idPost: string,
    idUser: string
}

export interface inputCommentPostDataDTO {
    id: string
    comment_post: string,
    idUser: string,
    idPost: string
}


export interface inputPostUnlikeDataDTO {
    id: string,
    idPost: string,
    idUser: string
}

export interface inputPostLikeDataDTO {
    id: string,
    idPost: string,
    idUser: string
}