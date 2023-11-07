"use client";

import { Metadata } from "next";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { useState } from "react";
import CreateButton from "./HostButton";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

type Hunt = {
  id: string;
  name: string;
  public: boolean;
  createdAt: string;
};

export default function Dashboard() {
  const { data: session } = useSession();
  const [hunts, setHunts] = useState<Hunt[]>([]);

  useEffect(() => {
    if (session) {
      const fetchHunts = async () => {
        const res = await fetch(`/api/hunt/userHunts/${session.user.id}`, {
          headers: {
            "x-dashboard-request": "true"
          }
        });
        setHunts(await res.json());
      };
      fetchHunts();
    }
  }, [session, hunts]);

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b  pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-3xl heading">Hunts</h1>

        <CreateButton />
      </div>
      {hunts && hunts.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hunts
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((hunt) => (
              <li
                key={hunt.id}
                className="col-span-1 rounded-lg border shadow transition hover:shadow-lg"
              >
                <Link href={`/dashboard/hunt/${hunt.id}`}>
                <div className="pt-6 px-6 flex w-full items-center justify between space-x-6">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-lg font-medium">
                        {hunt.name}
                      </h3>
                    </div>
                  </div>
                </div></Link>

                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(hunt.createdAt), "MMM yyyy")}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      ) : null}
    </main>
  );
}
