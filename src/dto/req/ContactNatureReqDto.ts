import { z } from "zod";

export const oasContactNatureReqDto = z.object({
    name: z.string()
}).openapi({
	description: 'Contact Nature Request Object',
	ref: 'ContactNatureReqDto',
});

export default interface ContactNatureReqDto {
	name: string
}
