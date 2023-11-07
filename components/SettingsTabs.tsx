import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Skeleton from "react-loading-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Plus, Edit2 } from "lucide-react";

interface Question {
  id: string;
  text: string;
  answer: string;
}

export function SettingsTabs({ huntId }: { huntId: string }) {
  const [huntName, setHuntName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [huntDesc, setHuntDesc] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [publicHunt, setPublic] = useState<boolean>(false);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([{ id: "" ,text: "", answer: "" }]);
  const [saving, isSaving] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHuntName(e.target.value);
    setChangesMade(true);
  };

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHuntDesc(e.target.value);
    setChangesMade(true);
  };

  const handleVisibilityChange = () => {
    setPublic((prevPublic) => !prevPublic);
    setChangesMade(true);
  };

  const addQuestion = async (newQuestion: Question) => {
    isSaving(true);
    const questionExists = questions.some(question => question.id === newQuestion.id);
  
    if (questionExists) {
      const res: AxiosResponse = await axios.post(`/api/hunt/${huntId}/questions/update`, {
        question: newQuestion
      });
    } else {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        newQuestion,
      ]);
    }

    isSaving(false);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
    setChangesMade(true);
  }
  
  const handleAnswerChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
    setChangesMade(true);
  }
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setChangesMade(true);
  }

  const saveQuestions = async () => {
    for (const question of questions) {
      await addQuestion(question);
    }
  };

  useEffect(() => {
    const fetchHunt = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/hunt/${huntId}`);
      const data = await res.json();
      const questions = await fetch(`/api/hunt/${huntId}/questions`);
      const ques_data = await questions.json();
      console.log(ques_data);
      setHuntName(data.name);
      setHuntDesc(data.description);
      setPublic(data.public);
      if (ques_data.length > 0) {
        setQuestions(
          ques_data.map((question: any) => ({
            id: question.id,
            text: question.question,
            answer: question.answer,
          }))
        );
      }
      setIsLoading(false);
    };

    fetchHunt();
  });

  const saveChanges = async () => {
    setSubmitting(true);
    console.log(submitting);
    const res: AxiosResponse = await axios.put(`/api/hunt/${huntId}`, {
      name: huntName,
      description: huntDesc,
      publicHunt: publicHunt,
    });
    setSubmitting(false);
  };

  if (isLoading) {
    return <Skeleton height={100} count={5} />;
  }

  return (
    <Tabs defaultValue="content">
      <TabsList className="mx-auto">
        <TabsTrigger value="content">Details</TabsTrigger>
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>
              Adjust your hunt&apos;s details here. Save changes when done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input
                id="setting1"
                value={huntName}
                placeholder="Hunt name"
                onChange={(e) => handleNameChange(e)}
              />
            </div>
            <div className="space-y-1">
              <Textarea
                className="resize-none"
                value={huntDesc}
                placeholder="Hunt description"
                onChange={(e) => handleDescChange(e)}
              ></Textarea>
            </div>
            <div className="space-y-1">
              <Checkbox
                checked={publicHunt}
                onCheckedChange={() => handleVisibilityChange()}
                className="mt-4"
              />{" "}
              <span className="mt-3">Make this hunt public</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled={!changesMade || submitting} onClick={saveChanges}>
              {submitting ? (
                <>
                  <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />{" "}
                  Saving
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="questions" className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>
              Manage your questions. Save to update.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div key={index} className="space-y-1">
                  
                  <div className="flex flex-row gap-1.5"><label htmlFor={`question${index}`}>
                    Question {index + 1}
                  </label><Edit2 className="w-5 h-5" onClick={() => setIsEditing(index)} /></div>
                  <Input
                    id={`question${index}`}
                    disabled={isEditing !== index}
                    value={question.text}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                  />
                  <label htmlFor={`answer${index}`}>Answer {index + 1}</label>
                  <Input
                    id={`answer${index}`}
                    disabled={isEditing !== index}
                    value={question.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </div>
              ))
            ) : (
              <p>No questions yet.</p>
            )}
           <Button className="mt-4" onClick={() => addQuestion({ id: '', text: '', answer: '' })}>
  <Plus className="inline-block mr-2" /> Add question
</Button>
          </CardContent>
          <CardFooter>
            <Button className="gap-1.5" disabled={!changesMade || saving} onClick={saveQuestions}>
              { saving ? (
                <>
                 <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />{" "}
                  Saving
                </>
              ) : (
                "Save questions"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="leaderboard" className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>
              Leaderboard settings can be updated here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Your leaderboard settings logic/components go here */}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
