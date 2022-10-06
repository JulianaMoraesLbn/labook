import { v4 } from "uuid";
import { IidGenerator } from "../ports/repository/repositories/repositoriesServices";


export class IdGenerator implements IidGenerator {

    public generateId = ():string => {
        return v4()
    }

}