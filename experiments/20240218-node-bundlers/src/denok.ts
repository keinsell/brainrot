import express          from 'express'
import {getPort}        from 'get-port-please'
import {Buffer}         from 'node:buffer'
import {createServer}   from 'node:http'
import pg               from 'pg'
import snappy           from 'snappy'



const pgc = new pg.Client()

console.log('Created pg.Client')

const uncompressedBuffer = new Buffer('asdasdsadsad'.repeat(128))

console.log('Created buffer', uncompressedBuffer.byteLength)

const compressed = snappy.compressSync(uncompressedBuffer)

console.log('Compressed buffer with NAPI', compressed.byteLength)

const uncompressed = await snappy.uncompress(compressed)

console.log('Decompressed', (
	uncompressed as Buffer
).byteLength)

console.log('Hello')

const app = express()

console.log('Created express app')

const server2 = createServer()

const port = getPort(8038)

console.log('Got a port with external library', await port)

//throw new Error('This is a test error')