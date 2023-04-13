### STAGE 1:BUILD DE L'APPLICATION ###

# Utilisation de l'image de nodje alpine
FROM node:16.20.0-alpine3.17 AS build
# creation d'un dossier virtuel dans l'image
WORKDIR /dist/src/app
# copie des fichiers des dependences
COPY package.json package-lock.json ./
# Vider tous les caches
RUN npm cache clean --force
# copy des fichiers locaux dans l'image
COPY . .
RUN npm install
RUN npm run build --prod


### STAGE 2: LANCEMENT DE L'APPLICATION ###
# Definition de l'image nginx à utliser
FROM nginx:latest AS ngi
COPY --from=build /dist/src/app/dist/front-traitement-angola /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
# Exposé le port 80
EXPOSE 80