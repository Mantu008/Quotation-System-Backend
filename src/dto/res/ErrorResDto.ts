import { z } from "zod";

export const oasErrorResDto = z.object({
	timestamp: z.string(),
	code: z.string(),
	message: z.string(),
	details: z.string()
}).openapi({
	description: 'Error Response Object',
	ref: 'ErrorResDto',
});

export default interface ErrorResDto {
	timestamp: Date;
	code: string;
	message: string;
	details: string;
}
