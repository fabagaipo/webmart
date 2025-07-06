FROM node:20-bullseye-slim

WORKDIR /app

COPY package*.json /app

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "dev" ]