import { Router } from "express";

import { signIn, signUp } from "../controllers/user-controller.js";
import { userLoginSchema, userSchema } from "../schemas/user-schema.js";
import { validarSchema } from "../middleware/schema-middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validarSchema(userSchema), signUp);
authRouter.post("/sign-in", validarSchema(userLoginSchema), signIn);

export default authRouter;