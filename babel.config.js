module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
      }
    ],
    [
      'module-resolver', {
        root: ['./src'],
        alias: {
          "@": "./src"
        },
        extensions: ['.ts', '.tsx'],
      },
    ]
  ],
};
