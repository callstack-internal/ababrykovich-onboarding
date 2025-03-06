module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest/setup.tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
};
