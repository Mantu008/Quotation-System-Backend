import { z } from "zod";

export const oasBusinessInfoOtherResDto = z.object({
    id: z.number(),
    no: z.number(),
    name: z.string(),
    text: z.string(),
    is_in_quo: z.number(),
    is_in_pi: z.number()
}).openapi({
	description: 'Business Information Other Response Object',
	ref: 'BusinessInfoOtherResDto',
});

export default interface BusinessInfoOtherResDto {
    id: number,
    no: number,
    name: string,
    text: string,
    is_in_quo: number,
    is_in_pi: number
}
