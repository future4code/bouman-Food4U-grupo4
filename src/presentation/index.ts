import express, { Request, Response } from "express";
import { loginEndpoint } from "./loginEndPoint";

const app = express();
app.use(express.json());

app.post('/login', loginEndpoint );

export default app;
