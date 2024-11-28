import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Root Route
app.get("/", (req: Request, res: Response) => {
    res.send("Server is up and running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
