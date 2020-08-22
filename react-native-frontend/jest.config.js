module.exports = {
	// preset: 'react-native',
	// collectCoverage: true,
	// setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
	// transformIgnorePatterns: [		
	// 	'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|@expo/vector-icons|expo-secure-store|react-navigation|@react-navigation/.*|unimodules-permissions-interface|sentry-expo|native-base|@sentry/.*)'
	// 	// 'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo|@expo/vector-icons|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-permissions-interface|sentry-expo|native-base|@sentry/.*)'
	// ],
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