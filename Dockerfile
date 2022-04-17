# Dockerfile
FROM node:16.13.2-alpine

# create destination directory
WORKDIR /usr/src/website-shot

# update and install dependency
RUN apk add --no-cache git chromium

# copy package.json and install dependencies
COPY package*.json /usr/src/website-shot/
RUN npm install

# copy the app, note .dockerignore
COPY . /usr/src/website-shot/
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
