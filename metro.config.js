const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = (async () => {
  // Obtém a configuração padrão
  const defaultConfig = await getDefaultConfig(__dirname);

  // Recupera as extensões de assets padrão
  const { assetExts } = defaultConfig.resolver;

  // Configuração personalizada adicionando `.bin` às extensões
  const customConfig = {
    resolver: {
      assetExts: [...assetExts, 'bin'], // Adiciona suporte a arquivos `.bin`
    },
  };

  // Combina a configuração padrão com a personalizada usando mergeConfig
  return mergeConfig(defaultConfig, customConfig);
})();
