import {Router} from "express";
//reminder to export middlewares//
import {createPoll,getPoll,getVoteOptions,getResults} from "./../controllers/pollController.js";

const pollRouter = Router();

pollRouter.post("/poll",createPoll);
pollRouter.get("/poll",getPoll);
pollRouter.get("/poll/:id/choice",getVoteOptions);
pollRouter.get("/poll/:id/result",getResults);

export default pollRouter;

