FROM node:18 AS BUILD

WORKDIR /tmp

# Install pnpm
RUN npm install -g pnpm && mkdir -p /usr/.pnpm-store

# Copy package.json and pnpm-lock.yaml and install dependencies
COPY ./package.json ./pnpm-lock.yaml ./

# Install dependencies with or without cache based on the USE_BUILDKIT environment variable
RUN if [ "$USE_BUILDKIT" = "1" ]; then \
        --mount=type=cache,target=/usr/.pnpm-store \
        pnpm install --cache /usr/.pnpm-store --ignore-scripts; \
    else \
        pnpm install --cache /usr/.pnpm-store --ignore-scripts; \
    fi

# Copy Prisma schema and generate Prisma client
COPY ./prisma ./prisma/
RUN pnpm prisma generate

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# ---------------------------------------------------------

FROM node:18 AS RUNTIME

RUN addgroup --system application_users && \
    adduser --system --ingroup application_users application_user && \
    mkdir /usr/bin/application && \
    chown -R application_user:application_users /usr/bin/application && \
    chmod -R 755 /usr/bin/application

WORKDIR /usr/bin/application

COPY --from=BUILD /tmp/node_modules /usr/bin/application/node_modules
COPY --from=BUILD /tmp/dist/src /usr/bin/application/dist/src
COPY --from=BUILD /tmp/package.json /usr/bin/application/package.json

RUN chown -R application_user:application_users /usr/bin/application/dist/src && \
    chmod -R 755 /usr/bin/application/dist/src

USER application_user

# Set the NODE_ENV to production as a default
ENV NODE_ENV production

EXPOSE 80
EXPOSE 443

CMD ["node", "/usr/bin/application/dist/src/main.js"]