import express from 'express'
import { getUserBookings, updateFavourite, getFavourites } from "../controller/userController.js"

const router = express.Router();

router.get('/bookings',getUserBookings);
router.post('/update-favourite',updateFavourite);
router.get('/favourites',getFavourites); 

export default router;