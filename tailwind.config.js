module.exports = {
	darkMode: 'class',
	content: [
		'./public/**/*.html',
		'./src/**/*.{js,jsx,ts,tsx,vue}'
	],
	theme: {
		darkSelector: '.dark-mode',
		extend: {
			colors: {
				'indigo': '#1fb6ff',
				'skyblue': '#7eceda',
				'skyblueDark': '#46acbc',
				'skyblueLight': 'rgba(126, 206, 218,0.6)',
				'skyblueBorder': 'rgba(126, 206, 218,0.25)',
				'skyblueBg': 'rgba(126, 206, 218,0.1)'
			}
		}
	},
	variants: {
		backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd', 'hover', 'responsive'],
		borderColor: ['dark', 'dark-focus', 'dark-focus-within', 'hover', 'responsive'],
		textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive'],
		extend: {
			transitionProperty: {
				'height': 'height'
			},
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