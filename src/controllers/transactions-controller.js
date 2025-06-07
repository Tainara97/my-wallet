import { ObjectId } from "mongodb";
import { db } from "../config/database.js";
import jwt from "jsonwebtoken";

export async function postTransaction(req, res) {
    const transaction = req.body;
    const user = res.locals.user;

        try {
            await db.collection("transactions").insertOne({
                ...transaction,
                userId: user._id,
                createdAt: new Date()
            });
            res.sendStatus(201)
        }
        catch (err) {
            res.status(500).send(err.message)
        }
};

export async function getTransactions(req, res) {
    const page = req.query.page || 1;
    const limit = 10;
    const start = (page - 1) * limit;

    if (pagina <= 0) return res.sendStatus(400);

    try {
        const transactions = await db.collection("transactions")
        .find()
        .skip(start)
        .limit(limit)
        .toArray();
        return res.send(transactions)
    } catch (error) {
        return res.status(500).send(error.message)
    }
};