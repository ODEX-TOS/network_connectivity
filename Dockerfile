FROM node

WORKDIR /app

COPY src/package.json ./

COPY entrypoint.sh /entrypoint.sh

EXPOSE 8080

CMD [ "sh", "/entrypoint.sh" ]