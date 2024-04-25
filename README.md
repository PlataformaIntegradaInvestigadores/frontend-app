# Acerca del proyecto

TODO:


# Instalacion
## Requerimientos
- Docker Desktop
## Comandos
### Importante: Estos comandos se deben ejecutar en el directiorio raiz de la aplicacion

Primero se construye la imagen de docker.

`
docker compose build
`

Posteriormente iniciamos el contenedor de Docker.
 
 `docker compose up`

## Para instalar cualquier dependencia
Ejecutar `docker ps` e identificar el id del contenedor.

Para acceder al contenedor:

`docker exec -it <id_cotenedor> /bin/sh`

Una vez dentro instalar cualquier dependencia necesaria

'npm install @types/angular'

## Importante: despues de hacer cada instalacion, no olvidar hacer el build del contenedor
