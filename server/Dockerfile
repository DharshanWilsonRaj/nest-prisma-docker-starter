FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run prisma:generate
RUN chown -R node:node /app

USER node

EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "start:dev"]
