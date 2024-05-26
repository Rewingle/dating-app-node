import { Request, Response } from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import User from '../model/user';
import dotenv from 'dotenv';
import Card from '../model/card';

dotenv.config();
const uri = process.env.MONGODB_URI as string;

export async function matchController(req: Request, res: Response) {

    const { from, to } = req.body;

    console.log('Request to matchController')
    const client = new MongoClient(process.env.MONGO_URI as string, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        console.log('tryin to connect')
        await client.connect();

        await findUsers(parseInt(from), parseInt(to));

    } catch (error) {
        console.log('ERORRRRR')
        console.log('catch an error ', error)
        res.status(500).send;
    } finally {
        console.log('finally')
        await client.close();
        res.status(200);
    }

    async function findUsers(from?: number, to?: number) {
        const users = client.db('dating-app').collection('Users');
        console.log(users)
        try {

            if (from && to && from < to) {
                const result = await users.find({}).project({ password: 0, email: 0 }).sort({ _id: 1 }).skip(from).limit(to - from).toArray() as User[];

                res.send(result);
                return
            } else {

                const result = await users.find({}).project({ password: 0, email: 0 }).sort({ _id: 1 }).toArray() as User[];
                /*    result.forEach(user => {
                       const age = calculateAge(user.bod);
                       
                       console.log(age)
                   }); */
                result.map(i => i.age = calculateAge(i.bod));
                console.log(result)
                res.send(result);
                return
            }
        } catch (error) {
            console.log('catch an error ', error)
            res.status(500).send;
        }

    }
    function convertUserToCard(user: User[]) {
        return user.map(
            obj => obj.age = calculateAge(obj.bod)
        )
    }
    /*    function modifyKeys(obj: User[]){
           Object.keys(obj).forEach(key => {
               obj[`_${key}`] = obj[key];
               delete obj[key];
               if(typeof obj[`_${key}`] === "object"){
                   modifyKeys(obj[`_${key}`]);
               }
           });
       } */
    function calculateAge(birthDate: Date): number {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }
}
export default matchController;