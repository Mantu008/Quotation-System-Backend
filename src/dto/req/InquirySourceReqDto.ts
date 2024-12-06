import { z } from "zod";

export const oasInquirySourceReqDto = z.object({
    name: z.string()
}).openapi({
	description: 'Inquiry Source Request Object',
	ref: 'InquirySourceReqDto',
});

export default interface InquirySourceReqDto {
	name: string
}
