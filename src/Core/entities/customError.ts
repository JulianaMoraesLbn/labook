export class CustomError extends Error{
    //defini um atributo
    statusCode: number

    constructor(status: number, message: string){
        super(message)
        this.statusCode = status
    }
}

export class InvalidId extends CustomError{
    constructor(){
        super(400, "Id inválido")
    }
}

export class PostNonexistent extends CustomError{
    constructor(){
        super(400, "Post Inexistente")
    }
}

export class Duplicate extends CustomError{
    constructor(){
        super(400, "Erro: Duplicado")
    }
}

export class InvalidName extends CustomError{
    constructor(){
        super(400, "Nome inválido")
    }
}

export class InvalidEmail extends CustomError{
    constructor(){
        super(400, "Email inválido")
    }
}

export class InvalidPassword extends CustomError{
    constructor(){
        super(400, "Senha invalida")
    }
}

export class MissingInformation extends CustomError{
    constructor(){
        super(400, "Faltam informações")
    }
}

export class InvalidToken extends CustomError{
    constructor(){
        super(400, "Informe o token")
    }
}

export class GenericError extends CustomError{
    constructor(){
        super(500, "Ocorreu um erro")
    }
}

export class DataBaseErr extends CustomError{
    constructor(message: string){
        super(500, message)
    }
}

