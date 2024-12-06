import { z } from "zod";

export const productMetaItemReqDto = z.object({
    prod_meta_id: z.number(),
    name: z.string(),
    value: z.string()
}).openapi({
	description: 'Product Meta Items Request Object',
	ref: 'ProductMetaItemReqDto',
});

export default interface ProductMetaItemReqDto {
    prod_meta_id: number,
	name: string,
	value: string
}