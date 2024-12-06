import { z } from "zod";

export const oasCurrencyResDto = z.object({
    id: z.number(),
    name: z.string(),
    symbol: z.string(),
    is_default: z.number()
}).openapi({
	description: 'Currency Response Object',
	ref: 'CurrencyResDto',
});

export default interface CurrencyResDto {
    id: number,
	name: string,
    symbol: string,
    is_default: number
}