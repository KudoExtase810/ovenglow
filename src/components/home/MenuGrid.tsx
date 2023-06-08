import React from "react";
import breakfast from "../../assets/images/menugrid/breakfast.png";
import lunch from "../../assets/images/menugrid/lunch.png";
import pastry from "../../assets/images/menugrid/pastry.png";
import Link from "next/link";
import Image from "next/image";
import ArrowSvg from "./ArrowSvg";
import { useInView } from "react-intersection-observer";

function MenuGrid() {
    const menuBoxes = [
        {
            title: "Breakfast",
            desc: "Start your day off right with our breakfast options",
            img: breakfast,
            animation: "animate-fade animate-ease-linear animate-duration-700 ",
        },
        {
            title: "Lunch",
            desc: "Treat yourself to a tasty lunch today.",
            img: lunch,
            animation: "animate-fade animate-ease-linear animate-duration-700 ",
        },
        {
            title: "Pastry",
            desc: "Decadent pastries to satisfy your cravings",
            img: pastry,
            animation: "animate-fade animate-ease-linear animate-duration-700 ",
        },
    ];
    const { inView, ref } = useInView();

    return (
        <section className="flex gap-8 justify-center my-12 max-2xl:gap-3 max-[1310px]:mx-3 max-lg:flex-col">
            {menuBoxes.map((box, index) => (
                <div
                    ref={ref}
                    key={index}
                    className={`flex flex-col gap-4 items-center bg-[#f3ebd5] lg:w-[412px] py-16 ${
                        inView && box.animation
                    }`}
                >
                    <Image
                        src={box.img}
                        width={undefined}
                        alt={box.title}
                    ></Image>
                    <h3 className="font-cormorant font-semibold text-3xl text-zinc-950 uppercase">
                        {box.title}
                    </h3>
                    <p className="font-mulish text-zinc-600 max-w-[70%] text-lg text-center">
                        {box.desc}
                    </p>
                    <Link
                        href="/shop"
                        className="mt-2 hover:translate-x-6 transition-all duration-500"
                    >
                        <ArrowSvg />
                    </Link>
                </div>
            ))}
        </section>
    );
}

export default MenuGrid;
