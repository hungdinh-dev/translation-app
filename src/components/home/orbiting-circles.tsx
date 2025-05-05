"use client"

import { OrbitingCircles } from "../magicui/orbiting-circles";
import Image from 'next/image';

export function OrbitingCirclesDemo() {
    return (
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
            <OrbitingCircles iconSize={40}>
                <Image
                    src="/images/eleven-labs-ai-icon.png"
                    alt="nextIcon"
                    width={800}
                    height={800}
                />
                <Image
                    src="/images/mongodb-icon.svg"
                    alt="nextIcon"
                    width={800}
                    height={800}
                />
                {/* <Icons.whatsapp />
                <Icons.notion />
                <Icons.openai />
                <Icons.googleDrive />
                <Icons.whatsapp /> */}
            </OrbitingCircles>
            <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
                <Image
                    src="/images/eleven-labs-ai-icon.png"
                    alt="nextIcon"
                    width={800}
                    height={800}
                />
                <Image
                    src="/images/mongodb-icon.svg"
                    alt="nextIcon"
                    width={800}
                    height={800}
                />
                {/* <Icons.whatsapp />
                <Icons.notion />
                <Icons.openai />
                <Icons.googleDrive /> */}
            </OrbitingCircles>
        </div>
    );
}
