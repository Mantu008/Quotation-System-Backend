import { z } from "zod";

export const oasPaymentMethodResDto = z.object({
    id: z.number(),
    name: z.string()
}).openapi({
	description: 'Payment Method Response Object',
	ref: 'PaymentMethodResDto',
});

export default interface PaymentMethodResDto {
    id: number,
	name: string
}
