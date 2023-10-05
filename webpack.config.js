const path = require('path');

module.exports = { 
  mode: 'development', // Vous pouvez également utiliser 'production' ou 'none' en fonction de vos besoins.
  entry: {
    bundle: [
      path.resolve(__dirname, 'assets/js/main.js'),
      path.resolve(__dirname, 'assets/js/dialog.js'),
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "."),
  },
  devServer: {
    port: 8380,
    static: {
      directory: path.resolve(__dirname, '.'), // Dossier de sortie à servir
    },
    proxy: {
      '/assets/php': {
        target: 'http://localhost:8280', // L'URL de votre serveur PHP local
        changeOrigin: true,
        pathRewrite: {
          '^/assets/php': '', // Supprimer le préfixe /assets/php de la requête
        },
      },
    },
  },
};