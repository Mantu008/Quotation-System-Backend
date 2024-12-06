import { z } from "zod";

export const oasProductModelSpecResDto = z.object({
    id: z.number(),
    prod_mo_no_id: z.number(),
    spec_name: z.string()
}).openapi({
    description: 'Product Model Number Specification Response Object',
    ref: 'ProductModelSpecResDto',
});

export default interface ProductModelSpecResDto {
    id: number,
    prod_mo_no_id: number,
    spec_name: string
}
