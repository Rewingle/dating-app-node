interface UserPhoto {
    id: number;
    imageUrl: string;
    userId: number;
    active: boolean;
    createdAt: Date;
}

export default interface RegisterUser {
    //CREDENTIALS
    name: string;
    email: string;
    passwordHash: string;
    gender: 'Male' | 'Female' | 'Other';
   
    photos: UserPhoto[];
    bio: string;
    bod: Date
    genderPreference: 'Male' | 'Female' | 'Any';
    //TIMESTAMPS
/*     createdAt: Date;
    updatedAt: Date; */
}