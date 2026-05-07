FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE ${CLIENT_PORT}
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
