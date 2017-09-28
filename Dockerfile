FROM node:7.7.2-alpine

WORKDIR /dist/
COPY package.json .
COPY /test .
RUN npm install

COPY . .
