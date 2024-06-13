"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [

    {
        name: "Ashish",
        avatar: "A",
        title: "Web Devloper",
        description: "This is the best application I've used !"
    },
    {
        "name": "Emily",
        "avatar": "E",
        "title": "Software Engineer",
        "description": "An outstanding tool that has boosted my productivity tremendously!"
    },
    {
        "name": "Michael",
        "avatar": "M",
        "title": "Product Manager",
        "description": "The user-friendly interface and powerful features make this application a game-changer."
    },    
    {
        "name": "Sophia",
        "avatar": "S",
        "title": "UX Designer",
        "description": "I love how intuitive and efficient this application is. Highly recommended!"
    }    

]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div className="">
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}

