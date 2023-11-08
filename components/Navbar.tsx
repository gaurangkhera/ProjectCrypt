"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { ArrowRight, User } from "lucide-react";import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback } from "./ui/avatar"
import Skeleton from "react-loading-skeleton";

interface Provider {
  id: string;
  name: string;
}

// Skeleton Loader Component for UserAccountNav
function UserAccountNavSkeleton() {
	return (
	  <div className="rounded-full h-8 w-8 aspect-square bg-slate-400">
		<Skeleton circle={true} height={32} width={32} />
	  </div>
	);
  }
  
  // Skeleton Loader Component for GetStarted button
  function GetStartedSkeleton() {
	return (
	  <Button type="button" className="gap-1.5">
		<Skeleton height={20} width={100} />
	  </Button>
	);
  }

const UserAccountNav = ({ imageUrl, email, name }: { imageUrl: string, email: string, name: string}) => {
	return (
		<DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
                    <Avatar className="h-8 w-8">
                        {imageUrl ? (
                            <div className="relative aspect-square w-8 h-8">
                                <Image height={32} width={32} src={imageUrl} alt="profile picture" referrerPolicy="no-referrer" />
                            </div>
                        ) : (
                            <AvatarFallback>
                                <span className="sr-only">{name}</span>
                                <User className="h-4 w-4 text-zinc-900" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                            <div className="flex items-center justify-start gap-2 p-2">
                                <div className="flex flex-col space-y-0.5 leading-none">
                                    {name && <p className="font-medium text-sm">{name}</p>}
                                    {email && <p className="w-[200px] truncate text-xs text-zinc-300">{email}</p>}
                                </div>
                            </div>

            <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                        <Link href={'/dashboard'}>Dashboard</Link>
                </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
					<Link href={'/dashboard'} onClick={() => signOut()}>Sign out</Link>
					</DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
	)
}

const Navbar = () => {
	const { data: session, status } = useSession();
	const [providers, setProviders] = useState<Record<string, Provider> | null>(null);
  
	useEffect(() => {
	  const fetchProviders = async () => {
		const res = await getProviders();
		if(!session){
		  setProviders(res);
		}
	  };
	  fetchProviders();
	}, []);
	
	return (
	  <nav className="sticky -14 inset-x-0 top-0 z-30 w-full backdrop-blur-lg transition-all">
		<MaxWidthWrapper>
		  <div className="flex h-14 items-center justify-between border-zinc-200">
			<Link href="/" className="flex z-40 font-semibold">
			  <span className="text-xl">Project Crypt</span>
			</Link>
	
			<div className="hidden items-center space-x-4 sm:flex">
			  <Link href="/about" className={buttonVariants({ variant: "ghost" })}>
				About
			  </Link>
			  {status === "loading" ? (
				<UserAccountNavSkeleton />
			  ) : session?.user ? (
				<UserAccountNav
				  email={session.user.email || ""}
				  imageUrl={session.user.image || ""}
				  name={session.user.name || ""}
				/>
			  ) : (
				//@ts-ignore
				status === "loading" ? (
				  <GetStartedSkeleton />
				) : (
				  <Button
					type="button"
					className="gap-1.5"
					onClick={() => {
					  providers &&
						Object.values(providers).map((provider) => signIn(provider.id));
					}}
				  >
					Get started <ArrowRight className="w-5 h-5" />
				  </Button>
				)
			  )}
			</div>
		  </div>
		</MaxWidthWrapper>
	  </nav>
	);
  };

export default Navbar;
