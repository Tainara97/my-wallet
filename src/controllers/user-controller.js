import bcrypt from "bcrypt";
import { db } from "../config/database.js"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { userLoginSchema, userSchema } from "../schemas/user-schema.js";
dotenv.config();

export async function signUp(req, res) {
    const usuario = req.body;

    const validação = userSchema.validate(usuario, { abortEarly: false })
    if (validação.error) {
        const mensagem = validação.error.details.map(detail => detail.message);
        return res.status(422).send(mensagem)
    }

    try {
        const userExistente = await db.collection("users").findOne({ name: usuario.name });
        if (userExistente) {
            return res.status(409).send("Usuário já cadastrado!")
        }
        await db.collection("users").insertOne({
            ...usuario,
            password: bcrypt.hashSync(usuario.password, 10)
        });
        return res.status(201).send("Registro feito com sucesso!")
    } catch (error) {
        return res.status(500).send(error.message)
    }
};

export async function signIn(req, res) {
    const usuario = req.body;

    const validacao = userLoginSchema.validate(usuario, { abortEarly: false });
    if (validacao.error) {
        return res.status(422).send(validacao.error.details.map(d => d.message));
    }

    try {
        const usuarioCadastrado = await db.collection("users").findOne({
            email: usuario.email,
        });

        if (!usuarioCadastrado) {
            return res.status(404).send("Usuário não cadastrado!");
        }

        const senhaConfere = bcrypt.compareSync(usuario.password, usuarioCadastrado.password);
        if (senhaConfere) {

            const token = jwt.sign(
                { userId: usuarioCadastrado._id },
                process.env.JWT_SECRET,
                { expiresIn: 86400 }
            );

            return res.status(200).send(token);
        }

        return res.status(401).send("Usuário e senha incompatíveis!");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}