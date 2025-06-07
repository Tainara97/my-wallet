import { ObjectId } from "mongodb";
import { db } from "../config/database.js";
import jwt from "jsonwebtoken";

export async function postTransaction(req, res) {
    const transaction = req.body;
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(401);

    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await db.collection("users").findOne({
                _id: new ObjectId(decoded.userId)
            });

            if (!user) return res.sendStatus(401);

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