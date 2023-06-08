import { AiFillStar } from "react-icons/ai";
import Carousel from "nuka-carousel/lib/carousel";

function Quotes() {
    const quotes = [
        {
            body: "Everyone has a favourite cake, pastry, pudding or pie from when they were kids.",
            author: "Tom Tally",
        },
        {
            body: "As chefs, especially pastry chefs, your creativity plays such a big part of daily work. ",
            author: "Ina Dorsey",
        },
        {
            body: "Quality breads and pastries made to order. Beautiful Cakes for Beatiful Occasions.",
            author: "Randy Woods",
        },
    ];

    return (
        <section className="font-cormorant py-24 bg-pastry mb-14">
            <Carousel withoutControls wrapAround autoplay swiping>
                {quotes.map((quote, index) => (
                    <div key={index} className="bg-zinc-100 bg-opacity-60 py-4">
                        <div className="flex gap-2 justify-center mb-2">
                            <AiFillStar size={20} className="text-brown" />
                            <AiFillStar size={20} className="text-brown" />
                            <AiFillStar size={20} className="text-brown" />
                            <AiFillStar size={20} className="text-brown" />
                            <AiFillStar size={20} className="text-brown" />
                        </div>
                        <blockquote key={index} className="text-center">
                            <span className="block font-semibold text-4xl text-zinc-950 mb-5 max-w-2xl mx-auto">
                                "{quote.body}"
                            </span>
                            <cite className="uppercase font-mulish text-md text-zinc-500">
                                {quote.author}
                            </cite>
                        </blockquote>
                    </div>
                ))}
            </Carousel>
        </section>
    );
}

export default Quotes;
