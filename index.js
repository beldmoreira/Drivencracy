import express, {json} from "express";
import cors from "cors";

import dotenv from "dotenv";

const app = express();
app.use(json());
app.use(cors());

dotenv.config();

app.post("/poll",(req,res) => {
    const {title,expireAt} = req.body;

    const getpollSchema = joi.object({
        title: joi.string().required()
    });
    const {error} = getpollSchema.validate(req.body,{abortEarly:false});
    if(error){
        return res.status(422).send(error.details.map(detail => detail.message));   
    }

    try{
       await.db 
    }catch(error){

    }
   
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});