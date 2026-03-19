# -------- BUILD --------
FROM node:18.18-alpine3.18 as build

WORKDIR /app

# dependencias
COPY package*.json ./
RUN npm ci

# código
COPY . .

# build angular
RUN npm run build

# -------- NGINX --------
FROM nginx:latest

# config nginx
COPY nginx.conf /etc/nginx/nginx.conf

# copiar build
COPY --from=build /app/dist/centinela-application-frontend /usr/share/nginx/html