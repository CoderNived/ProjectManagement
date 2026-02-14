import express from 'express'
import cors from "cors"

const app =express();
const port = process.env.PORT||3000;

// Basic Configuration
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

//cors Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// import the routes
import healthCheckRoutes from './routes/healthCheck.routes.js';

app.use('/api/v1/health', healthCheckRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to my Express App!");
});

app.get("/instagram", (req, res) => {
    const username = process.env.INSTAGRAM_USERNAME;
    res.send(`Instagram username is: ${username}`);
});

export default app;