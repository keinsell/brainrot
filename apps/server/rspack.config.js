import {resolve} from "node:path";
import {defineConfig} from "@rspack/cli";
import NodePolyfill from "@rspack/plugin-node-polyfill";

const LAZY_IMPORTS_IGNORE = [
    '@fastify/static',
    '@fastify/view',
    '@nestjs/microservices',
    '@nestjs/microservices/microservices-module',
    '@nestjs/platform-express',
    '@nestjs/websockets/socket-module',
    'amqp-connection-manager',
    'amqplib',
    'cache-manager',
    'cache-manager/package.json',
    'class-transformer/storage',
    'hbs',
    'ioredis',
    'kafkajs',
    'mqtt',
    'nats',
];

const LAZY_IMPORTS_EXTERNALS = [
    "@nestjs/core",
    "@nestjs/microservices",
    "@nestjs/platform-express",
    "@nestjs/mapped-types",
    "node-fetch",
    "cache-manager",
    "class-validator",
    "class-transformer",
    "@nestjs/microservices/microservices-module",
    "@nestjs/websockets",
    "socket.io-adapter",
    "utf-8-validate",
    "bufferutil",
    "kerberos",
    "@mongodb-js/zstd",
    "snappy",
    "@aws-sdk/credential-providers",
    "mongodb-client-encryption",
    "@nestjs/websockets/socket-module",
    "bson-ext",
    "snappy/package.json",
    "aws4"
];

function checkResourceToIgnore(resource) {
    if (!LAZY_IMPORTS_IGNORE.includes(resource)) {
        return false;
    }
    try {
        require.resolve(resource, {paths: [process.cwd()]});
    } catch (err) {
        return true;
    }
    return false;
}

function externalsFunction(obj, callback) {
    const resource = obj.request;
    if (!LAZY_IMPORTS_EXTERNALS.includes(resource)) {
        return callback();
    }
    try {
        require.resolve(resource);
    } catch (err) {
        callback(null, resource);
    }
    callback();
}

// @ts-check
const config = defineConfig({
    context: resolve('./'),
    target: "async-node",
    entry: {
        main: ["./src/main.ts"],
    },
    plugins: [
        new NodePolyfill(),
        // new IgnorePlugin({checkResource: checkResourceToIgnore}),
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        mainFields: ['main'],
        // tsConfigPaths: 'tsconfig.json',
    },
    externalsType: "commonjs",
    externals: [externalsFunction],
    output: {
        path: './dist',
        filename: "bundle.js",
    }
});

export default config