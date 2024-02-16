import {ApiNotFoundResponse} from '@nestjs/swagger'
import {HttpProblem}         from '../../../../kernel/error/problem-details/http-problem.js'



export const ApiAuthenticateNotFoundResponse = ApiNotFoundResponse({
	                                                                   description: 'The user could not be found.',
	                                                                   type       : HttpProblem,
                                                                   })