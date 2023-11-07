'use client';
import { Dialog, DialogContent, DialogTrigger, DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { Input } from "./ui/input";
import axios from "axios";
import { Checkbox } from "./ui/checkbox";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const CreateButton = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [publicHunt, setPublic] = useState(false);
    const [submitting, isSubmitting] = useState(false);
    const { data: session } = useSession();

    const handleSubmit = async () => {
        if (title.trim() === '' || description.trim() === '') {
            alert('Please fill out all fields.');
            return;
        }
        isSubmitting(true);

        const huntData = {
            "title": title,
            "desc": description,
            "public": publicHunt,
            "creator": session?.user.id
        };

        const res = await axios.post('/api/hunt/new', huntData);
        const huntId = res.data.huntId;
        router.push(`/dashboard/hunt/${huntId}`);
       isSubmitting(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'lg'} className='gap-1.5'>Host Hunt</Button>
            </DialogTrigger>

            <DialogContent className="text-left">
                <DialogHeader className="font-semibold">Paraphrase Text</DialogHeader>
                <Input value={title} onChange={(e) => { setTitle(e.target.value) }} className="w-full mt-4" placeholder="Hunt name" />
                <Textarea cols={2} value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Hunt description" className="w-full mt-4" rows={4} />
                <div className="flex flex-row gap-1.5">
                <Checkbox onCheckedChange={() => setPublic(prevPublic => !prevPublic)} className="mt-4" /> <span className="mt-3">Make this hunt public</span>
                </div>
                <Button disabled={submitting} onClick={() => handleSubmit()} className="mt-4 gap-1.5">
                { submitting ? 
                        <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Creating
                        </>
                    : 
                        <>Proceed {"->"}</>
                    }
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default CreateButton