import Location from "@/components/contact-us/Location";
import ContactForm from "@/components/contact-us/ContactForm";
import axios from "axios";
import { GetServerSidePropsContext } from "next/types";
import { getSession } from "next-auth/react";

interface props {
    location: {
        latitude: number;
        longitude: number;
        name: string;
    };
}

function ContactUs({ location }: props) {
    return (
        <div className="mx-8 max-sm:mx-2">
            <Location location={location} />
            <ContactForm />
        </div>
    );
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const session = await getSession(context.res);
    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    }
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/general/location`;
    const response = await axios.get(URL);

    return {
        props: {
            location: response.data.location,
        },
    };
};

export default ContactUs;
