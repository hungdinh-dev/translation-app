import Link from 'next/link';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FiMenu } from "react-icons/fi";
import { ModeToggle } from './button-change-theme';

//Để thư mục khác sau import cho dễ
const navigation = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tài Khoản', href: '/users' },
    { label: 'Phiên dịch', href: '/translate' },
    { label: 'Về chúng tôi', href: '/' },
    { label: 'Liên hệ', href: '/' },
];

export default function Header() {
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
                    <Button variant="outline">Đăng nhập</Button>
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
                                <Button variant="outline" className="w-full">Đăng nhập</Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}