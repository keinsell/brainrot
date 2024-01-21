import { Injectable }   from '@nestjs/common'
import { ErrorCatcher } from '../../contract/error-catcher/error-catcher.js'



@Injectable()
export class SentryErrorCatcher
  extends ErrorCatcher
  {
	 public captureException(error : unknown) : void
		{
		  // TODO: implement this
		}
  }