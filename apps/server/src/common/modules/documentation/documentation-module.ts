import { Module }            from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import process               from 'node:process'
import path                  from 'path'
import {fileURLToPath}       from 'url'
import { CompodocModule }    from './compodoc/compodoc.module.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const absoluteDir = path.resolve(__dirname);
const dir = path.join(absoluteDir, 'public');

@Module( {
			  imports     : [
				 CompodocModule,
				 ServeStaticModule.forRoot( {
														rootPath  : dir,
														serveRoot : '/api',
													 } ),
			  ],
			  controllers : [],
			  providers   : [],
			  exports     : [],
			} )
export class DocumentationModule
  {

  }