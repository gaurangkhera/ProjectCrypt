import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest, {params}: {params:any}) => {
    try{
        const creator = params.id;
        const userHunts = await db.hunt.findMany({
            where: {
                creatorId: creator
            }
        })
        return new Response(JSON.stringify(userHunts), { status: 200})
    } catch(e){
        return new Response('Could not fetch posts for user', {status: 500})
    }
}