import Form from "@/components/login/Form";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
function login() {
    useEffect(() => {
        toast.warn(
            <div className="text-zinc-900">
                Make sure to use the{" "}
                <b className="text-red-500">admin account</b> to get access to
                the <b className="text-red-500">administration</b> pages!
            </div>,
            { autoClose: false }
        );
    }, []);
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

export default login;
