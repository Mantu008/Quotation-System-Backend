import { z } from "zod";

export const oasTargetReqDto = z.object({
    user_id: z.number(),
    from_month: z.number(),
    from_yr: z.number(),
    to_month: z.number(),
    to_yr: z.number(),
    amt: z.number(),
    cnt_month: z.number(),
    created_by_user_id: z.number()
}).openapi({
	description: 'Target Request Object',
	ref: 'TargetReqDto',
});

export default interface TargetReqDto {
    user_id: number,
    from_month: number,
    from_yr: number,
    to_month: number,
    to_yr: number,
    amt: number,
    cnt_month: number,
    created_by_user_id: number
}
