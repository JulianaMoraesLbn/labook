import { DataBaseErr } from "../../Common/customError";
import { FriendshipInputDataDTO, toUserModel, UnfriendInputDataDTO, User } from "../ports/repository/dtos/dtoUser";
import { IUserDataBase } from "../ports/repository/repositories/repositoriesUserData";
import { connectionDataBase } from "./connectionDataBase";


export class UserDataBase extends connectionDataBase implements IUserDataBase{

    public insertUser = async(user: User):Promise<void> => {

        try {
            console.log("entrou")
            const { id, name, email, password } = user

            await UserDataBase.connection('user_labook')
                .insert({
                    id,
                    name,
                    email,
                    password
                })

        } catch (err: any) {
            console.log("data", err)
            throw new Error(err.sqlMessage || err.message)
        }

    }

    public getUserEmail = async(email: string): Promise<User> => {

        try {
    
            const result: any = await UserDataBase.connection("user_labook")
                .select("*")
                .where("email", email)

            return toUserModel(result[0])

        } catch (err: any) {
            throw new Error(err.sqlMessage || err.message)
        }

    }

    public getUserId = async (id: string): Promise<User> => {

        try {

            const result: any = await UserDataBase.connection("user_labook")
                .select("*")
                .where("id", id)

            return toUserModel(result[0])

        } catch (err: any) {
            throw new Error(err.sqlMessage || err.message)
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
            throw new DataBaseErr(err.sqlMessage || err.message)
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
            throw new DataBaseErr(err.sqlMessage || err.message)
        }

    }

    public getAllFriendsById = async (id: string):Promise<[]> => {

        try{
        const resultAllFriends = await UserDataBase.connection("friend_labook")
            .select('id_friend_two')
            .where('id_friend_one', id)

        return resultAllFriends[0]
        }catch(err: any){
            throw new DataBaseErr(err.sqlMessage || err.message)
        }
    }

    public getIdFriends = async (id: string):Promise <string[]> => {

        const result = await UserDataBase.connection("friend_labook")
        .select("id_friend_two")
        .where("id_friend_one", id)

        return result.flatMap(array => array.id_friend_two)
    }


}