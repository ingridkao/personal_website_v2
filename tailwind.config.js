module.exports = {
	theme: {
		darkSelector: '.dark-mode',
		extend: {
			colors: {
				'indigo': '#1fb6ff'
			}
		}
	},
	variants: {
		backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd', 'hover', 'responsive'],
		borderColor: ['dark', 'dark-focus', 'dark-focus-within', 'hover', 'responsive'],
		textColor: ['dark', 'dark-hover', 'dark-active', 'hover', 'responsive']
	},
	plugins: [
		require('tailwindcss-dark-mode')()
	]
}