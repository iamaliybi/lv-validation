/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	modulePaths: ["<rootDir>/src"],
	transform: {
		".+\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$": "jest-transform-stub",
	},
	moduleNameMapper: {
		'\\.svg$': '<rootDir>/src/__mocks__/svg.ts',
	},
};