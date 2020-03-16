import express, { Request, Response } from "express";
import { signUpEndpoint } from "./endpoints/SignUp";

const app = express();
app.use(express.json());

app.post("/signup", signUpEndpoint)

export default app;
