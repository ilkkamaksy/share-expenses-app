module.exports = {
	preset: 'react-native',
	collectCoverage: true,
	setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
	transformIgnorePatterns: [
		'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|expo|@unimodules|unimodules-permissions-interface)',
	],
}