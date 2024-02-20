import {terser} from 'rollup-plugin-terser';
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import wasm from "@rollup/plugin-wasm";
import resolve from '@rollup/plugin-node-resolve'
import commonjs from "@rollup/plugin-commonjs";
// import autoInstall from '@rollup/plugin-auto-install';
import beep from '@rollup/plugin-beep'
import nodeNatives from 'rollup-plugin-natives'
import jsccPlugin from "rollup-plugin-jscc";
// import fdts from 'rollup-plugin-flat-dts';
import nodeGlobals from "rollup-plugin-node-globals";

// pnpm i --force to install all prebuilt binaries.

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const platform =
    process.env.npm_config_target_platform ||
    process.env.npm_config_platform ||
    process.platform

const arch =
    process.env.npm_config_target_arch ||
    process.env.npm_config_arch ||
    process.arch

const platformId = (arch === 'arm64') ?
    `${platform}-arm64v8` :
    `${platform}-${arch}`

export default {
    input: 'src/index.ts',
    output: {
        format: 'es',
        file: 'dist/bin.js',
        sourcemap: true,
        plugins: []
    },
    // TODO: Find a way to bundle snappy
    external: ['snappy'],
    plugins: [
        jsccPlugin({
            values: {_NODEJS: 1},
        }),
        // autoInstall({manager: 'pnpm'}),
        commonjs({
            esmExternals: false,
            transformMixedEsModules: true,
            sourceMap: true,
        }),
        typescript({
            outputToFilesystem: true,
        }),
        nodeGlobals(),
        resolve({
            exportConditions: ['node-addons', 'node'],
            extensions: ['node'],
            allowExportsFolderMapping: false,
            browser: false,
            preferBuiltins: true,
        }),
        json({compact: true}),
        nodeNatives({
            copyTo: 'dist/lib',
            destDir: './lib',
            targetEsm: true,
            originTransform: arch
        }),
        wasm({targetEnv: "node"}),
        production & terser({
            toplevel: true,
            keep_fnames: false,
            compress: true,
            mangle: true,
            keep_classnames: false,
            enclose: false,
            module: false,
            format: {
                wrap_iife: false,
                shebang: true,
            }
        }),
        beep(),
        // fdts()
    ]
};
