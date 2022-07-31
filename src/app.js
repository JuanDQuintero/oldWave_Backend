import express from "express";
import morgan from "morgan";
import 'dotenv/config';

const app = express();

//settings
app.set("port", process.env.PORT);

//Middlewares
app.use(morgan("dev"));

export default app;
