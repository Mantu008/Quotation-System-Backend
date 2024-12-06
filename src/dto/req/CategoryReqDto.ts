import { z } from "zod";

export const oasCategoryReqDto = z.object({
    name: z.string()
}).openapi({
	description: 'Category Request Object',
	ref: 'CategoryReqDto',
});

export default interface CategoryReqDto {
	name: string;
}
