// import autoInstall from '@rollup/plugin-auto-install';
import beep from '@rollup/plugin-beep'
import commonjs from '@rollup/plugin-commonjs'
// import typescript from "@rollup/plugin-typescript";
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import wasm from '@rollup/plugin-wasm'
import nodeNatives from 'rollup-plugin-natives'
// import fdts from 'rollup-plugin-flat-dts';
import nodeGlobals from 'rollup-plugin-node-globals'
import swc from 'rollup-plugin-swc3'
import {terser} from "rollup-plugin-terser";

// When building production-ready configuration of Rollup
// Official repository would be good reference
// https://github.com/rollup/rollup/blob/master/rollup.config.ts


//const TREESHAKE_OPS: RollupOptions['treeshake'] = {
//	moduleSideEffects      : false,
//	propertyReadSideEffects: false,
//	tryCatchDeoptimization : false,
//	preset                 : 'recommended',
//}

const USE_SWC = false

const transpilers = {
    tsc: typescript({
        outputToFilesystem: false,
    }),
    swc: swc({sourceMaps: true}),
}

const typescriptTranspiler = transpilers.tsc
const swcTranspiler = transpilers.swc

export default {
    input: 'src/index.ts',
    treeshake: {
        preset: 'recommended',
    },
    output: {
        format: 'es',
        file: 'dist/bin.js',
        sourcemap: true,
        plugins: [],
    },
    external: ['snappy'],
    plugins: [
        USE_SWC ? swcTranspiler : typescriptTranspiler,
        commonjs({
            esmExternals: true,
            transformMixedEsModules: true,
            sourceMap: true,
            strictRequires: true,
        }),
        nodeGlobals(),
        resolve({
            exportConditions: [
                'node-addons',
                'node',
            ],
            extensions: ['node'],
            allowExportsFolderMapping: true,
            browser: false,
            preferBuiltins: true,
        }),
        json({compact: true, preferConst: true, namedExports: true}),
        nodeNatives({
            copyTo: 'dist/lib',
            destDir: './lib',
            targetEsm: true,
            sourcemap: true,
        }),
        wasm({targetEnv: 'node', }),
        terser({
        			                    toplevel       : true,
        			                    keep_fnames    : false,
        			                    compress       : true,
        			                    mangle         : true,
        			                    keep_classnames: false,
        			                    enclose        : false,
        			                    module         : true,
        			                    format         : {
        				                    wrap_iife: false,
        				                    shebang  : true,
        			                    },
        		                    }),
        beep(),
    ],
}
