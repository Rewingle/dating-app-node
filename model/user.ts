// user.ts
import { ObjectId } from "mongodb";

interface UserPhoto {
    id: number;
    imageUrl: string;
    userId: number;
    active: boolean;
    createdAt: Date;
}


interface User {
    age: any;
    _id: ObjectId;
    id: number;
    name: string;
    bod: Date;
    bio: string;
    photos: UserPhoto[];
 
    createdAt: Date;
    updatedAt: Date;
}

export default User;