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
import Skeleton from 'react-loading-skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";
import { useEffect } from "react";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox";

export function SettingsTabs({ huntId }: { huntId: string}) {

  const [huntName, setHuntName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [huntDesc, setHuntDesc] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [publicHunt, setPublic] = useState(false);

  useEffect(() => {
    const fetchHunt = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/hunt/${huntId}`)
      const data = await res.json()
      setHuntName(data.name)
      setHuntDesc(data.description)
      setPublic(data.public)
      setIsLoading(false)
    }

    fetchHunt()
  }, [])

  const saveChanges = async () => {
    setSubmitting(true);
    console.log(submitting)
      const res = await axios.put(`/api/hunt/${huntId}`, {
        name: huntName,
        description: huntDesc,
        publicHunt: publicHunt
      })
      setSubmitting(false);
  }

  if(isLoading){
    return (
      <Skeleton height={100} count={5} />
    )
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
              Adjust your hunt's details here. Save changes when done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input id="setting1" value={huntName} placeholder="Hunt name" onChange={(e) => setHuntName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Textarea className="resize-none" value={huntDesc} placeholder="Hunt description" onChange={(e) => setHuntDesc(e.target.value)}></Textarea>
            </div>
            <div className="space-y-1">
              <Checkbox checked={publicHunt} onCheckedChange={() => setPublic(prevPublic => !prevPublic)} className="mt-4" /> <span className="mt-3">Make this hunt public</span>
            </div>
          </CardContent>
          <CardFooter><Skeleton height={100} count={5} />
          <Button disabled={submitting} onClick={saveChanges}>
  {submitting ? (
    <>
      <Loader2 className="inline-block mr-2 animate-spin" /> Saving
    </>
  ) : (
    'Save changes'
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
            {/* Your questions management logic/components go here */}
          </CardContent>
          <CardFooter>
            <Button>Save questions</Button>
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