import connection from "../db.js";
import pollSchema from "../schemas/pollSchema.js";
import { ObjectId } from "mongodb";


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
          await mongoClient.close(); 
          return res.status(201).send(polls);     
        }   
    } catch(error){
        res.sendStatus(500);
    }
};

export async function getVoteOptions (req,res){
    const id = req.params.id;

    try {
      const { mongoClient, db } = await connection();
      const choices = await db
        .collection("choices")
        .find({ pollId: id })
        .toArray();
      if (choices.length === 0) {
        return res.sendStatus(404);
      }
      await mongoClient.close(); 
      return res.status(201).send(choices);
    } catch (error) {
      return res.sendStatus(500);
    }
}

export async function getResults(req,res){
  const pollId = new ObjectId(req.params.id);
  try {
      const { mongoClient, db } = await connection();
      const ThereIsPoll = await db.collection('polls').findOne({_id: pollId});
      if(!ThereIsPoll) {
          return res.sendStatus(404);
      }
      const optionChoice = await db.collection('choices').find({_id: ObjectId}).toArray();
      const votes = await db.collection('votes').find({pollId: pollId.toString()}).toArray();
      if(votes){
          const a = [];
          for(let i = 0; i < votes.length; i++){
              const item = votes[i].vote;
              a.push(item.toString());
          }
          const test = Array.from(new Set(a));
          const d = [];
          for(let i = 0; i < test.length; i++){
              const test2 = a.filter(value => value === test[i])
              d.push(test2);
          }
          let count = 0;
          let id = "";
          for(let i = 0; i < d.length; i++){
              if(count < d[i].length){
                  count = d[i].length;
                  id = d[i][0];
              }
          }
          const choiceThatWon = await db.collection('choices').findOne({_id: new ObjectId(id)});
          ThereIsPoll.result = {title: choiceThatWon.title, count: count}
      }
      await mongoClient.close(); 
      res.status(201).send(ThereIsPoll);
      } catch (error) {
          res.sendStatus(500);
  }
};
