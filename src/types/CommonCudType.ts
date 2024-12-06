import ErrorResDto from "../dto/res/ErrorResDto";
import { z } from "zod";

export const oasCommonCudType = z.object({
	isSuccess: z.boolean(),
	hasException: z.boolean(),
	errorResDto: z.object({
		timestamp: z.string(),
		code: z.string(),
		message: z.string(),
		details: z.string()
	}),
	message: z.string()
}).openapi({
	description: 'Error Response Object',
	ref: 'CommonCudType',
});

export default interface CommonCudType {
	isSuccess: boolean;
	hasException: boolean;
	errorResDto?: ErrorResDto;
	message?: string;
}
