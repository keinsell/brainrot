import {ImmutableClass} from "../../../common/libraries/dst/data-class/data-class.js"
import typia, {tags}    from "typia";



export class Email
	extends ImmutableClass {
	address : string & tags.Format<"email">
	isVerified : boolean

	validate() : any {
		return typia.assert<Email>(this)
	}
}