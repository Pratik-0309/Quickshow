import express from 'express'
import { addShow, getNowPlayingMovies } from '../controller/showController.js';

const router = express.Router();

router.get("/now-playing",getNowPlayingMovies);
router.post("/add",addShow); 

export default router;