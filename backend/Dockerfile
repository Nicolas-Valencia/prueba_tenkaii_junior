FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Generar Prisma Client dentro del contenedor
RUN npx prisma generate

# Compilar Nest (si usas build)
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
