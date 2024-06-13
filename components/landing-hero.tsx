"use client"
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";
import Image from "next/image";


export const LandingHero = () => {
    const { isSignedIn } =useAuth();

    return ( 
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>
                    The Best AI Tool for
                </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                     <TypewriterComponent 
                     options={{
                        strings: [
                            "Chatbot.",
                            "Photo Generation.",
                            "Music Generation..",
                            "Code Generation..",
                            "Video Generation..", 
                        ],
                        autoStart: true,
                        loop:true
                     }}
                     />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Create content using AI 10x faster.
            </div>
            <div className="">
                <Link href={isSignedIn? "/dashboard" : "/sign-up"}>
                <Button  className="md:text-lg p-4 md:p-6 bg  bg-gradient-to-r  from-violet-700 to-pink-500 rounded-full font-semibold">
                    Start Generating for Free
                </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No credit card required
            </div>
            <div className=" flex items-center justify-center">
                <Image
                src="/construction.png"
                alt=""
                width={500}
                height={500}
                />
            </div>
            <div className=" flex items-center justify-center text-sm text-zinc-500 ">
                <p>
                    We are still building this website. Stay tuned for more updates!
                </p>
            </div>
        </div>
     );
}
 
 