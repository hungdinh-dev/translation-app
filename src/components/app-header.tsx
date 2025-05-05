'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FiMenu } from "react-icons/fi";
import { ModeToggle } from './button-change-theme';
import { signIn, signOut, useSession } from 'next-auth/react';
import LanguageSwitcher from './language-switcher';
import { useTranslation } from 'react-i18next';

const navigation = [
    { label: 'header.home', href: '/en/' },
    { label: 'header.about_us', href: '/en' },
];

export default function Header() {

    const { t } = useTranslation()

    const { data: session } = useSession();

    return (
        <header className="bg-white dark:bg-black shadow-sm py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/en" className="font-bold text-xl">
                    TWA
                </Link>

                <nav className="hidden md:flex items-center space-x-4">
                    {navigation.map((item, index) => (
                        <Link key={index} href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">
                            {t(item.label)}
                        </Link>
                    ))}
                    {session?.user ? (
                        <div>
                            <Link href='/en/translate-page' className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 mr-10">
                                {t("header.translate")}
                            </Link>
                            <Button variant="outline" onClick={() => signOut()}>{t('signout')}</Button>
                        </div>
                    ) : (
                        <Button variant="outline" onClick={() => signIn()}>{t('login')}</Button>
                    )}
                    <ModeToggle />
                    <LanguageSwitcher />
                </nav>

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <FiMenu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-xs">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="grid gap-4 p-4">
                                {navigation.map((item) => (
                                    <Link key={item.href} href={item.href} className="text-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 block py-2">
                                        {t(item.label)}
                                    </Link>
                                ))}
                                {session?.user ? (
                                    <div>
                                        <Link href='/en/translate-page' className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">
                                            {t("header.translate")}
                                        </Link>
                                        <Button variant="outline" onClick={() => signOut()}>{t('signout')}</Button>
                                    </div>
                                ) : (
                                    <Button variant="outline" onClick={() => signIn()}>{t('login')}</Button>
                                )}
                                <div className='flex items-center justify-center gap-x-10'>
                                    <ModeToggle />
                                    <LanguageSwitcher />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}