import connection from "../db.js";
import choiceSchema from "../db.js"
import { ObjectId } from "mongodb";


export async function publishChoice(req,res){
    const choice = req.body;
    const {error} = choiceSchema.validate(choice,{abortEarly:false});
    let pollCreated;

    try {
        const id = ObjectId(choice.pollId);
        pollCreated = await db.collection("polls").findOne({ _id: id });

        if (!pollCreated) {
        return res.sendStatus(404);
        }

    } catch (error) {
        console.log(error);
        return res.sendStatus(404);
    }

    try {
        const { mongoClient, db } = await connection();
        if (new Date(pollCreated.expireAt) < new Date()) {
        return res.sendStatus(403);
        }

        if(error){
            return res.status(401).send(error.details.map(detail => detail.message));   
        }

            const thereIsTitle = await db
            .collection("choices")
            .findOne({ title: choice.title });
        if (thereIsTitle) {
            res.sendStatus(409);
            return;
        }

        const choices = await db.collection("choices").insertOne(choice);
        await mongoClient.close(); 
        if (choices) {
          res.sendStatus(201);
          return;
        } else res.sendStatus(401);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    };

export async function postVote(req,res){



};



