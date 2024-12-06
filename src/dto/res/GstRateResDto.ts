import { z } from "zod";

export const oasGstRateResDto = z.object({
    id: z.number(),
    name: z.string(),
    cgst: z.number(),
    sgst: z.number(),
    igst: z.number()
}).openapi({
	description: 'GstRate Response Object',
	ref: 'GstRateResDto',
});

export default interface GstRateResDto {
    id: number,
	name: string,
    cgst: number,
    sgst: number,
    igst: number
}
