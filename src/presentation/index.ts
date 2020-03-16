import express, { Request, Response } from "express";
import { loginEndpoint } from "./loginEndPoint";
import { signUpEndpoint } from "./endpoints/SignUp";

const app = express();
app.use(express.json());

app.post('/login', loginEndpoint );
app.post("/signup", signUpEndpoint)

export default app;
