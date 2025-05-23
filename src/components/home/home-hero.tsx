'use client';

import { MessageCircleMore, MoveRight, PhoneCall } from "lucide-react";
import { Meteors } from "@/components/magicui/meteors";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Typewriter from 'typewriter-effect'

export default function Hero() {
    const { t } = useTranslation();

    const { data: session } = useSession();

    return (
        <div className="w-full">
            <div className="container mx-auto">
                <div className="flex items-center justify-center py-20">
                    <Meteors />
                    <div className="flex flex-col gap-4">
                        <h1 className="font-bold text-5xl md:text-7xl max-w-2xl tracking-tight text-center">
                            <Typewriter
                                options={{
                                    strings: [t('hero.eng_title'), t('hero.vi_title'), t('hero.jp_title'), t('hero.cn_title')],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                            {t('hero.description')}
                        </p>
                        <div className="flex justify-center items-center flex-row gap-3">
                            {session
                                ?
                                <Link href={'/en/translate-page'}>
                                    <Button size="lg" className="gap-4" variant="outline">
                                        {t('hero.cta_chat')} <MessageCircleMore className="w-4 h-4" />
                                    </Button>
                                </Link>
                                :
                                <Button size="lg" className="gap-4" onClick={() => signIn()}>
                                    {t('hero.cta_signup')} <MoveRight className="w-4 h-4" />
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
