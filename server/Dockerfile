FROM node:22-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run prisma:generate

USER node

EXPOSE ${SERVER_PORT}

CMD ["npm", "run", "start:dev"]
