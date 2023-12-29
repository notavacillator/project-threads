'use server'

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function updateUser(
    userId : String,
    username : String,
    name : String,
    bio : String,
    image : String, 
    path : String,
    ) : Promise<void> {

    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id : userId },
            {
                username : username.toLowerCase(),
                name, 
                bio, 
                image, 
                path,
                onboarded : true,
            }, 
            { upsert : true }
        );
    
    
        // LOOK : string and String wrapper conflict 
        if(path === '/profile/edit') {
            revalidatePath(path.toString());
        }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error(`Failed to create and update user : ${error.message}`);
        }
    }
}