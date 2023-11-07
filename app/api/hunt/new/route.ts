import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const POST = async (req: NextRequest) => {
    const data = await req.json()

    try{
        const newHunt = await db.hunt.create({
            data: {
                name: data.title as string,
                description: data.desc as string,
                public: data.public as boolean,
                creatorId: data.creator as string,
            }
        })
    
        console.log(newHunt)
        
        return new Response(JSON.stringify({ success: true }))
    }catch(e){
        console.log(e)
        return new Response(JSON.stringify({ success: false, error: e}))
    }

}