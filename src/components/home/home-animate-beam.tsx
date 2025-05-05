"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "../magicui/animated-beam";
import Image from 'next/image';
import HomeH1 from "./home-h1";
import { useTranslation } from "react-i18next";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null);
    const div7Ref = useRef<HTMLDivElement>(null);

    const { t } = useTranslation()

    return (
        <div className="mt-20">
            <HomeH1 text={t('animate_beam.title')} />
            <div
                className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
                ref={containerRef}
            >
                <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
                    <div className="flex flex-row items-center justify-between">
                        <Circle ref={div1Ref}>
                            <Image
                                src="/images/nextjs-icon.svg"
                                alt="nextIcon"
                                width={800}
                                height={800}
                            />
                        </Circle>
                        <Circle ref={div5Ref}>
                            <Image
                                src="/images/tailwin-icon.png"
                                alt="nextIcon"
                                width={800}
                                height={800}
                            />
                        </Circle>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <Circle ref={div2Ref}>
                            <Image
                                src="/images/nextauth-icon.png"
                                alt="nextIcon"
                                width={800}
                                height={800}
                            />
                        </Circle>
                        <Circle ref={div4Ref} className="size-16">
                            <Image
                                src="/images/google-gemini-icon.png"
                                alt="nextIcon"
                                width={800}
                                height={800}
                            />
                        </Circle>
                        <Circle ref={div6Ref}>
                            <Image
                                src="/images/shadcn-icon.png"
                                alt="nextIcon"
                                width={800}
                                height={800}
                            />
                        </Circle>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <Circle ref={div3Ref}>
                            <Image
                                src="/images/prisma-icon.svg"
                                alt="nextIcon"
                                width={800}
                                height={800}
                            />
                        </Circle>
                        <Circle ref={div7Ref}>
                            <Image
                                src="/images/mongodb-icon.svg"
                                alt="nextIcon"
                                width={800}
                                height={800}
                            />
                        </Circle>
                    </div>
                </div>

                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div1Ref}
                    toRef={div4Ref}
                    curvature={-75}
                    endYOffset={-10}
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div2Ref}
                    toRef={div4Ref}
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div3Ref}
                    toRef={div4Ref}
                    curvature={75}
                    endYOffset={10}
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div5Ref}
                    toRef={div4Ref}
                    curvature={-75}
                    endYOffset={-10}
                    reverse
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div6Ref}
                    toRef={div4Ref}
                    reverse
                />
                <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div7Ref}
                    toRef={div4Ref}
                    curvature={75}
                    endYOffset={10}
                    reverse
                />
            </div>
        </div>
    );
}

