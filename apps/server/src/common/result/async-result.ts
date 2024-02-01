import { Result } from 'neverthrow'



export type AsyncResult<R, E> = Promise<Result<R, E>>
