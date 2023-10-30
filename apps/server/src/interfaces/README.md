# Interfaces

Interfaces is directory where external programming language is defined, this can be any communication language, like
RESTful API, GraphQL, gRPC, Socket, WebSocket, MQTT, AMQP, etc. - purpose of this directory and layer is only viable in
terms on microservices where boundary is defined and do not expose external API to the world (ex. HTTP/GQL) in such case
we would probably like to define application-wide interface which will merge these services to specific model and expose
it to the world.

## `http` | RESTful API

RESTful API is defined in `http` directory, this directory contains `routes` and `controllers` directory.

## `gql` | GraphQL

GraphQL is defined in `gql` directory, this directory contains `schema` and `resolvers` directory.

## `grpc` | gRPC

gRPC is defined in `grpc` directory, this directory contains `proto` and `service` directory.

## `socket` | Socket

## `ws` | WebSocket

## `mqtt` | MQTT

## `amqp` | AMQP