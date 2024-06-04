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

        const data = req.body

        const client = new MongoClient(process.env.MONGO_URI as string, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        try {
            await client.connect();
            const collection = client.db('dating-app').collection('Users');

            const isEmailExist = await collection.findOne({ email: data.email }).then(
                async (resp) => {
                    console.log(resp)
                    res.status(200)
                    return
                }
            ).catch(err => {
                console.log(err);
                res.status(500)
                return
            }
            )

        } catch {
            res.status(500)
        } finally{
            await client.close().then(()=>console.log('CLOSED'))
        }
        /* RETURN THIS FROM DATABASE */
        const password = 'zaxona123'


/*         if (req.body.password == password) {
            const token = jwt.sign({ userId: 123 }, 'your-secret-key', {
                expiresIn: '6m',
            });
            res.status(200).send({ token: token })
        } else {
            res.status(403)
        } */

    }
}
export default loginController