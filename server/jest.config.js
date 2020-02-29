module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/test/**/*.test.(ts|js)"
    ],
    "moduleNameMapper": {
        "src/(.*)": "<rootDir>/src/$1",
    },
    testEnvironment: "node"
};
