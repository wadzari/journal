FROM node:16.16.0-alpine as dependencies

WORKDIR /journal
COPY package.json yarn.lock ./

COPY components components
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

RUN yarn install --frozen-lockfile

FROM node:16.16.0-alpine as builder
WORKDIR /journal

COPY . .
COPY --from=dependencies /journal/node_modules ./node_modules
RUN yarn build

FROM node:16.16.0-alpine as runner
WORKDIR /journal

# -> from proccess .env.development, env.production
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /journal/next.config.js ./
COPY --from=builder /journal/public ./public
COPY --from=builder /journal/package.json ./package.json
COPY --from=builder /journal/.next ./.next
COPY --from=builder /journal/node_modules ./node_modules
COPY --from=builder /journal/dev_robots.txt ./

ARG no_robots
RUN if [ "${no_robots}" = "true" ] ; then mv ./dev_robots.txt ./public/robots.txt ; else echo robots.txt allowed ; fi

ENV PORT 3000

EXPOSE $PORT


CMD ["yarn", "start"]
