"use server"

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { bikes } from "@/db/schema";

export const createBikeEntry = async (state:any, form:{
    name: string;
    image: string;
    description: string;
    type: string;
    price: number;
    quantity: number;
    rating: string;
}) => {
    const session = await auth();
    if (!session) return parseServerActionResponse({ status: "ERROR", errors: "Not authenticated" })

    console.log('form', form)
    const {name, image, description, type, price, quantity, rating} = form;

    try {
        const result = await db.insert(bikes).values({
            name,
            image,
            description,
            type,
            price,
            quantity,
            rating,
        }).returning({
            id: bikes.id,
        })

        return parseServerActionResponse({ status: "SUCCESS", ...result, error:"" })
    } catch (error) {
        console.error(error)
        return parseServerActionResponse({ status: "ERROR", errors: "An unexpected error occurred" })
    }

}

export const updateBikeEntry = async (id:number, form:{
    name: string;
    image: string;
    description: string;
    type: string;
    price: number;
    quantity: number;
    rating: string;
}) => {
    const session = await auth();
    if (!session) return parseServerActionResponse({ status: "ERROR", errors: "Not authenticated" })
    console.log('form', form)
    const {name, image, description, type, price, quantity, rating} = form;

    try {
        const result = await db
            .update(bikes)
            .set({
                ...(name && { name }),
                ...(image && { image }),
                ...(description && { description }),
                ...(type && { type }),
                ...(price !== undefined && { price }),
                ...(quantity !== undefined && { quantity }),
                ...(rating && { rating }),
            })
            .where(eq(bikes.id, id))
            .returning({
                id: bikes.id,
            });

        return parseServerActionResponse({ status: "SUCCESS", ...result, error:"" })
    } catch (error) {
        console.error(error)
        return parseServerActionResponse({ status: "ERROR", errors: "An unexpected error occurred" })
    }
}

export const deleteBikeEntry = async (id: number) => {
    try {
        const result = await db
            .delete(bikes)
            .where(eq(bikes.id, id))

        return { status: "SUCCESS" };
    } catch (error) {
        console.error("Error deleting bike entry:", error);
        return { status: "ERROR", error: "An unexpected error occurred" };
    }
};