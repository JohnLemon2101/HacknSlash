const path = require('path');

module.exports = { 
  mode: 'development', // Vous pouvez également utiliser 'production' ou 'none' en fonction de vos besoins.
  entry: {
    bundle: [
        path.resolve(__dirname, 'assets/js/player.js'),
        path.resolve(__dirname, 'assets/js/projectile.js'),
    ]
    
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, "."),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '.'), // Dossier de sortie à servir
    },
  },
};