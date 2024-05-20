import { ObjectId } from "mongodb";

interface UserPhoto {
    id: number;
    imageUrl: string;
    userId: number;
    active: boolean;
    createdAt: Date;
}

interface Card {
    _id: ObjectId;
    id: number;
    name: string;
    bod: Date;
    age: number;
    bio: string;
    photos: UserPhoto[];
 
    createdAt: Date;
    updatedAt: Date;
}

export default Card