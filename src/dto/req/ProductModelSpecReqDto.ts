import { z } from "zod";

export const oasProductModelSpecReqDto = z.object({
    prod_mo_no_id: z.number(),
    spec_name: z.string()
}).openapi({
    description: 'Product Model Number Specification Request Object',
    ref: 'ProductModelSpecReqDto',
});

export default interface ProductModelSpecReqDto {
    prod_mo_no_id: number,
    spec_name: string
}
