# Dockerfile
FROM node:16.13.2-alpine

# create destination directory
RUN mkdir -p /usr/src/website-shot
WORKDIR /usr/src/website-shot

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git
RUN apk add chromium
RUN PUPPETEER_PRODUCT=firefox npm i puppeteer

# copy the app, note .dockerignore
COPY . /usr/src/website-shot/
RUN npm install
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
