import { z } from "zod";

export const productMetaItemResDto = z.object({
    id: z.number(),
    prod_meta_id: z.number(),
    name: z.string(),
    value: z.string()
}).openapi({
	description: 'Product Meta Items Response Object',
	ref: 'ProductMetaItemResDto',
});

export default interface ProductMetaItemResDto {
    id: number,
    prod_meta_id: number,
	name: string,
	value: string
}