FROM node

WORKDIR /app

COPY src/package.json ./

RUN npm install


EXPOSE 8080

CMD [ "node", "index.js" ]