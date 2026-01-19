import express from 'express'
import { addShow, getNowPlayingMovies,getShows,getShow } from '../controller/showController.js';
import { verfiyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get("/now-playing",verfiyAdmin,getNowPlayingMovies);
router.post("/add",verfiyAdmin,addShow); 
router.get("/all",getShows);
router.get("/:movieId",getShow)
export default router;