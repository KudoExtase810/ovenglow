import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function PhoneNumber() {
    // for input
    const [number, setNumber] = useState<string>();
    // current number stored in db
    const [currentNumber, setCurrentNumber] = useState("");

    const [country, setCountry] = useState(undefined);

    useEffect(() => {
        const getNumber = async () => {
            const response = await axios.get("/api/general/phone");
            const number = response.data.storePhone;
            setCurrentNumber(number);
        };
        getNumber();
    }, []);

    useEffect(() => {
        const getCountry = async () => {
            const URL = "https://ipwho.is";
            const response = await axios(URL);
            const { country_code } = response.data;
            setCountry(country_code);
        };
        getCountry();
    }, []);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidPhoneNumber(number || ""))
            return toast.error("Invalid phone number!");

        if (currentNumber === number)
            return toast.error("This number is already saved!");

        const URL = "/api/general/phone";
        const response = await axios.patch(URL, { phoneNumber: number });

        response.status === 200
            ? toast.success("Your phone number has been saved successfully.")
            : toast.error(
                  "Could not update the pohne number, try again later."
              );
        response.status === 200 && setCurrentNumber(number!);
    };

    return (
        <section className="font-mulish text-lg 2xl:max-w-7xl">
            <h2 className="font-cormorant font-bold text-3xl text-zinc-950 mb-2 uppercase">
                phone number
            </h2>
            <p className="text-zinc-600 max-w-2xl! mb-3">
                A phone number is a critical component of good customer service.
                By providing customers with a direct line of communication, you
                can build trust, improve credibility, and enhance the overall
                customer experience.
            </p>
            <div className="font-mulish text-xl font-bold my-6">
                Current phone number: {currentNumber}
            </div>
            <form onSubmit={handleSave}>
                <div className="h-[85px]">
                    <PhoneInput
                        placeholder="Enter your phone number"
                        defaultCountry={country}
                        value={number}
                        onChange={setNumber}
                        className="border border-zinc-300 hover:border-zinc-600 focus:border-zinc-600 px-5 py-3 transition-colors duration-500 placeholder:text-zinc-700"
                    />
                    <small
                        className="text-red-600"
                        hidden={isValidPhoneNumber(number || "") || !number}
                    >
                        Invalid phone number!
                    </small>
                </div>
                <button
                    disabled={!isValidPhoneNumber(number || "")}
                    className="text-zinc-50 bg-zinc-900 disabled:bg-gray-400 uppercase px-12 py-4 mb-4 mt-2 text-sm tracking-widest hover:bg-brown transition-colors duration-300 w-max block mx-auto"
                    type="submit"
                >
                    save
                </button>
            </form>
        </section>
    );
}

export default PhoneNumber;
