'use client';

import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "./ui/button";
import { Meteors } from "@/components/magicui/meteors";


export default function Hero() {

    return (
        <div className="w-full">
            <div className="container mx-auto">
                <div className="flex items-center justify-center py-20">
                    <Meteors />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tight text-center">
                            This is the start of something new
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                            Managing a small business today is already tough. Avoid further
                            complications by ditching outdated, tedious trade methods. Our goal
                            is to streamline SMB trade, making it easier and faster than ever.
                        </p>
                        <div className="flex justify-center items-center flex-row gap-3">
                            <Button size="lg" className="gap-4" variant="outline">
                                Jump on a call <PhoneCall className="w-4 h-4" />
                            </Button>
                            <Button size="lg" className="gap-4">
                                Sign up here <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};