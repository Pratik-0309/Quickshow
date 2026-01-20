import express from 'express';
import { getOccupiedSeats,createBooking } from '../controller/bookingController.js';

const router = express.Router();

router.post('/create',createBooking);
router.get('/seats/:showId',getOccupiedSeats);

export default router;
