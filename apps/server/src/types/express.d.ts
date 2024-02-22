import { IFingerprint } from '../kernel/platform/http/middleware/fingerprint';
import { Account }      from '../modules/account/entities/account';
import * as express      from 'express';

declare module 'express' {
  export interface Response extends express.Response {
    account?: Account;
    fingerprint?: IFingerprint;
  }
}
