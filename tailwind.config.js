/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#003877',
                primaryText: '#474042',
                shadeColor: '#F9F0EC',
                overlay: '#F6F7F8',
            },
        },
    },
    plugins: [],
};
