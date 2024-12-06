import { z } from "zod";

export const oasCurrencyReqDto = z.object({
    name: z.string(),
    symbol: z.string(),
    is_default: z.number()
}).openapi({
	description: 'Currency Request Object',
	ref: 'CurrencyReqDto',
});

export default interface CurrencyReqDto {
	name: string,
    symbol: string,
    is_default: number
}