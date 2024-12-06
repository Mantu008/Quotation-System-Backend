import { z } from "zod";

export const oasProductSpecReqDto = z.object({
    prod_id: z.number(),
    spec_name: z.string(),
    spec_val: z.string()
}).openapi({
	description: 'Product Specification Data Request Object',
	ref: 'ProductSpecReqDto',
});

export default interface ProductSpecReqDto {
    prod_id: number,
	spec_name: string,
	spec_val: string
}