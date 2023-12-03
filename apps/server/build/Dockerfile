FROM node:18 as BUILD

WORKDIR /tmp

# Install Syft for SBOM generation
RUN curl -sSfL https://raw.githubusercontent.com/anchore/syft/main/install.sh | sh -s -- -b /usr/local/bin

# Existing build commands
RUN npm install -g pnpm@8.10.3 && mkdir -p /usr/.pnpm-store
COPY ./package.json pnpm-lock.yaml ./
COPY ./prisma/ ./
COPY ./tsconfig.compodoc.json ./
RUN pnpm install --cache /usr/.pnpm-store
COPY . .
RUN pnpm run db:generate && pnpm run build:tsc

# Generate SBOM
RUN syft packages -o json > /tmp/sbom.json

# ---------------------------------------------------------

FROM node:18 as RUNTIME

# User and group setup
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup appuser && \
    mkdir /usr/bin/application && \
    chown -R appuser:appgroup /usr/bin/application

WORKDIR /usr/bin/application

# Copy application and SBOM
COPY --from=BUILD /tmp/node_modules /usr/bin/application/node_modules
COPY --from=BUILD /tmp/dist /usr/bin/application/dist
COPY --from=BUILD /tmp/package.json /usr/bin/application/package.json
COPY --from=BUILD /tmp/sbom.json /usr/bin/application/sbom.json

USER appuser

EXPOSE 80
EXPOSE 443

CMD ["node", "/usr/bin/application/dist/main.js"]
