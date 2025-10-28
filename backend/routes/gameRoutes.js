import { updateScore , resetScore, getLeaderboard } from "../controllers/gameController.js";

import express from 'express'
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.patch('/game/patch/updatescore' , authMiddleware , updateScore);

router.patch('/game/patch/resetscore' , authMiddleware , resetScore);

router.get('/game/get/leaderboard' , authMiddleware , getLeaderboard);

export { router };