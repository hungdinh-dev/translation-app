'use client'
import { Cpu, MousePointerClick, Share2Icon, SquareChartGantt } from "lucide-react";
import AOS from 'aos';
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { useEffect } from "react";
import HomeH1 from "./home-h1";
import { useTranslation } from "react-i18next";

const features = [
    {
        Icon: MousePointerClick,
        name: "features.easy_to_use.name",
        description: "features.easy_to_use.description",
        href: "#",
        cta: "features.learn_more",
        className: "col-span-3 lg:col-span-1",
        "data-aos": "fade-down",
        "data-aos-offset": "400",
        background: <div></div>,
    },
    {
        Icon: Cpu,
        name: "features.popular_tech.name",
        description: "features.popular_tech.description",
        href: "#",
        cta: "features.learn_more",
        className: "col-span-3 lg:col-span-2",
        "data-aos": "fade-left",
        "data-aos-offset": "400",
        background: <div></div>,
    },
    {
        Icon: Share2Icon,
        name: "features.integrations.name",
        description: "features.integrations.description",
        href: "#",
        cta: "features.learn_more",
        className: "col-span-3 lg:col-span-2",
        "data-aos": "fade-right",
        "data-aos-offset": "200",
        background: <div></div>,
    },
    {
        Icon: SquareChartGantt,
        name: "features.smart_management.name",
        description: "features.smart_management.description",
        href: "#",
        cta: "features.learn_more",
        className: "col-span-3 lg:col-span-1",
        "data-aos": "fade-up",
        "data-aos-offset": "200",
        background: <div></div>,
    },
];


export function AboutWebSite() {

    const { t } = useTranslation()

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            delay: 50,
            once: false,
        });
    }, []);

    return (
        <div className="md:mx-40 my-10">
            <HomeH1 text={t('features.title')} />
            <BentoGrid>
                {features.map((feature, idx) => (
                    <BentoCard key={idx} {...feature}
                        name={t(feature.name)}
                        description={t(feature.description)}
                        cta={t(feature.cta)} />
                ))}
            </BentoGrid>
        </div>
    );
}
