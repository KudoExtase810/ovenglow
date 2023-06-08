import Link from "next/link";
import Image from "next/image";

// Images
import img9 from "../../assets/images/homegrid/masonry-gallery-10.jpg";
import img10 from "../../assets/images/homegrid/masonry-gallery-12.jpg";
import img11 from "../../assets/images/homegrid/masonry-gallery-13.jpg";
import img12 from "../../assets/images/homegrid/masonry-gallery-14.jpg";

const ImageGrid = () => {
    return (
        <section className="flex justify-center my-14 gap-1 max-xl:flex-col max-xl:items-center w-fit mx-auto max-md:px-3 max-sm:px-0">
            <div className="grid grid-cols-2 gap-1 max-sm:grid-cols-1">
                <Image
                    src={img9}
                    alt=""
                    className="max-[1380px]:w-[380px] max-xl:w-full max-lg:w-[380px] max-sm:w-[400px] animate-fade animate-ease-in"
                />
                <Image
                    src={img10}
                    alt=""
                    className="max-[1380px]:w-[380px] max-xl:w-full max-lg:w-[380px] max-sm:w-[400px] animate-fade animate-ease-in animate-delay-200"
                />
                <Image
                    src={img11}
                    alt=""
                    className="max-[1380px]:w-[380px] max-xl:w-full max-lg:w-[380px] max-sm:w-[400px] animate-fade animate-ease-in animate-delay-[400ms]"
                />
                <Image
                    src={img12}
                    alt=""
                    className="max-[1380px]:w-[380px] max-xl:w-full max-lg:w-[380px] max-sm:w-[400px] animate-fade animate-ease-in animate-delay-[600ms]"
                />
            </div>
            <div className="flex flex-col gap-4 items-center h-[604px] w-[434px] max-[1380px]:h-[534.22px] max-xl:w-full max-xl:h-[320px] justify-center bg-[#f3ebd5] animate-fade animate-ease-in animate-delay-[800ms]">
                <h2 className="text-center max-w-sm">
                    <span className="block font-mulish text-zinc-500 mb-4 tracking-wide uppercase">
                        don't miss
                    </span>
                    <span className="font-cormorant font-semibold text-3xl text-zinc-950 uppercase">
                        they taste as good as they look
                    </span>
                </h2>
                <Link
                    href="/shop"
                    className="text-zinc-50 bg-zinc-900 px-8 py-4 text-sm tracking-widest w-max hover:bg-brown transition-colors duration-300 uppercase"
                >
                    view shop
                </Link>
            </div>
        </section>
    );
};

export default ImageGrid;
