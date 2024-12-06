import { z } from "zod";

export const oasProductMetaReqDto = z.object({
    prod_id: z.number(),
    heading: z.string()
}).openapi({
	description: 'Product Meta Information Request Object',
	ref: 'ProductMetaReqDto',
});

export default interface ProductMetaReqDto {
    prod_id: number,
	heading: string
}