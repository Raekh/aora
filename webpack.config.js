const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['nativewind'],
      },
    },
    argv,
  );

  config.resolve.alias['expo-asset'] = 'expo-asset-web';

  config.module.rules.push({
    test: /\.css$/i,
    use: ['postcss-loader'],
  });

  return config;
};
