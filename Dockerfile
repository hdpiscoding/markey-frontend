FROM node:18-alpine

WORKDIR /app

COPY package.json .

ENV NODE_OPTIONS="--max-old-space-size=2096"

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "serve", "-s", "build", "-p", "80" ]