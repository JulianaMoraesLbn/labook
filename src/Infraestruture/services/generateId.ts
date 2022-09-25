import { v4 } from "uuid";
import { IidGenerator } from "../../Core/business/ports/services";


export class IdGenerator implements IidGenerator {

    public generateId = ():string => {
        return v4()
    }

}