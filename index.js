import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import choiceRouter from "./routes/choiceRouter.js";
import pollRouter from "./routes/pollRouter.js";

const app = express();
app.use(json());
app.use(cors());

dotenv.config();

app.use(choiceRouter);
app.use(pollRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
