FROM node:9.5.0-alpine

COPY . /app

WORKDIR /app

RUN npm install --silent --progress=false --production

CMD ["npm", "start"]

EXPOSE 3000