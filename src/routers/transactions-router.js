import { Router } from "express";
import { validarSchema } from "../middleware/schema-middleware.js";
import { postTransaction } from "../controllers/transactions-controller.js";
import { transactionSchema } from "../schemas/transaction-schema.js";

const transactionsRouter = Router();

transactionsRouter.post("/transactions", validarSchema(transactionSchema), postTransaction)
// receitasRouter.get("/receitas", getReceitas)
// receitasRouter.get("/receitas/:id", getReceitaId);
// receitasRouter.post("/receitas", validarSchema(receitaSchema), postReceita);
// receitasRouter.delete("/receitas/:id", deleteReceita);
// receitasRouter.put("/receitas/:id", validarSchema(receitaSchema), putReceita);

export default transactionsRouter;