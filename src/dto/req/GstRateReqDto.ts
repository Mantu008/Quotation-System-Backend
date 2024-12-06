import { z } from "zod";

export const oasGstRateReqDto = z.object({
    name: z.string(),
    cgst: z.number(),
    sgst: z.number(),
    igst: z.number()
}).openapi({
	description: 'GstRate Request Object',
	ref: 'GstRateReqDto',
});

export default interface GstRateReqDto {
	name: string,
    cgst: number,
    sgst: number,
    igst: number
}
