FROM node:18 as BUILD

WORKDIR /tmp

# RUN apk update && apk upgrade

RUN npm install -g pnpm && mkdir -p /usr/.pnpm-store

COPY ./package.json pnpm-lock.yaml ./

COPY ./prisma/ ./
COPY ./tsconfig.compodoc.json ./

RUN pnpm install --cache /usr/.pnpm-store

COPY . .

RUN pnpm run db:generate
RUN pnpm run build

# ---------------------------------------------------------

FROM node:18 as RUNTIME

RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup appuser && \
    mkdir /usr/bin/application && \
    chown -R appuser:appgroup /usr/bin/application && \
    chmod -R 755 /usr/bin/application

WORKDIR /usr/bin/application

COPY --from=BUILD /tmp/node_modules /usr/bin/application/node_modules
COPY --from=BUILD /tmp/dist/src /usr/bin/application/src
COPY --from=BUILD /tmp/dist/src /usr/bin/application/src
COPY --from=BUILD /tmp/prisma /usr/bin/application/prisma

RUN chown -R appuser:appgroup /usr/bin/application/src && \
    chmod -R 755 /usr/bin/application/src

USER appuser

EXPOSE 80
EXPOSE 443

CMD ["node", "/usr/bin/application/src/main.js"]