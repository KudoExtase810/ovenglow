import Form from "@/components/register/Form";
import { getSession } from "next-auth/react";

function register() {
    return (
        <div className="flex justify-center items-center h-[100vh] bg-contour">
            <Form />
        </div>
    );
}

export const getServerSideProps = async ({ req }: any) => {
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
};

export default register;
