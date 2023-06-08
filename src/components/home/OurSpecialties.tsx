import Link from "next/link";
import brownies from "../../assets/images/specialties/brownies.jpg";
import checkout from "../../assets/images/specialties/checkout.jpg";
import Image from "next/image";
import ArrowSvg from "./ArrowSvg";
import { useInView } from "react-intersection-observer";

function OurSpecialties() {
    const { ref, inView } = useInView();
    return (
        <section className="mt-16 max-2xl:mx-3 max-w-full" ref={ref}>
            <div className="text-center border-t border-zinc-200 pt-32 pb-16">
                <h2 className="font-cormorant font-semibold text-4xl text-zinc-950 mb-4 uppercase">
                    our specialties
                </h2>
                <p className="font-mulish text-lg text-zinc-600">
                    Experience the art of baking with our signature specialties,
                    made fresh daily in-house.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-fit mx-auto max-lg:grid-cols-1">
                <Image
                    src={brownies}
                    alt="brownies"
                    className={
                        inView ? "animate-fade animate-ease-in" : undefined
                    }
                />

                <div
                    className={`bg-[#f3ebd5] flex flex-col justify-center items-center max-lg:py-12 max-sm:p-6 ${
                        inView &&
                        "animate-fade animate-ease-in animate-delay-[400ms]"
                    }`}
                >
                    <div className="max-w-md flex flex-col justify-center items-start gap-6">
                        <h3 className="font-cormorant font-semibold text-3xl text-zinc-950 uppercase">
                            have you tried our new brownies yet?
                        </h3>
                        <p className="font-mulish text-lg text-zinc-600 ">
                            Indulge in our latest creation - rich, fudgy
                            brownies that will satisfy your chocolate cravings.
                            Try them now and discover your new favorite treat!
                        </p>
                        <Link
                            href="/products/64771b0fa426cb6e9a8a7546"
                            className="hover:translate-x-6 transition-all duration-500 mr-auto"
                        >
                            <ArrowSvg />
                        </Link>
                    </div>
                </div>

                <div
                    className={`bg-[#f3ebd5] flex flex-col justify-center items-center max-lg:py-12 max-sm:p-6 ${
                        inView &&
                        "animate-fade animate-ease-in animate-delay-[600ms]"
                    }`}
                >
                    <div className="max-w-md flex flex-col justify-center items-start gap-6">
                        <h3 className="font-cormorant font-semibold text-3xl text-zinc-950 uppercase">
                            a taste all folks keep coming to
                        </h3>
                        <p className="font-mulish text-lg text-zinc-600 ">
                            Experience the flavor that keeps customers coming
                            back for more. Our timeless recipes, made with the
                            freshest ingredients, offer a taste of nostalgia
                            that's simply irresistible.
                        </p>
                        <Link
                            href="/shop"
                            className="hover:translate-x-6 transition-all duration-500 mr-auto"
                        >
                            <ArrowSvg />
                        </Link>
                    </div>
                </div>

                <Image
                    src={checkout}
                    alt=""
                    className={
                        inView
                            ? "animate-fade animate-ease-in animate-delay-[200ms]"
                            : undefined
                    }
                />
            </div>
        </section>
    );
}

export default OurSpecialties;
