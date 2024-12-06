import { z } from "zod";

export const oasProductMetaResDto = z.object({
    id: z.number(),
    prod_id: z.number(),
    heading: z.string()
}).openapi({
	description: 'Product Meta Data Response Object',
	ref: 'ProductMetaResDto',
});

export default interface ProductMetaResDto {
    id: number,
    prod_id: number,
	heading: string
}