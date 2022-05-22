import connection from "../db.js";
import pollSchema from "../schemas/pollSchema.js";


export async function createPoll(req,res){
    let poll = req.body;
  
    const {error} = pollSchema.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(422).send(error.details.map(detail => detail.message));   
    }

    let date = poll.expireAt;
    if(!date){
        date = new Date(new Date().setDate(new Date().getDate() + 30));
        poll.expireAt = date;
    }
    
    try{
        const { mongoClient, db } = await connection();
        await db.collection("polls").insertOne(req.body);
        await mongoClient.close(); 
        res.sendStatus(201);
        } catch(error){
        res.sendStatus(500);
    }
   
};
  
export async function getPoll (req,res) {
    try{
        const { mongoClient, db } = await connection();
        const polls = await db.collection("polls").find({}).toArray();
        await mongoClient.close(); 
        if(polls){
           return res.status(200).send(polls);     
        }
        
    } catch(error){
        res.sendStatus(500);
    }
};

export async function getVoteOptions (req,res){
    
}

export async function getResults(req,res){
    
}