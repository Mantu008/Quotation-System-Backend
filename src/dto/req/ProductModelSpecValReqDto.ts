import { z } from "zod";

export const oasProductModelSpecValReqDto = z.object({
    prod_mo_no_prod_spec_id: z.number(),
    spec_value: z.string(),
    spec_code: z.string()
}).openapi({
    description: 'Product Model Number Specification Value Request Object',
    ref: 'ProductModelSpecValReqDto',
});

export default interface ProductModelSpecValReqDto {
    prod_mo_no_prod_spec_id: number,
    spec_value: string,
    spec_code: string
}
