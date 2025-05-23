FROM node:20-alpine

WORKDIR /usr/app

COPY . .

COPY .env .env

RUN npm ci

RUN npm run build

CMD ["npm", "start"]