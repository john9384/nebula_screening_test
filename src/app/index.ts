import express, { Application, Request, Response } from "express";
import connectDB from "../database/connect";

function initializeApplication(): Application{
const app: Application = express();
const PORT = 3000;

connectDB();
// Middleware
app.use(express.json());

// Root Route
app.get("/", (req: Request, res: Response) => {
    res.send("Server is up and running!");
});

return app
}