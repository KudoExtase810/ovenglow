interface props {
    phone: string;
    phoneNum: string;
    setPhoneNum: React.Dispatch<React.SetStateAction<string>>;
}

function Details({ phoneNum, setPhoneNum }: props) {
    return (
        <section className="font-mulish text-lg text-zinc-900 font-medium flex gap-28 mt-6 pb-6 border-b lg:items-center max-lg:flex-col max-lg:gap-4">
            <div>
                <h2 className="text-2xl font-bold tracking-wide">
                    Personal details
                </h2>
                <p className="text-gray-700">
                    View and edit your personal details.
                </p>
            </div>

            <input
                onChange={(e) => setPhoneNum(e.target.value)}
                value={phoneNum}
                placeholder="Your phone number"
                type="tel"
                id="tel"
                className="border shadow-sm rounded-sm hover:border-zinc-500 focus:border-zinc-500 px-4 py-2 transition-colors duration-500 placeholder:text-zinc-700 w-96 max-sm:w-80"
            />
        </section>
    );
}

export default Details;
