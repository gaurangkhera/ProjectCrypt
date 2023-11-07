import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const POST = async(req: NextRequest, { params }: { params: any }) => {
    try{
        const id = params.questionId
        const { userAnswer } = await req.json()

        const question = await db.question.findFirst({
            where: {
                id
            }
        })


        if(question!.answer === userAnswer){
            return new Response(JSON.stringify({ correct: true }), { status: 200})
        } else {
            return new Response(JSON.stringify({ correct: false }), { status: 200})
        }
    }catch(e){
        return new Response(JSON.stringify({ error: 'Could not check answer' }), { status: 500})
    }
}