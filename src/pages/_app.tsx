import type { AppProps } from "next/app";
import { Mulish, EB_Garamond } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "@/context/CartContext";
import MsgContextProvider from "@/context/MessageContext";
import OrderContextProvider from "@/context/OrdersContext";

const cormorant = EB_Garamond({
    subsets: ["latin"],
    variable: "--font-cormorant",
});
const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>OvenGlow</title>
                <link rel="icon" type="image" href="/favicon.ico"></link>
            </Head>
            <div className={`${cormorant.variable} ${mulish.variable}`}>
                <SessionProvider session={pageProps.session}>
                    <OrderContextProvider>
                        <MsgContextProvider>
                            <CartContextProvider>
                                <Navbar />
                                <main>
                                    <ToastContainer />
                                    <Component {...pageProps} />
                                </main>
                            </CartContextProvider>
                        </MsgContextProvider>
                    </OrderContextProvider>
                    <Footer />
                </SessionProvider>
            </div>
        </>
    );
}
