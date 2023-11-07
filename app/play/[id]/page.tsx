"use client";

import { useParams } from "next/navigation";
import PlayUI from "@/components/PlayUI";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
    const params = useParams();
    const huntId = params.id;

    return (
        <PlayUI huntId={huntId as string} />
    )
}

export default page;