FROM node:17.8.0

RUN mkdir -p /usr/src/sportsstore

COPY dist/sports-store /usr/src/sportsstore/dist/sports-store
COPY ssl /usr/src/sportsstore/ssl

COPY authMiddleware.js /usr/src/sportsstore/
COPY serverdata.json /usr/src/sportsstore
COPY server.js /usr/src/sportsstore
COPY deploy-package.json /usr/src/sportsstore/package.json

WORKDIR /usr/src/sportsstore

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]