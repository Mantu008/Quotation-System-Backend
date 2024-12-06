import { z } from "zod";

export const oasStateReqDto = z.object({
    name: z.string(),
    code_name: z.string(),
    code_no: z.number(),
}).openapi({
	description: 'State Response Object',
	ref: 'StateReqDto',
});

export default interface StateReqDto {
    name: string,
    code_name: string,
    code_no: number
}