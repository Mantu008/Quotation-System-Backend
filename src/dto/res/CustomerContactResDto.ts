import { z } from "zod";

export const oasCustomerContactResDto = z.object({
    id: z.number(),
    customer_id: z.number(),
    contact_id: z.number()
}).openapi({
	description: 'Customer Contact Response Object',
	ref: 'CustomerContactResDto',
});

export default interface CustomerContactResDto {
    id: number,
	customer_id: number,
    contact_id: number
}
