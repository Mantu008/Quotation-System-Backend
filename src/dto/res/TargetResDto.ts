import { z } from "zod";

export const oasTargetResDto = z.object({
	id: z.number(),
    user_id: z.number(),
    from_month: z.number(),
    from_yr: z.number(),
    to_month: z.number(),
    to_yr: z.number(),
    amt: z.number(),
    cnt_month: z.number(),
    created_by_user_id: z.number(),
    created_at: z.date()
}).openapi({
	description: 'Target Response Object',
	ref: 'TargetResDto',
});

export default interface TargetResDto {
	id: number,
    user_id: number,
    from_month: number,
    from_yr: number,
    to_month: number,
    to_yr: number,
    amt: number,
    cnt_month: number,
    created_by_user_id: number,
    created_at: Date
}
