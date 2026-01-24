import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoute.js"
import bookingRouter from './routes/bookingRoute.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/userRoute.js'
import { stripeWebhooks } from './controller/stripeWebhook.js';

const app = express();
connectDB();

app.use("/api/stripe", express.raw({type: 'application/json'}), stripeWebhooks)
 
app.use(cookieParser());
app.use(express.json());
app.use(clerkMiddleware())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type","Authorization"],
}))

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/show",showRouter);
app.use("/api/booking",bookingRouter);
app.use("/api/admin",adminRouter);
app.use("/api/user",userRouter);


app.get("/",(req,res)=> {
    res.send("Hello World");
})


app.listen(process.env.PORT || 8080,(req,res)=> {
    console.log(`Server is listening on port ${process.env.PORT || 8080}`)
})