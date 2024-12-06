import { z } from "zod";

export const oasDefaultOtherChargeReqDto = z.object({
    name: z.string(),
    amt: z.number()
}).openapi({
	description: 'Default Other Charge Request Object',
	ref: 'DefaultOtherChargeReqDto',
});

export default interface DefaultOtherChargeReqDto {
	name: string,
    amt: number
}
