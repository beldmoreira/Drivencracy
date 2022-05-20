export async function publishChoice(req,res){

    try{
        await db.collection("choices").insertOne(req.body); 
        res.sendStatus(201);
     } catch(error){
         res.sendStatus(500);
     }

};

export async function postVote(req,res){

    try{
        await db.collection("choices").findOne(req.body);
        res.sendStatus(201);
    } catch(error){
        res.sendStatus(500);
    }

};



