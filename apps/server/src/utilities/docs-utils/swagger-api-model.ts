import {SetMetadata} from '@nestjs/common';

// This store will keep each DTO's custom metadata in a { DTOName: metadata } format.
const modelMetadataStore = {};

export const ApiModel = ({
	name,
	description,
}: { name?: string; description?: string } = {}): ClassDecorator => {
	return (target: Function) => {

		// Use NestJS built-in `SetMetadata` to store your metadata as usual.
		SetMetadata('API_MODEL_METADATA', {
			name,
			description,
		})(target);

		// Also store the metadata to `modelMetadataStore` for later usage.
		modelMetadataStore[target.name] = {
			name,
			description,
		};
	};
};


// Export this function, we will use it later.
export function getMetadataStore() {
	return modelMetadataStore;
}