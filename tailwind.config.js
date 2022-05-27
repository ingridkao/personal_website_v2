module.exports = {
	darkMode: 'class',
	content: [
		'./public/**/*.html',
		'./src/**/*.{js,jsx,ts,tsx,vue}'
	],
	theme: {
		extend: {
			typography: (theme) => ({
				light: {
					// you can have a 'dark' key here instead (eg: dark:prose-dark), just need to update the color values below
					css: [
						{
							color: theme('colors.gray.400'),
							'[class~="lead"]': {
								color: theme('colors.gray.300'),
							}
						}
					]
				}
			})
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		// require('tailwindcss-dark-mode')() // This not work when install @tailwindcss/typography
	]
}