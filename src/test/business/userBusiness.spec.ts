import { InvalidEmail } from "../../Common/customError"
import { LoginInputDTO, SignupInputDTO, User } from "../../Core/business/ports/repository/dtos/dtoUser"
import { UserBusiness } from "../../Core/business/UserBusiness"
import { UserController } from "../../Presentation/controller/UserController"
import { getMockReq, getMockRes } from '@jest-mock/express'
import { Request, Response } from "express"

// pq os moks so funcionam nesse arquivo spec? queria fazer os mocks em arquivos separados

const userDataBase = {
    insertUser: jest.fn(async (user: User) => { }),
    getUserEmail: jest.fn(async (email: string) => {
        if (email === "teste@email.com") {
            return {
                id: "id",
                nome: "nome",
                email: "teste@email.com",
                password: "123456"
            }
        } else {
            throw new InvalidEmail
        }

    })
}

const idGenerator = {
    generateId: jest.fn(() => "geradordeid")
}

const HashManager = {
    generateHash: jest.fn(async (password: string) => "senha_criptografada"),
    compareHash: async (hashNow: string, hashBd: string): Promise<boolean> => hashNow === "123456" ? true : false
}

const tokenManger = {
    generateToken: jest.fn((id: string) => "token"),
    getTokenData: jest.fn(() => "tokenVerdadeiro")

}

const userBusiness = new UserBusiness(
    userDataBase as any,
    idGenerator as any,
    HashManager as any,
    tokenManger as any
)

//const userController = new UserController(userBusiness)

describe.skip("Teste do snigup do userBusiness", () => {

    test("teste singup: Verifica se retorna o token", async () => {
        expect.assertions(1)
        const user = {
            name: "nome",
            email: "teste@email.com",
            password: "123456"
        } as SignupInputDTO

        const result = await userBusiness.signup(user)
        expect(result).toBe("token")

    })

})

describe.skip("Teste do login", () => {

    test("teste login: Verifica se retorna o token", async () => {
        expect.assertions(1)

        const user = {
            email: "teste@email.com",
            password: "123456"
        } as LoginInputDTO

        const result = await userBusiness.login(user)
        expect(result).toBe("token")

    })

    test("Retorno de erro: Erro email invalido", async () => {
        expect.assertions(1)

        try {

            const user = {
                email: "tese@email.com",
                password: "123456"
            } as LoginInputDTO

            const result = await userBusiness.login(user)

        } catch (err: any) {
            expect(err.message).toBe("Email inválido")
        }

    })

    test("Retorno de erro: Erro password invalido", async () => {
        expect.assertions(2)

        try {

            const user = {
                email: "teste@email.com",
                password: "123"
            } as LoginInputDTO

            const result = await userBusiness.login(user)

        } catch (err: any) {
            expect(err.statusCode).toBe(400)
            expect(err.message).toBe("Senha invalida")
        }

    })

})

//tentei testar o controller
/* describe("Teste do controller login", () => {


    test("", () => {
        expect.assertions(1)
        try {

             const req = { body: { email: "testeemail.com", password: "123456" } }

            let responseObject = {}
            
            const res = {
                json: jest.fn().mockImplementation((result)=>{responseObject = result })
             } 

            const req = getMockReq({
                body: { email: 'testeemail.com', password: "123456" },
            })

            interface  CustomResponse
                locals: any;  estende  Resposta  { 
                locals : { 
                  sessionId ?: string 
                  isPremiumUser ?: boolean 
                } 
              } 
              
              const  { res }  =  getMockRes < CustomResponse > ( { 
                err : { 
                  message : 'abcdef' , 
                  isPremiumUser : false , 
                } , 
              } )
              
               res.locals é digitado 
              expect ( res . locals . sessionId ) . toBe ( 'abcdef' ) 
              expect ( res . locals . isPremiumUser ) . toBe ( falso )

            const result = userController.login(req, res)

        } catch (err: any) {
            expect(err.message).toBe("Email inválido")
        }
    })

}) */



