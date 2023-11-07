"use client";

import { Dialog, DialogContent, DialogTrigger, DialogHeader } from "./ui/dialog"
import { Button } from "./ui/button"
import { useState } from "react"
import { Input } from "./ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const DeleteHuntButton = ({ huntId, huntName }: { huntId: string, huntName: string }) => {
    const router = useRouter();
    const [confirmName, setConfirmName] = useState('');
    const [submitting, isSubmitting] = useState(false);

    const handleDelete = async () => {
        if (confirmName.trim() !== huntName) {
            alert('Please enter the correct hunt name to confirm deletion.');
            return;
        }

        isSubmitting(true);

        try {
            await axios.delete(`/api/hunt/${huntId}/delete`);
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
        } finally {
            isSubmitting(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'destructive'} className='gap-1.5'>Delete Hunt</Button>
            </DialogTrigger>

            <DialogContent className="text-left">
                <DialogHeader className="font-semibold">Confirm Deletion</DialogHeader>
                <Input value={confirmName} onChange={(e) => { setConfirmName(e.target.value) }} className="w-full mt-4" placeholder="Enter hunt name to confirm deletion" />
                <Button disabled={submitting} onClick={handleDelete} className="mt-4 gap-1.5">
                    { submitting ? 
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Deleting
                        </>
                        : 
                        <>Proceed {"->"}</>
                    }
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteHuntButton;