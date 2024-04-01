import connectDB from "./db/database";
import { app } from "./app";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log(
                `🌐 Server is running on port ${process.env.PORT || 8080} `
            );
        });
    })
    .catch((err) => {
        console.error(`❗Failed to connect MongoDB \n`, err);
    });
