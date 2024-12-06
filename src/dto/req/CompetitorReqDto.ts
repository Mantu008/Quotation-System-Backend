import { z } from "zod";

export const oasCompetitorReqDto = z.object({
    name: z.string()
}).openapi({
	description: 'Competitor Request Object',
	ref: 'CompetitorReqDto',
});

export default interface CompetitorReqDto {
	name: string
}
