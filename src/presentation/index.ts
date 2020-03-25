import express, { Request, Response } from "express";
import { loginEndpoint } from "./endpoints/user/loginEndpoint";
import { signUpEndpoint } from "./endpoints/user/SignUp";
import { getUserIfo } from "./endpoints/user/GetUserInfo";
import { followUser } from "./endpoints/user/FollowUser";
import { createRecipeEndpoint } from "./endpoints/recipes/CreateRecipeEndpoint"
import { getRecipesFeed } from "./endpoints/recipes/GetRecipesFeed";
import { updatePassword } from "./endpoints/user/UpdatePassword";
import { updateInfos } from "./endpoints/user/UpdateInfos";
import { forgotPassword } from "./endpoints/user/ForgotPassword";


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
app.post("/user/forgot/password", forgotPassword)

export default app;

/*
    RESPOSTA DESAFIOS

    1) 
        a) Foi bem dificil, o banco de dados recusou inserir na tabela a data de aniversário
        após algumas pesquisas encontramos a solução. E no código tivemos que mudar entidade, usecase
        e UserDB, acabou que afetou outras funcionalidades e tivemos que arrumar elas também.

        b) É afetado já que a entidade de User é a mesma, tendo que passar esses dados no DB também.

    3)
        a) No nosso caso não atrapalhou em nada já que não usamos o e-mail para controle de
        autenticação e sim o id do usuário.

    4)
        a) Nós pensamos em utilizar o token JWT para esse controle, mas ao meu ver não parece bem uma
        forma segura de fazer esse controle já que o no front o token fica armazenado no navegador
        e o usuário consegue ter acesso a ele. Então fizemos uma tabela que guarda o log da última
        vez que o usuário trocou de senha (esse log também armazena os dados do usuário na primeira
        vez que ele cria a conta). Mas aqui vai uma dúvida que se possível gostaria que respondesse
        na correção, essa forma que fizemos é correta ou existe algo mais seguro? pode ser custoso
        com o banco de dados fazer esse controle dessa forma?

        b) tentamos usar o moment, mas não conseguimos achar uma forma boa de usar, então deixamos
        para usar o timestamp do Date e usamos o moment somente para deixar o log com uma informação
        mais legível que o timestamp.

    5) 
        a) nós usamos a bibliteca chamada nodemailer para o envio do e-mail.

        b) usamos a biblioteca generate-password que já possui a função de gerar uma boa senha
        para o usuário de forma prática.

        c) Não parece uma boa solução, pois pode ocorrer do usuário criar uma conta no nosso
        sistema com um e-mail que não existe, facilitando quem alguém consiga criar esse e-mail
        e utilizar da funcionalidade "Esqueci a senha" para hackear a conta. No tempo do orkut
        esse era o principal motivo que muitas pessoas eram hackeadas. Uma das formas de lidar 
        com esse problema seria criar uma autenticação em que no momento que o usuário se cadastrar
        ele ter que abrir o e-mail para confirmar o cadastro, evitando o uso de e-mails que
        não existem.
*/


