import LocateStore from "@/components/administration/general/LocateStore";
import PhoneNumber from "@/components/administration/general/PhoneNumber";
import axios from "axios";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";

interface props {
    locationName: string;
}

function general({ locationName }: props) {
    return (
        <div className="mx-6 my-12 max-md:mx-3">
            <LocateStore locationName={locationName} />
            <PhoneNumber />
        </div>
    );
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const URL = `https://ovenglow.vercel.app/api/general/location`;
    const response = await axios.get(URL);

    const session = await getSession(context.res);
    if (!session?.user.isAdmin) {
        throw new Error("You don't have permission to access this page!");
    }

    return {
        props: {
            locationName: response.data.location.name,
        },
    };
};

export default general;
