
FROM node:18.18-alpine3.18 as build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build


FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/centinela-application-frontend /usr/share/nginx/html
