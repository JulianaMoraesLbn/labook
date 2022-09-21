import { DataBaseErr } from "../../Core/entities/customError";
import { FriendshipInputDataDTO, toUserModel, UnfriendInputDataDTO, User } from "../../Core/entities/User";
import { connectionDataBase } from "./connectionDataBase";


export class UserDataBase extends connectionDataBase {

    public insertUser = async(user: User):Promise<void> => {

        try {

            const { id, name, email, password } = user

            await UserDataBase.connection('user_labook')
                .insert({
                    id,
                    name,
                    email,
                    password
                })

        } catch (err: any) {
            throw new Error(err.sqlMessage)
        }

    }

    public getUserEmail = async(email: string): Promise<User> => {

        try {

            const result: any = await UserDataBase.connection("user_labook")
                .select("*")
                .where("email", email)

            return toUserModel(result[0])

        } catch (err: any) {
            throw new Error(err.sqlMessage)
        }

    }

    public getUserId = async (id: string): Promise<User> => {

        try {

            const result: any = await UserDataBase.connection("user_labook")
                .select("*")
                .where("id", id)

            return toUserModel(result[0])

        } catch (err: any) {
            throw new Error(err.sqlMessage)
        }

    }

    public newFriendship = async (inputFriendData: FriendshipInputDataDTO):Promise<void> => {
        try {

            const { id, id_user, id_friend } = inputFriendData

            await UserDataBase.connection("friend_labook")
                .insert({
                    id,
                    id_friend_one: id_user,
                    id_friend_two: id_friend
                })

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage)
        }

    }

    public unfriend = async (inputFriendData: UnfriendInputDataDTO):Promise<void> => {
        try {

            const { id_user, id_friend } = inputFriendData

            await UserDataBase.connection("friend_labook")
                .delete('*')
                .where("id_friend_one", id_user)
                .andWhere("id_friend_two", id_friend)

        } catch (err: any) {
            throw new DataBaseErr(err.sqlMessage)
        }

    }

    public getAllFriendsById = async (id: string):Promise<[]> => {

        const resultAllFriends = await UserDataBase.connection("friend_labook")
            .select('id_friend_two')
            .where('id_friend_one', id)

        return resultAllFriends[0]
    }


}