import Image from "next/image";
import award1 from "../../assets/images/awards/client-1.png";
import award2 from "../../assets/images/awards/client-2.png";
import award3 from "../../assets/images/awards/client-3.png";
import award4 from "../../assets/images/awards/client-4.png";
import award5 from "../../assets/images/awards/client-5.png";
import award6 from "../../assets/images/awards/client-6.png";
import { useInView } from "react-intersection-observer";

function Awards() {
    const { ref, inView } = useInView();
    return (
        <section className="my-16">
            <div
                ref={ref}
                className="flex justify-center flex-wrap max-sm:flex-nowrap max-sm:flex-col max-sm:items-center"
            >
                {[award1, award2, award3, award4, award5, award6].map(
                    (awd, index) => (
                        <Image
                            key={index}
                            src={awd}
                            alt="award"
                            className={
                                inView
                                    ? `animate-fade-right animate-ease-out animate-delay-[${
                                          index * 200
                                      }ms]`
                                    : undefined
                            }
                        />
                    )
                )}
            </div>
        </section>
    );
}

export default Awards;
