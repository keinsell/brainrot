import {resolve} from "node:path";
import NodePolyfill from '@rspack/plugin-node-polyfill'
import {defineConfig} from "@rspack/cli";

const configObject = {
    jsc: {
        parser: {
            syntax: "typescript",
            jsx: false,
            dynamicImport: true,
            privateMethod: false,
            functionBind: false,
            exportDefaultFrom: false,
            exportNamespaceFrom: false,
            decorators: true,
            decoratorsBeforeExport: true,
            topLevelAwait: true,
            importMeta: true,
            preserveAllComments: false
        },
        transform: {
            legacyDecorator: true,
            decoratorMetadata: true
        },
        loose: false,
        externalHelpers: true,
        keepClassNames: true
    },
    module: {
        type: "es6",
        importInterop: "node",
        noInterop: false,
        lazy: false
    },
    isModule: true,
    env: {
        targets: {
            node: "current"
        }
    }
};


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
                    // options: {
                    //     jsc: {
                    //         parser: {
                    //             syntax: "typescript",
                    //             decorators: true
                    //         },
                    //         transform: {
                    //             legacyDecorator: true,
                    //             decoratorMetadata: true
                    //         }
                    //     },
                    //     module: {
                    //         type: "es6"
                    //     }
                    // }
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                jsx: false,
                                target: "es2022",
                                dynamicImport: false,
                                privateMethod: false,
                                functionBind: false,
                                exportDefaultFrom: false,
                                exportNamespaceFrom: false,
                                decorators: true,
                                decoratorsBeforeExport: true,
                                topLevelAwait: true,
                                importMeta: true,
                                preserveAllComments: false
                            },
                            transform: {
                                legacyDecorator: true,
                                decoratorMetadata: true
                            },
                            loose: false,
                            externalHelpers: true,
                            keepClassNames: true
                        },
                        module: {
                            type: "es6",
                            importInterop: "node",
                            noInterop: false,
                            lazy: false
                        },
                        isModule: true,
                        env: {
                            targets: {
                                node: "18"
                            }
                        }
                    },
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
        filename: "[name].bundle.cjs",
    }
});

export default config