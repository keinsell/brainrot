ARG PG_VERSION=15
FROM postgres:${PG_VERSION}
RUN apt-get update

ARG WRAPPERS_VERSION=0.2.0
ARG TARGETARCH

RUN set -eux; \
    ARCH="$(dpkg --print-architecture)"; \
    case "${ARCH}" in \
       aarch64|arm64) \
         TARGETARCH='arm64'; \
         ;; \
       amd64|x86_64) \
         TARGETARCH='amd64'; \
         ;; \
       *) \
         echo "Unsupported arch: ${ARCH}"; \
         exit 1; \
         ;; \
    esac;


ENV build_deps ca-certificates \
  git \
  build-essential \
  libpq-dev \
  postgresql-server-dev-${PG_MAJOR} \
  curl \
  libreadline6-dev \
  zlib1g-dev

RUN apt-get install -y --no-install-recommends $build_deps pkg-config cmake

WORKDIR /home/pg_graphql

ENV HOME=/home/pg_graphql
ENV PATH=/root/.cargo/bin:$PATH

ENV HOME=/home/pg_graphql \
  PATH=/home/pg_graphql/.cargo/bin:$PATH

RUN \
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --no-modify-path --profile minimal --default-toolchain nightly && \
  rustup --version && \
  rustc --version && \
  cargo --version


# PGRX
RUN cargo install cargo-pgrx --version 0.11.2 --locked
RUN cargo pgrx init --pg15 /usr/lib/postgresql/15/bin/pg_config

RUN git clone https://github.com/supabase/pg_graphql.git ./x

WORKDIR /home/pg_graphql/x

RUN cargo pgrx package --pg-config /usr/lib/postgresql/15/bin/pg_config

# Install precompiled supabase wrappers extensions
RUN curl -L "https://github.com/supabase/wrappers/releases/download/v${WRAPPERS_VERSION}/wrappers-v${WRAPPERS_VERSION}-pg${PG_MAJOR}-${TARGETARCH}-linux-gnu.deb" -o wrappers.deb
RUN dpkg --install wrappers.deb


