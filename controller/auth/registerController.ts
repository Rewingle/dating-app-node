import { Request, Response } from "express"
import TypedRequestBody from "../../types/TypedRequestBody"
import { Collection, MongoClient, ServerApiVersion } from "mongodb"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import User from "../../model/user"
import RegisterUser from "../../model/registerUser"


export const registerController = async (req: TypedRequestBody<RegisterUser>, res: Response) => {

    if (!req.body) {
        res.status(400)
        return
    }
    const data = req.body

    const client = new MongoClient(process.env.MONGO_URI as string, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    console.log(data)
    try {
        await client.connect().then(() => {
            const collection = client.db('dating-app').collection('Users');
            collection.insertOne(convertToUser(data)).then(resp => {
                console.log(resp);
                res.status(200).send(resp);
            }).catch(err => {
                console.log(err);
                res.status(500).send(err)
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        });


        console.log('connection')
    } catch {
        res.status(500)
    } finally {
        console.log('finally')
        await client.close();
        res.status(200);

    }
}
const convertToUser = (data: RegisterUser) => {



    var dateNow = new Date(Date.now())
    const hashedPassword = hashPassword(data.passwordHash, 8)
    console.log(hashedPassword)
    if (!hashedPassword) {
        throw new Error('Password Hash Error')
    }
    const user: User = {
        "name": data.name,
        "email": data.email,
        "passwordHash": hashedPassword,
        "gender": data.gender,
        "location": {
            "latitude": 40.7128,
            "longitude": -74.0060
        },
        "photos": data.photos,
        "bio": data.bio,
        "bod": data.bod,
        //"lastLogin": "2024-05-23T11:00:00Z",
        "isActive": false,
        "preferences": {
            "ageRange": [18, 99],
            //"interests": ["music", "sports"],
            "distance": 500,
            "genderPreference": data.genderPreference
        },
        "profileCompleteness": data.photos.length >= 5 ? 100 : 50 + data.photos.length * 10,
        "activityLevel": 50,
        "createdAt": dateNow,
        "updatedAt": dateNow
    };

    return user;
}

const hashPassword = (password: string, saltRounds: number): any => {
    bcrypt.genSalt(saltRounds, (err: any, salt: any) => {
        if (err) {
            throw new Error('Error in password salt')
        }
        bcrypt.hash(password, salt, (err: any, hash: any) => {
            if (err) {
                return new Error('Error with hashing')
            }
            return hash as string
        })
    })
}