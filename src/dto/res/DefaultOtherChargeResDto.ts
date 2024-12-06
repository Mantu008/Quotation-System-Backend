import { z } from "zod";

export const oasDefaultOtherChargeResDto = z.object({
    id: z.number(),
    name: z.string(),
    amt: z.number()
}).openapi({
	description: 'Default Other Charge Response Object',
	ref: 'DefaultOtherChargeResDto',
});

export default interface DefaultOtherChargeResDto {
    id: number,
	name: string,
    amt: number
}
