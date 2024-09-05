# FROM node:18-alpine3.18

# RUN npm install -g @angular/cli

# WORKDIR /app

# COPY . .

# RUN npm install

# EXPOSE 4200

# CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]

FROM node:18-alpine3.18 AS build

RUN npm install -g @angular/cli

WORKDIR /app

COPY . .

RUN npm install

RUN ng build --configuration development

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/centinela-application-frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
