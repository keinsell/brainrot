FROM node:18 as BUILD

WORKDIR /tmp

# RUN apk update && apk upgrade

RUN npm install -g pnpm@8.10.3 && mkdir -p /usr/.pnpm-store

COPY ./package.json pnpm-lock.yaml ./

COPY ./prisma/ ./
COPY ./tsconfig.compodoc.json ./

RUN pnpm install --cache /usr/.pnpm-store

COPY . .

RUN pnpm run db:generate
RUN pnpm run build:tsc

# ---------------------------------------------------------

FROM node:18 as RUNTIME

# RUN apk upgrade --available

RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup appuser && \
    mkdir /usr/bin/application && \
    chown -R appuser:appgroup /usr/bin/application

WORKDIR /usr/bin/application

COPY --from=BUILD /tmp/node_modules /usr/bin/application/node_modules
COPY --from=BUILD /tmp/dist /usr/bin/application/dist
COPY --from=BUILD /tmp/package.json /usr/bin/application/package.json

USER appuser

EXPOSE 80
EXPOSE 443

CMD ["node", "/usr/bin/application/dist/main.js"]