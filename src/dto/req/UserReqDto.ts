import { z } from "zod";

export const oasUserReqDto = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
    contact_no: z.string(),
    email: z.string(),
    access_role_id: z.number()
}).openapi({
	description: 'User Request Object',
	ref: 'UserReqDto',
});

export default interface UserReqDto {
	name: string,
    username: string,
    password: string,
    contact_no: string,
    email: string,
    access_role_id: number
}