'use client'
import React, { useEffect } from 'react'
import AOS from 'aos';

const HomeH1 = ({ text }: { text: string }) => {

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            delay: 50,
            once: false,
        });
    }, []);

    return (
        <div className="text-5xl font-bold text-center mb-10"
            data-aos="fade-down"
            data-aos-offset="400">{text}</div>
    )
}

export default HomeH1