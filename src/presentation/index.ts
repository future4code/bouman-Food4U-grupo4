import express, { Request, Response } from "express";
import { loginEndpoint } from "./endpoints/user/loginEndpoint";
import { signUpEndpoint } from "./endpoints/user/SignUp";
import { getUserIfo } from "./endpoints/user/GetUserInfo";

const app = express();
app.use(express.json());

app.post('/login', loginEndpoint )
app.post("/signup", signUpEndpoint)
app.get("/user", getUserIfo)

export default app;
