import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
connectDB();
 
app.use(cookieParser());
app.use(express.json());
app.use(clerkMiddleware())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type","Authorization"],
}))

app.get("/",(req,res)=> {
    res.send("Hello World");
})

app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(process.env.PORT || 8080,(req,res)=> {
    console.log(`Server is listening on port ${process.env.PORT || 8080}`)
})