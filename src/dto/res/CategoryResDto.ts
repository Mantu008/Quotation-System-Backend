import { z } from "zod";

export const oasCategoryResDto = z.object({
	id: z.number(),
    name: z.string()
}).openapi({
	description: 'Category Response Object',
	ref: 'CategoryResDto',
});

export default interface CategoryResDto {
	id: number;
	name: string;
}
