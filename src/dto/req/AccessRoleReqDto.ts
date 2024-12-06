import { z } from "zod";

export const oasAccessRoleReqDto = z.object({
    name: z.string(),
    deleteable: z.number()
}).openapi({
	description: 'Access Role Request Object',
	ref: 'AccessRoleReqDto',
});

export default interface AccessRoleReqDto {
	name: string,
    deleteable: number
}