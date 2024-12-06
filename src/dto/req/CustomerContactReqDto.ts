import { z } from "zod";

export const oasCustomerContactReqDto = z.object({
    customer_id: z.number(),
    contact_id: z.number()
}).openapi({
	description: 'Customer Contact Request Object',
	ref: 'CustomerContactReqDto',
});

export default interface CustomerContactReqDto {
	customer_id: number,
    contact_id: number
}
