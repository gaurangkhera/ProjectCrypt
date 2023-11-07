import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
    try{
        const huntId = params.id;
        const questions = await db.question.findMany({
            where: {
                huntId
            },
        })
        if(req.headers.get('referer')?.includes('dashboard')){
            return new Response(JSON.stringify(questions), { status: 200})
        } else {
            const questionsWithoutAnswers = questions.map(({ answer, ...questionWithoutAnswer }) => questionWithoutAnswer);
            return new Response(JSON.stringify(questionsWithoutAnswers), { status: 200})
        }
    } catch(e){
        return new Response('Could not fetch questions', {status: 500})
    }
}