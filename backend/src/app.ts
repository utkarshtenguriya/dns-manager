import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

/** 
 * Configuration for cross origin requests 
 */
const options: CorsOptions = {
    origin: "*",
    credentials: true,
    methods: ["GET","POST"]
};

app.use(cors(options));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

 
// Routes imported 
import userRouter from "./routes/user.routes"
import recordRouter from "./routes/record.routes";

// Define routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/record", recordRouter)

export { app };
