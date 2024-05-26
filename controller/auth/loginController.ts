import express, { Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import TypedRequestBody from "../../types/TypedRequestBody";

export const loginController = async (req: TypedRequestBody<{ email: string, password: string }>, res: Response) => {
    console.log('LOGIN REQUEST')
    if (!req.body.password || !req.body.email) {
        console.log('ERR')
        res.status(400)
        return
    } else {

        const client = new MongoClient(process.env.MONGO_URI as string, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        try {
            await client.connect();

        } catch {
            res.status(500)
        }
        /* RETURN THIS FROM DATABASE */
        const password = 'zaxona123'


        if (req.body.password == password) {
            const token = jwt.sign({ userId: 123 }, 'your-secret-key', {
                expiresIn: '6m',
            });
            res.status(200).send({ token: token })
        } else {
            res.status(403)
        }

    }
}
export default loginController