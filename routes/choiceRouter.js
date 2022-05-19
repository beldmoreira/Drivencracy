import {Router} from "express";
//reminder to export middlewares//
import { publishChoice,postVote } from "../controllers/choiceController.js";


const choiceRouter = Router();

choiceRouter.post("/choice",publishChoice);
choiceRouter.post("/choice/:id/vote",postVote);

export default choiceRouter;


