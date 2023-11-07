import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const DELETE = async(req: NextRequest, { params }: { params: any }) => {
    try{
        const id = params.id

        const questions = await db.question.deleteMany({
            where: {
                huntId: id
            }
        })

        const hunt = await db.hunt.delete({
            where: {
                id
            }
        })

        return new Response(JSON.stringify({ success: true }), { status: 200})
    }catch(e){
        console.log(e)
        return new Response(JSON.stringify({error: e}), { status: 500 })
    }
}