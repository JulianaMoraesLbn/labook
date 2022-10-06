import { UserBusiness } from "../../Core/business/UserBusiness"
import { UserController } from "../../Presentation/controller/UserController"
import { IdGeneratorMock, HashGeneratorMock, TokenGeneratorMock, UserDataBaseMock } from "../mocks/mocks"



describe.skip("Teste do snigup do userContro", () => {

    const iUserDataBaseMock = new UserDataBaseMock()
    const idGeneratorMock = new IdGeneratorMock()
    const iHashManagerMock = new HashGeneratorMock()
    const tokenMangerMock = new TokenGeneratorMock()

    const userBusiness = new UserBusiness(iUserDataBaseMock, idGeneratorMock, iHashManagerMock, tokenMangerMock)

    const userController = new UserController(userBusiness)

    test("Retorno erro: Nome invalido", async () => {
        
        expect.assertions(1)

        try {

            const req:any = { body: {email: "ju@ju.com", password: "123456"} }
            const res:any = {status:()=>{return {send:()=>""}}}
            await userController.signup(req, res)

        } catch(err:any) {
          
            expect(err.statusCode).toBe(400)
            expect(err.message).toBe("")
        }
    })
}) 