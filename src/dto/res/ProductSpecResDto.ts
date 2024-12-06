import { z } from "zod";

export const oasProductSpecResDto = z.object({
    id: z.number(),
    prod_id: z.number(),
    spec_name: z.string(),
    spec_val: z.string()
}).openapi({
	description: 'Product Specification Data Response Object',
	ref: 'ProductSpecResDto',
});

export default interface ProductSpecResDto {
    id: number,
    prod_id: number,
	spec_name: string,
	spec_val: string
}