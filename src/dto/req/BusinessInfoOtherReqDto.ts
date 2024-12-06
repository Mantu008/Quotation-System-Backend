import { z } from "zod";

export const oasBusinessInfoOtherReqDto = z.object({
    no: z.number(),
    name: z.string(),
    text: z.string(),
    is_in_quo: z.number(),
    is_in_pi: z.number()
}).openapi({
	description: 'Business Information Other Request Object',
	ref: 'BusinessInfoOtherReqDto',
});

export default interface BusinessInfoOtherReqDto {
    no: number,
    name: string,
    text: string,
    is_in_quo: number,
    is_in_pi: number
}
