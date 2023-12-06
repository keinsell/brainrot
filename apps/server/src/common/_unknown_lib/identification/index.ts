export class Identification {}


export type NSUID<T extends string = string> = `${T}_${string}` | string;
export type CUID = string;

export type UUIDV4 = `${string}-${string}-${string}-${string}-${string}`;
export type UUIDV5 = `${string}-${string}-${string}-${string}-${string}`;
export type UUIDV7 = `${string}-${string}-${string}-${string}-${string}`;
export const NIL_UUID = '00000000-0000-0000-0000-000000000000'

export type KSUID = string;

export type UUID = UUIDV4 | UUIDV5 | UUIDV7;

export type UniqueIdentifier =
	string
	| number
	| bigint
	| NSUID
	| CUID
	| UUID
	| KSUID;