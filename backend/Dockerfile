# Usa node estable
FROM node:20-alpine

WORKDIR /app

# Instala dependencias del sistema que Prisma pueda necesitar
RUN apk add --no-cache libc6-compat build-base python3

# Copia package.json y package-lock first for caching
COPY package*.json ./

# Instala dependencias
RUN npm ci

# Copia el resto del código
COPY . .

# Generar prisma client
RUN npx prisma generate

# Compila TS (si usas build)
RUN npm run build

EXPOSE 3000

# Run en modo production con la build
CMD ["node", "dist/main.js"]
