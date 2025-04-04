module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.interface.ts", "!src/index.ts", "!**/__tests__/**"],
  coverageDirectory: "coverage",
};
