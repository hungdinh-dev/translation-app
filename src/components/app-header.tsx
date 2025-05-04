'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FiMenu } from "react-icons/fi";
import { ModeToggle } from './button-change-theme';
import { signIn, signOut, useSession } from 'next-auth/react'; // Import các hàm cần thiết

//Để thư mục khác sau import cho dễ
const navigation = [
    { label: 'Trang chủ', href: '/en/' },
    // { label: 'Tài Khoản', href: '/users' },
    { label: 'Phiên dịch', href: '/en/translate' },
    { label: 'Về chúng tôi', href: '/en/translate-demo' },
    { label: 'Liên hệ', href: '/en/contact' },
];

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="bg-white dark:bg-black shadow-sm py-4">
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl">
                    My Translate Site
                </Link>

                <nav className="hidden md:flex items-center space-x-4">
                    {navigation.map((item, index) => (
                        <Link key={index} href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500">
                            {item.label}
                        </Link>
                    ))}
                    {session?.user ? (
                        <Button variant="outline" onClick={() => signOut()}>Đăng xuất</Button>
                    ) : (
                        <Button variant="outline" onClick={() => signIn()}>Đăng nhập</Button>
                    )}
                    <ModeToggle />
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
                            <div className="grid gap-4 py-4">
                                {navigation.map((item) => (
                                    <Link key={item.href} href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500 block py-2">
                                        {item.label}
                                    </Link>
                                ))}
                                {session?.user ? (
                                    <Button variant="outline" className="w-full" onClick={() => signOut()}>Đăng xuất</Button>
                                ) : (
                                    <Button variant="outline" className="w-full" onClick={() => signIn()}>Đăng nhập</Button>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}