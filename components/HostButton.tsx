'use client';
import { Dialog, DialogContent, DialogTrigger, DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { Input } from "./ui/input";
import axios from "axios";
import { Checkbox } from "./ui/checkbox";
import { useSession } from "next-auth/react";

const CreateButton = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [publicHunt, setPublic] = useState(false);
    const { data: session } = useSession();

    const handleSubmit = async () => {

        const huntData = {
            "title": title,
            "desc": description,
            "public": publicHunt,
            "creator": session?.user.id
        };

        await axios.post('/api/hunt/new', huntData);
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
                <Button onClick={() => handleSubmit()} className="mt-4">Proceed {' -> '}</Button>
            </DialogContent>
        </Dialog>
    )
}

export default CreateButton