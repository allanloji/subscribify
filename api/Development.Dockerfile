FROM node:alpine As development


WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

# Bundle app source
COPY --chown=node:node . .

RUN npm run prisma:generate