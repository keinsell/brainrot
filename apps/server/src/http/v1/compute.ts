// Controller that is intented to take few good seconds to return request to test functionality of cache.

import {
	Controller,
	Get,
}                       from '@nestjs/common'
import {ApiOperation}   from '@nestjs/swagger'
import * as crypto      from 'crypto'
import {CombinedLogger} from '../../common/logger/logger.js'



@Controller('compute')
export class ComputeController
{
	@ApiOperation({
		              description: 'Compute the shit',
	              }) @Get()
	private compute(): any
	{
		let i            = 0
		const shittyData = []

		while (i < 100_000)
		{
			new CombinedLogger().debug(`Computing the shit ${i}/100_000`)
			shittyData.push({id: crypto.randomBytes(32)})
			i++
		}

		return shittyData
	}
}
