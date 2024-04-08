module.exports = {
    moduleNameMapper: {
        testEnvironment: 'jsdom',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/mocks/fileMock.js',
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: ["node_modules/(?!axios)"],
};
