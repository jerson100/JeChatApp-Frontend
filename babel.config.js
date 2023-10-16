module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          components: './src/components',
          screens: './src/screens',
          src: './src',
          config: './src/config',
          types: './src/types',
        },
      },
    ],
  ],
};
