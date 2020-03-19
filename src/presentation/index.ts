import express, { Request, Response } from "express";
import { loginEndpoint } from "./endpoints/user/loginEndpoint";
import { signUpEndpoint } from "./endpoints/user/SignUp";
import { getUserIfo } from "./endpoints/user/GetUserInfo";
import { followUser } from "./endpoints/user/FollowUser";
import { createRecipeEndpoint } from "./endpoints/recipes/CreateRecipeEndpoint"
import { getRecipesFeed } from "./endpoints/recipes/GetRecipesFeed";
import { updatePassword } from "./endpoints/user/UpdatePassword";
import { updateInfos } from "./endpoints/user/UpdateInfos";


const app = express();
app.use(express.json());

app.post('/login', loginEndpoint )
app.post("/signup", signUpEndpoint)
app.get("/user", getUserIfo)
app.post("/user/follow", followUser)
app.post("/recipe", createRecipeEndpoint)
app.get("/user/feed", getRecipesFeed)
app.post("/user/update/password", updatePassword)
app.post("/user/update/infos", updateInfos)

export default app;

/*
    RESPOSTA DESAFIOS

    1) 
        a) Foi bem dificil, o banco de dados recusou inserir na tabela a data de aniversário
        após algumas pesquisas encontramos a solução. E no código tivemos que mudar entidade, usecase
        e UserDB, acabou que afetou outras funcionalidades e tivemos que arrumar elas também.

        b) É afetado já que a entidade de User é a mesma, tendo que passar esses dados no DB também.
*/