import express, { Application, Request, Response } from "express";

function initializeApplication(): Application{
const app: Application = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Root Route
app.get("/", (req: Request, res: Response) => {
    res.send("Server is up and running!");
});

return app
}