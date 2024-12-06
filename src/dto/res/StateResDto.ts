import { z } from "zod";

export const oasStateResDto = z.object({
    id: z.number(),
    name: z.string(),
    code_name: z.string(),
    code_no: z.number(),
}).openapi({
	description: 'State Response Object',
	ref: 'StateResDto',
});

export default interface StateResDto {
    id: number,
    name: string,
    code_name: string,
    code_no: number
}