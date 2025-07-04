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

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});


