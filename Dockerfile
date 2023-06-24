FROM node:20 as builder

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

WORKDIR /websiteshot

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL \
    NUXT_HOST=0.0.0.0 \
    NUXT_PORT=3000


COPY package.json pnpm-lock.yaml .npmrc ./

RUN pnpm install --shamefully-hoist --force && \
    db:generate && \
    pnpm db:push

COPY . ./
RUN pnpm build

ENV NODE_ENV production
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --retries=5 \
    CMD wget --spider http://localhost:3000 || exit 1

ENTRYPOINT ["pnpm", "start"]