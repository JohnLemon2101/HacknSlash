# Utilisez une image Node.js comme base
FROM node:14

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers nécessaires dans le conteneur
COPY package*.json ./
COPY index.html ./
COPY main.js ./
COPY assets/ ./assets/

# Installez les dépendances
RUN npm install

# Exposez le port sur lequel votre jeu s'exécute
EXPOSE 3000

# Commande de démarrage de l'application
CMD [ "npm", "start" ]
