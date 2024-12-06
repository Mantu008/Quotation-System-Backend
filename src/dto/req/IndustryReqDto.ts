import { z } from "zod";

export const oasIndustryReqDto = z.object({
    name: z.string()
}).openapi({
	description: 'Industry Request Object',
	ref: 'IndustryReqDto',
});

export default interface IndustryReqDto {
	name: string
}
