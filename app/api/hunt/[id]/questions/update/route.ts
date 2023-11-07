import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: any }) => {
    const { question } = await req.json();
    const huntId = params.id;
    
    try {
        const dbQues = await db.question.findFirst({
            where: {
                id: question.id
            }
        })

        if(!dbQues){
            await db.question.create({
                data: {
                    huntId,
                    question: question.text,
                    answer: question.answer
                }
            })
        } else {
            const db_ques = await db.question.update({
                where: {
                    id: question.id
                },
                data: {
                    question: question.text,
                    answer: question.answer
                }
            })
        }


        return new Response('Question updated successfully', { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('An error occurred while updating the question', { status: 569 });
    }
}