import {ImmutableClass} from "../../../common/libraries/dst/data-class/data-class.js"



export class Email extends ImmutableClass {
	address: string;
	isVerified: boolean
}