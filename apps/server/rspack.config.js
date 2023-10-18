import {resolve} from "node:path";
import NodePolyfill from '@rspack/plugin-node-polyfill'
import {defineConfig} from "@rspack/cli";


// @ts-check
const config = defineConfig({
    context: resolve('./'),
    target: "async-node",
    entry: {
        main: ["./src/main.ts"],
    },
    plugins: [new NodePolyfill()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "builtin:swc-loader",
                    options: await import('./.swcrc.json', {assert: {type: "json"}})
                },
            },
            {
                test: /\.node$/,
                use: [
                    {
                        loader: 'node-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    externalsType: "commonjs",
    externals: [
        function (obj, callback) {
            const resource = obj.request;
            const lazyImports = [
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
            if (!lazyImports.includes(resource)) {
                return callback();
            }
            try {
                require.resolve(resource);
            } catch (err) {
                callback(null, resource);
            }
            callback();
        }
    ],
    output: {
        path: './dist',
        filename: "[name].bundle.js",
    }
});

export default config