FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ADD views/imagesPages.ejs /app/views/imagesPages.ejs

ENV PORT=3000

EXPOSE 3000

CMD [ "npm","start" ]