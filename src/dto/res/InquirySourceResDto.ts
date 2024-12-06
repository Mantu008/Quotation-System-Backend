import { z } from "zod";

export const oasInquirySourceResDto = z.object({
    id: z.number(),
    name: z.string()
}).openapi({
	description: 'Inquiry Source Response Object',
	ref: 'InquirySourceResDto',
});

export default interface InquirySourceResDto {
    id: number,
	name: string
}
