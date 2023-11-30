/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.\\.?\\/.+)\\.js?$": "$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/build/"],
};
