import {choiceSchema} from "../schemas/choiceSchema.js"

export function validateChoice(req,res,next){

}

// POST /choice

// - Validação:
//     - [ ]  Uma opção de voto não pode ser inserida sem uma enquete existente, retornar status 404.
//     - [ ]  **Title** não pode ser uma string vazia, retornar status 422.
//     - [ ]  **Title** não pode ser repetido, retornar status 409.
//     - [ ]  Se a enquete já estiver expirado deve retornar erro com status 403.


// POST /choice/:id/vote

// - Validações:
//     - [ ]  Verificar se é uma opção existente, se não existir retornar 404
//     - [ ]  Não pode ser registrado se a enquete já estiver expirado, retornar erro 403.

