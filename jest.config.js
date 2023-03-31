/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	modulePaths: ["<rootDir>/tests"],
	transform: {
		".+\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$": "jest-transform-stub",
	},
	moduleNameMapper: {
		'\\.svg$': '<rootDir>/src/__mocks__/svg.ts',
	},
};