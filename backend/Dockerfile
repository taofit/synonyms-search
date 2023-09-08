FROM node:20-alpine3.17 AS base

LABEL version="1.0"
LABEL description="This is the base docker image for the synonyms search backend API."
LABEL maintainer = ["tao_sun@hotmail.com"]

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install 
COPY . .
EXPOSE 5001
CMD ["npm", "run", "dev"]

FROM base as production
ENV NODE_PATH=./build
RUN npm run build