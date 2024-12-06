import { z } from "zod";

export const oasProductModelSpecValResDto = z.object({
    id: z.number(),
    prod_mo_no_prod_spec_id: z.number(),
    spec_value: z.string(),
    spec_code: z.string()
}).openapi({
    description: 'Product Model Number Specification Value Response Object',
    ref: 'ProductModelSpecValResDto',
});

export default interface ProductModelSpecValResDto {
    id: number,
    prod_mo_no_prod_spec_id: number,
    spec_value: string,
    spec_code: string
}
