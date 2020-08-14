module.exports = {
	preset: 'react-native',
	collectCoverage: true,
	setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
	transformIgnorePatterns: [		
		'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo|@expo/vector-icons|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-permissions-interface|sentry-expo|native-base|@sentry/.*)'
	],
}