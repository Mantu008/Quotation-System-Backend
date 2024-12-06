import { z } from "zod";

export const oasCompetitorResDto = z.object({
    id: z.number(),
    name: z.string()
}).openapi({
	description: 'Competitor Response Object',
	ref: 'CompetitorResDto',
});

export default interface CompetitorResDto {
    id: number,
	name: string
}
