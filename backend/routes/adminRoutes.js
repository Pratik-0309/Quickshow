import express from 'express'
import { getAllBookings, getAllShows, getDashboardData, isAdmin } from '../controller/adminController.js';
import { verfiyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/is-admin',verfiyAdmin, isAdmin)
router.get('/dashboard',verfiyAdmin, getDashboardData)
router.get('/all-shows',verfiyAdmin, getAllShows)
router.get('/all-bookings',verfiyAdmin, getAllBookings)


export default router;