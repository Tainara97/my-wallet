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

    if (page <= 0) return res.sendStatus(400);

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

export async function putTransactions(req, res) {
    const { id } = req.params;
    const transaction = req.body;
    const userId = res.locals.user._id;

    try {
        const existingTransaction = await db.collection("transactions").findOne({
            _id: new ObjectId(id),
            userId: userId
        });

        if (!existingTransaction) {
            return res.status(401).send("Não autorizado ou transação não encontrada");
        }
        await db.collection("transactions").updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                value: transaction.value,
                description: transaction.description,
                type: transaction.type
            }
        })

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function deleteTransaction (req, res)  {
    const { id } = req.params;
    const userId = res.locals.user._id;

    try {

        const existingTransaction = await db.collection("transactions").findOne({
            _id: new ObjectId(id),
            userId: userId
        });

        if (!existingTransaction) {
            return res.status(401).send("Não autorizado ou transação não encontrada");
        }

        await db.collection("transactions").deleteOne({
            _id: new ObjectId(id)
        })
        
        return res.sendStatus(204);


    } catch (err) {
        res.status(500).send(err.message)
    }

};