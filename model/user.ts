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
    age?: any;
    //_id: ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    gender: 'Male' | 'Female' | 'Other';
    location?: {
        latitude: number;
        longitude: number;
    };
    photos: UserPhoto[];
    bio: string;
    bod: Date

    //MATCH ALGORITHM
    lastLogin?: string; // ISO 8601 date string
    isActive: boolean;
    preferences?: {
        ageRange?: [number, number]; // Tuple representing min and max age
        //interests?: string[]; // List of interests
        distance?: number; // Max distance in kilometers
        genderPreference?: 'Male' | 'Female' | 'Other' | 'Any';
    };
    profileCompleteness?: number; // Profile completeness percentage
    activityLevel?: number; // Activity level percentage

    //TIMESTAMPS
    createdAt: Date;
    updatedAt: Date;
}

export default User;