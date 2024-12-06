import { z } from "zod";

export const oasProductModelReqDto = z.object({
    category_id: z.number(),
    name: z.string(),
    prefix: z.string(),
    postfix: z.string(),
    hsn_code: z.string(),
    rate: z.number(),
    specs: z.array(z.object({
        name: z.string(),
        values: z.array(z.object({
            spec_val: z.string(),
            spec_val_code: z.string()
        }))
    }))
}).openapi({
    description: 'Product Model Number Request Object',
    ref: 'ProductModelReqDto',
});

type SpecVals = {
    spec_val: string,
    spec_val_code: string
}

type Specs = {
    name: string,
    values: SpecVals[]
}

export default interface ProductModelReqDto {
    category_id: number,
    name: string,
    prefix: string,
    postfix: string,
    hsn_code: string,
    rate: number,
    specs: Specs[]
}
