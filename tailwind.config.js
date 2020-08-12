module.exports = {
    purge: [
        './resources/views/**/*.blade.php',
        './resources/css/**/*.css',
    ],
    theme: {
        colors: {
            charcoal: '#2F3E46',
            'dark-slate-gray': '#354F52',
            'hookers-green': '#52796F',
            'dark-sea-green': '#84A98C',
            'ash-gray': '#CAD2C5',
            teal: {
                '100': '#E6FFFA',
                '500': '#38B2AC',
            },
            gray: {
                '100': '#f5f5f5',
                '200': '#eeeeee',
                '300': '#e0e0e0',
                '400': '#bdbdbd',
                '500': '#9e9e9e',
                '600': '#757575',
                '700': '#616161',
                '800': '#424242',
                '900': '#212121',
            }
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/custom-forms')
    ]
}
