ARG NODE_VERSION=20.19.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

FROM base as final


# Use production node environment by default.
ENV NODE_ENV production

COPY . .
COPY .next .
COPY package.json .
COPY package-lock.json .

RUN npm ci
# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run start
