import express from 'express';
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import contentRoutes from "./routes/contentRoutes.js"
import dotenv from 'dotenv'
import cors from 'cors';
dotenv.config()

const app = express();

// middleware
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const dbString = process.env.MONGODB_ATALS_CONNECTION_STRING

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbString, connectionParams).then(() => {
    console.info("Mongodb connected..")
}).catch((e) => {
    console.error("Error connecting to Mongodb database..")
})

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/content', contentRoutes)

export default app;