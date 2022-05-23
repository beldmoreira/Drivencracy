
import {pollSchema} from "../schemas/pollSchema.js";

export function validatePoll(req,res,next){
    const {error} = pollSchema.validate(req.body);
    if(error){
        return res.sendStatus(422)
    }

    next();
}    

export function validatePollChoice(req,res,next){

    if(error){
        return res.sendStatus(404)
    }

    next();

}

    
// GET /poll/:id/choice
// Validação: caso a enquete não exista deve retornar erro 404.

