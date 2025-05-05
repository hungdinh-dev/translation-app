'use client';

import { useRouter, usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const locales = [
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' },
];

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (lang: string) => {
        const segments = pathname.split('/');
        segments[1] = lang;
        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Globe />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {locales.map((locale) => (
                    <DropdownMenuItem key={locale.code} onClick={() => changeLanguage(locale.code)}>
                        {locale.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher;
