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
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/custom-forms')
    ]
}
