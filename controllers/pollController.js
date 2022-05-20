import connection from "../db.js";
import pollSchema from "../schemas/pollSchema.js";


export async function createPoll(req,res){
    console.log("nwgoihgr")
    const {title,expireAt} = req.body;

    const {error} = pollSchema.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(422).send(error.details.map(detail => detail.message));   
    }

    try{
        console.log("gegihe")
       const { mongoClient, db } = await connection();
        console.log("antes")
       await db.collection("polls").insertOne(req.body);
       console.log("depois")
       await mongoClient.close(); 
       res.sendStatus(201);
    } catch(error){
        res.sendStatus(500);
    }
   
};

// try {
//     const SALT = 10;
//     const passwordHash = bcrypt.hashSync(req.body.password, SALT);
    
//     await db.collection("users").insertOne({
//       name: req.body.name,
//       email: req.body.email,
//       password: passwordHash
//     });

//     return res.sendStatus(201); // created
//   } catch (error) {
//     console.log("Error creating new user.");
//     console.log(error);
//     return res.sendStatus(500);
//   }
  
  
//   const poll = req.body;

//   const validate = pollSchema.validate(poll);

//   if(validate.error){
//       res.sendStatus(422)
//   }

//   try{
//       const newPool = await db.collection('polls').insertOne(poll);
//           if(newPool){
//               res.sendStatus(201)
//               return;
//           }else(
//               res.sendStatus(401)      
//           )
//       }catch(error){
//           res.sendStatus(500);
//       }

// }


export async function getPoll (req,res) {
    const{_id,title,expireAt}= req.body;
    try{
        await db.collection("polls").findOne(req.body);
        res.sendStatus(201);
    } catch(error){
        res.sendStatus(500);
    }
};

export async function getVoteOptions (req,res){
    
}

export async function getResults(req,res){
    
}