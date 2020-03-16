import express, { Request, Response } from "express";
import { loginEndpoint } from "./endpoints/loginEndpoint";
import { signUpEndpoint } from "./endpoints/SignUp";
import { getUserIfo } from "./endpoints/GetUserInfo";

const app = express();
app.use(express.json());

app.post('/login', loginEndpoint )
app.post("/signup", signUpEndpoint)
app.get("/user", getUserIfo)

export default app;
