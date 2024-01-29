import { Module }            from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import {join}                from 'node:path'
import process               from 'node:process'
import path                  from 'path'
import {fileURLToPath}       from 'url'
import { CompodocModule }    from './compodoc/compodoc.module.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Module( {
			  imports     : [
				 CompodocModule,
				 ServeStaticModule.forRoot( {
									rootPath : join( __dirname, 'swagger','public', "api" ),
					 									serveRoot: "/api",
													 } ),
			  ],
			  controllers : [],
			  providers   : [],
			  exports     : [],
			} )
export class DocumentationModule
  {

  }