import ArrowSvg from "@/components/home/ArrowSvg";
import Awards from "@/components/home/Awards";
import ImageGrid from "@/components/home/ImageGrid";
import MenuGrid from "@/components/home/MenuGrid";
import OurSpecialties from "@/components/home/OurSpecialties";
import Quotes from "@/components/home/Quotes";
import Special from "@/components/home/Special";
import { useEffect, useState } from "react";

export default function Home() {
    const [showButton, setShowButton] = useState(false);

    // MAKE THE SCROLL-TO-TOP BUTTON ONLY APPEAR IF NAV ISN'T VISIBLE ON THE SCREEN
    useEffect(() => {
        function handleScroll() {
            const navbar = document.querySelector("nav");
            if (navbar) {
                const { bottom } = navbar.getBoundingClientRect();
                setShowButton(bottom < 0);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="relative">
            <button
                className={`fixed bottom-14 right-0 z-[2] opacity-0 transition-all duration-500 cursor-default ${
                    showButton && "opacity-100 cursor-pointer"
                }`}
                onClick={() => {
                    showButton && handleScroll();
                }}
            >
                <ArrowSvg className="-rotate-90" />
            </button>
            <ImageGrid />
            <Quotes />
            <Special />
            <MenuGrid />
            <OurSpecialties />
            <Awards />
        </div>
    );
}
