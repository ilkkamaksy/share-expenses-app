module.exports = {
	preset: 'jest-expo',
	collectCoverage: true,
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/coverage/**',
		'!**/node_modules/**',
		'!**/babel.config.js',
		'!**/jest.setup.js',
		'!**/jest.config.js',
		'!**/.eslintrc.js',
		'!**/App.js',
		'!**/web-build/**',
		'!**/store/store.js',
		'!**/store/actions/**',
		'!**/constants/**'
	],
	transformIgnorePatterns: [
		'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'
	]
}