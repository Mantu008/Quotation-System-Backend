import { z } from "zod";

export const oasIndustryResDto = z.object({
    id: z.number(),
    name: z.string()
}).openapi({
	description: 'Industry Response Object',
	ref: 'IndustryResDto',
});

export default interface IndustryResDto {
    id: number,
	name: string
}
