import { NextRequest } from "next/server"
import { db } from "@/lib/db"

export const POST = async (req: NextRequest, { params }: { params: any }) => {
    const huntId = params.id
    const { questions } = await req.json()

    try{
        for(let question of questions){
            const newQuestion = await db.question.create({
                data: {
                    huntId,
                    question: question.text,
                    answer: question.answer
                }
            })
        }

        return new Response(JSON.stringify(questions), { status: 200})
    }catch(err){
        return new Response(JSON.stringify('Could not add questions'), { status: 500})
    }
}