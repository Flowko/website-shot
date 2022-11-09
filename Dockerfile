# Dockerfile
FROM node:16.18.1-alpine3.16

# create destination directory
WORKDIR /usr/src/website-shot

# update and install dependency
RUN apk add --no-cache chromium wqy-zenhei --repository http://nl.alpinelinux.org/alpine/edge/testing

# copy package.json and install dependencies
COPY package*.json /usr/src/website-shot/
RUN yarn install

# copy the app, note .dockerignore
COPY . /usr/src/website-shot/
RUN yarn generate
RUN yarn build

EXPOSE 3000

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
ENV PASSWORD_PROTECT 0
ENV PASSWORD null

CMD [ "yarn", "start" ]
