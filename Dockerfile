FROM node:20-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]
