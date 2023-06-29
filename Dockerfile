FROM node:20-alpine

RUN corepack enable
RUN corepack prepare pnpm@latest --activate
RUN apk add --no-cache git chromium wqy-zenhei --repository http://nl.alpinelinux.org/alpine/edge/testing

WORKDIR /websiteshot


ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL \
    NUXT_HOST=0.0.0.0 \
    NUXT_PORT=3000


COPY package.json pnpm-lock.yaml .npmrc prisma ./

RUN pnpm install && \
    pnpm db:generate && \
    pnpm db:push && \
    pnpm db:seed

COPY . ./
RUN pnpm build

RUN pnpm db:seed

EXPOSE 3000

# HEALTHCHECK --interval=30s --timeout=30s --retries=5 \
#     CMD wget --spider http://localhost:3000 || exit 1

ENTRYPOINT ["pnpm", "start"]