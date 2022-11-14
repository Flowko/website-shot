# Dockerfile
FROM node:16.18.1-alpine

# create destination directory
WORKDIR /usr/src/website-shot

# update and install dependency
RUN apk add --no-cache git chromium wqy-zenhei --repository http://nl.alpinelinux.org/alpine/edge/testing

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
ENV RUNNING_DOCKER 1
ENV USER_AGENT "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
ENV BLOCK_ADS 1

CMD [ "yarn", "start" ]
