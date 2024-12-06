import { z } from "zod";

export const oasUserResDto = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    password: z.string(),
    contact_no: z.string(),
    email: z.string(),
    access_role_id: z.number()
}).openapi({
	description: 'User Resuest Object',
	ref: 'UserResDto',
});

export default interface UserResDto {
    id: number,
	name: string,
    username: string,
    password: string,
    contact_no: string,
    email: string,
    access_role_id: number
}