import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/auth-router.js";
import transactionsRouter from "./routers/transactions-router.js";
dotenv.config(); 

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(transactionsRouter);

const porta = process.env.PORT
app.listen(porta, () => {
    console.log(`rodando na porta ${porta}`)
});


