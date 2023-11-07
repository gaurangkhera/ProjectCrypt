"use client";

import { useParams } from "next/navigation";
import PlayUI from "@/components/PlayUI";

const Page = () => {
    const params = useParams();
    const huntId = params.id;

    return (
        <PlayUI huntId={huntId as string} />
    )
}

export default Page;