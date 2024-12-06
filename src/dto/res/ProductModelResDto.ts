import { z } from "zod";

export const oasProductModelResDto = z.object({
    id: z.number(),
    category_id: z.number(),
    name: z.string(),
    prefix: z.string(),
    postfix: z.string(),
    hsn_code: z.string(),
    rate: z.number()
}).openapi({
    description: 'Product Model Number Response Object',
    ref: 'ProductModelResDto',
});

export default interface ProductModelResDto {
    id: number,
    category_id: number,
    name: string,
    prefix: string,
    postfix: string,
    hsn_code: string,
    rate: number
}
