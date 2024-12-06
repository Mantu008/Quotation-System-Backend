import { z } from "zod";

export const oasContactNatureResDto = z.object({
    id: z.number(),
    name: z.string()
}).openapi({
	description: 'Contact Nature Response Object',
	ref: 'ContactNatureResDto',
});

export default interface ContactNatureResDto {
    id: number,
	name: string
}
