import * as bcrypt from "bcryptjs"

export class HashManager {

    public generateHash = async (password: string): Promise<string> => {

        const rounds = Number(process.env.BCRYPT_COST) /* complexidade do hash - salt espera receber o rounds*/
        const salt = await bcrypt.genSalt(rounds)
        const hash = await bcrypt.hash(password, salt)

        return hash
        
    }


    /***COMPRARA A HASH PARA USAR NO LOGIN ****/
    public compareHash = async (hashNow:string, hashBd: string):Promise<boolean> => {

        const result = await bcrypt.compare(hashNow, hashBd)
        
        return result

    }
}