/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}", "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/@headlessui/react/**/*.js"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
