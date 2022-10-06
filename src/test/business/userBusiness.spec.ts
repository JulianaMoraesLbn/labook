import { stringify } from "uuid"
import { UserBusiness } from "../../Core/business/UserBusiness"
import { IdGeneratorMock, HashGeneratorMock, TokenGeneratorMock, UserDataBaseMock } from "../mocks/mocks"

//iUserDataBase: IUserDataBase, idGenerator: IidGenerator, iHashManager: IHashManager, tokenManger: ITokenManager



describe("Teste do snigup do userBusiness", () => {

    const iUserDataBaseMock = new UserDataBaseMock()
    const idGeneratorMock = new IdGeneratorMock()
    const iHashManagerMock = new HashGeneratorMock()
    const tokenMangerMock = new TokenGeneratorMock()

    const userBusiness = new UserBusiness(iUserDataBaseMock, idGeneratorMock, iHashManagerMock, tokenMangerMock)

    test("Retorno erro: Nome invalido", async () => {

        try {

            const input = { name: "Ju", email: "ju@ju.com", password: "123456" }
            const retorno = await userBusiness.signup(input)
            expect(retorno).toBe("teste1")

        } catch(err:any) {
            console.log("teste business", err.message)
            expect(err.message).toBe("sds")
        }



    })
})