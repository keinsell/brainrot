import {tags} from 'typia'
import type {Opaque} from '../../libraries/opaque.js'



export type DurationString = Opaque<string & tags.Format<"duration">, 'duration'>