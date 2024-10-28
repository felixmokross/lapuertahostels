FROM node:18.8-alpine as base

FROM base as builder

ARG PAYLOAD_PUBLIC_LIVE_PREVIEW_URL

WORKDIR /home/node/app
COPY package*.json ./

COPY . .
RUN npm ci
RUN npm run build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app
COPY package*.json  ./

# Clean-install again, now without dev dependencies due to NODE_ENV=production
RUN npm ci
COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3001

CMD ["node", "dist/server.js"]
