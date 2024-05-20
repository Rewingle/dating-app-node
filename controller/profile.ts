import { Request, Response } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
//import { User } from '../models/User';

export const getUserProfile = async (req: Request, res: Response) => {
    const { from, to } = req.body;

    console.log('Request to matchController')
    const client = new MongoClient('mongodb+srv://user:kestane32@cluster0.qhgkn77.mongodb.net/dating-app?retryWrites=true&w=majority', {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        console.log('tryin to connect')
        await client.connect();

        await getProfile();

    } catch (error) {
        console.log('catch an error ', error)
        res.status(500).send;
    } finally {
        await client.close();
        res.status(200).send;
    }

    async function getProfile(from?: number, to?: number) {

        const users = client.db('dating-app').collection('Users');
        try {
            const profile = await users.findOne({})
            res.status(200).send(profile);
        }        
        catch (error) {
            console.log('catch an error ', error)
            res.status(500).send;
        }
            

    }
};