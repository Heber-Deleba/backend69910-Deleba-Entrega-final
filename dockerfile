
# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias sin 'bcrypt'
RUN npm install --omit=optional --omit=dev

# Copia el resto del código fuente
COPY . .

# Reinstala bcrypt dentro del contenedor para la arquitectura correcta
RUN npm rebuild bcrypt --build-from-source

# Expone el puerto de la aplicación
EXPOSE 8080
# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]

