FROM node:16-alpine

WORKDIR /usr/app/clean-node-api

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY ./dist ./dist

CMD npm start