"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

const PlayUI = ({ huntId }: { huntId: string }) => {
    const router = useRouter()
    const [hunt, setHunt] = useState<Hunt | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchHunt = async () => {
            const res = await axios.get(`/api/hunt/${huntId}`);
            const data = await res.data;
            
            const ques = await axios.get(`/api/hunt/${huntId}/questions`)
            setQuestions(ques.data)

            if(data){
                setHunt(data)
                setIsLoading(false);
            }
        }

        fetchHunt()
    }, [huntId])

    const checkAnswer = async () => {
        setHasSubmitted(true);
        const questionId = questions[currentQuestionIndex].id;
        const res = await axios.post(`/api/hunt/${huntId}/questions/${questionId}/check-answer`, {
            userAnswer
        });
        const data = await res.data;

        if (data.correct) {
            setIsCorrect(true);
            setUserAnswer("");

            if (currentQuestionIndex === questions.length - 1) {
                setIsFinished(true); // set isFinished to true if it's the last question
            } else {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        } else {
            setIsCorrect(false);
        }
        
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if(isFinished){
        return (
            <div className="text-center  mt-56">
                <h3 className="font-bold text-4xl">Congratulations!</h3>
                <p>You just completed {hunt?.name}.</p>
            </div>
        )
    }

    if (!hunt) {
        return <p>No hunt data available</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center mt-56">
            <h1 className="text-2xl font-bold mb-4">{hunt.name}</h1>
            <div className="w-full max-w-md">
                <p className="text-lg font-bold mb-4">{questions[currentQuestionIndex].question}</p>
                <Input 
                    type="text" 
                    value={userAnswer} 
                    onChange={(e) => setUserAnswer(e.target.value)} 
                    className="w-full mb-4 p-2"
                    placeholder="Enter your answer here"
                />
                <Button onClick={checkAnswer} className="w-full">Submit Answer</Button>
                {isCorrect === false && hasSubmitted && <p className="mt-4 text-red-500">Incorrect answer. Please try again.</p>}
            </div>
        </div>
    )
}

export default PlayUI