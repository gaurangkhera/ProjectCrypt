import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const PUT = async (req: NextRequest, { params }: { params: any }) => {
    try{
        const huntId = params.id;
        const { name, description, publicHunt } = await req.json()
        const hunt = await db.hunt.update({
            where: {
                id: huntId
            },
            data: {
                name,
                description,
                public: publicHunt
            }
        })

        return new Response(JSON.stringify(hunt), { status: 200})
        
    }catch(e){
        return new Response('Could not update hunt', {status: 500})
    }
}

export const GET = async (req: NextRequest, { params }: { params: any }) => {
    try{
        const huntId = params.id;
        const hunt = await db.hunt.findFirst({
            where: {
                id: huntId
            }
        })
        return new Response(JSON.stringify(hunt), { status: 200})
    } catch(e){
        return new Response('Could not fetch hunt', {status: 500})
    }
}