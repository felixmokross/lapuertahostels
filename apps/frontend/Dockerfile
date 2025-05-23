# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="React Router"

# React Router app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install latest corepack to work around this issue: https://github.com/nodejs/corepack/issues/612
RUN npm install -g corepack@latest

RUN corepack enable pnpm

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY --link apps/frontend/package.json apps/frontend/
RUN pnpm --filter frontend install --prod=false --frozen-lockfile

# Copy application code
COPY --link apps/frontend apps/frontend
COPY --link libs/shared libs/shared
COPY --link libs/payload-types libs/payload-types

# Build application
RUN pnpm --filter frontend build

# Remove development dependencies
RUN pnpm --dir apps/frontend prune --prod


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "pnpm", "--filter", "frontend", "start" ]
