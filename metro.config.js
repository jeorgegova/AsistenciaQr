const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    blockList: exclusionList([/node_modules\/.*\/node_modules/]),  // Excluye node_modules anidados
  },
  watchFolders: ['.'],  // Limita la observación de archivos a la raíz del proyecto
  server: {
    enhanceMiddleware: (middleware) => (req, res, next) => {
      res.setHeader('Cache-Control', 'no-store');  // Asegura que el cache se limpie apropiadamente
      return middleware(req, res, next);
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,  // Habilita inline requires para mejorar la velocidad
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
