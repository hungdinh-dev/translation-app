'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import '@/app/nprogress.css';

export function RouteChangeIndicator() {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.start();
        NProgress.done();
    }, [pathname]);

    return null;
}
