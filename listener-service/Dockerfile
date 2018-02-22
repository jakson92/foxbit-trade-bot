FROM node:9.5.0-alpine

COPY . /app

RUN cd app && npm install

WORKDIR /app

CMD ["npm", "start"]

EXPOSE 3000