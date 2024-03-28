import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

/** 
 * Configuration for cross origin requests 
 */
const options: CorsOptions = {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
};

app.use(cors(options));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

 
// Routes imported 

// Define routes

export { app };
