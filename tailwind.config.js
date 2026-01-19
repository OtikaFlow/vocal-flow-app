/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#E0F7FA',
                    200: '#80DEEA',
                    300: '#00f0ff', // Neon Blue
                    400: '#26C6DA',
                    500: '#00BCD4',
                    600: '#00ACC1',
                    700: '#0097A7',
                    800: '#00838F',
                    900: '#006064',
                },
                accent: {
                    100: '#F5F5F5',
                    200: '#EEEEEE',
                },
                bg: {
                    100: '#0F1C2E',
                    200: '#1f2b3e',
                },
                text: {
                    100: '#FFFFFF',
                    200: '#E0E0E0',
                },
                "neon-blue": "#00f0ff",
                "neon-cyan": "#00FFFF",
            },
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                display: ["Rajdhani", ...defaultTheme.fontFamily.sans],
                tech: ["Share Tech Mono", "monospace"],
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                scroll:
                    "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
            },
            keyframes: {
                scroll: {
                    to: {
                        transform: "translate(calc(-50% - 0.5rem))",
                    },
                },
            },
        },
    },
    plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}
