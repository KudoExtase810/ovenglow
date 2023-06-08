/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                cormorant: ["var(--font-cormorant)"],
                mulish: ["var(--font-mulish)"],
            },
            textColor: {
                brown: "#bb9230",
            },
            backgroundColor: {
                brown: "#bb9230",
            },
        },
    },
    plugins: [require("tailwindcss-animated")],
};
