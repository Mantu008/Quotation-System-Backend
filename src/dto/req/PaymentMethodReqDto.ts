import { z } from "zod";

export const oasPaymentMethodReqDto = z.object({
    name: z.string()
}).openapi({
	description: 'Payment Method Request Object',
	ref: 'PaymentMethodReqDto',
});

export default interface PaymentMethodReqDto {
	name: string
}
