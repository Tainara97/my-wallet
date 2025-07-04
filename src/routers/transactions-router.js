import { Router } from "express";
import { validarSchema } from "../middleware/schema-middleware.js";
import { deleteTransaction, getTransactions, postTransaction, putTransactions } from "../controllers/transactions-controller.js";
import { transactionSchema } from "../schemas/transaction-schema.js";
import { validarToken } from "../middleware/auth-middleware.js";

const transactionsRouter = Router();

transactionsRouter.use(validarToken);

transactionsRouter.post("/transactions", validarSchema(transactionSchema), postTransaction);
transactionsRouter.get("/transactions", getTransactions);
transactionsRouter.put("/transactions/:id", validarSchema(transactionSchema), putTransactions);
transactionsRouter.delete("/transactions/:id", deleteTransaction);


export default transactionsRouter;