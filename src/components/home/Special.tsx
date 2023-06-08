import Link from "next/link";
import Image from "next/image";
import img from "../../assets/images/special.jpg";
import bwl from "../../assets/images/bwl.png";
import { useInView } from "react-intersection-observer";

function Special() {
    const { ref, inView } = useInView();
    return (
        <section
            className="flex gap-32 items-center justify-center max-xl:flex-col max-xl:gap-8 max-sm:mx-3"
            ref={ref}
        >
            <div
                className={`relative ${
                    inView && "animate-fade-right animate-ease-linear"
                }`}
            >
                <Image src={img} alt="" width={undefined} />
                <Image
                    src={bwl}
                    alt="baked with love"
                    width={undefined}
                    className="absolute -right-[26px] -top-[26px] max-md:hidden"
                />
            </div>
            <div
                className={`xl:max-w-md flex flex-col gap-6 max-xl:text-center max-xl:gap-4 ${
                    inView && "animate-fade-left animate-ease-linear"
                }`}
            >
                <h2 className="font-cormorant font-semibold text-4xl text-zinc-950 uppercase">
                    today's special baked fresh for you
                </h2>
                <p className="font-mulish text-lg text-zinc-600">
                    Experience our limited-time baked specials, crafted by our
                    expert pastry chefs with the finest ingredients. Discover
                    something new today!
                </p>
                <Link
                    href="/shop"
                    className="text-zinc-50 bg-zinc-900 px-8 py-4 text-sm tracking-widest w-max hover:bg-brown transition-colors duration-300 uppercase max-xl:mx-auto max-xl:mt-3"
                >
                    read more
                </Link>
            </div>
        </section>
    );
}

export default Special;
