import { z } from "zod";

export const oasAccessRoleResDto = z.object({
    id: z.number(),
    name: z.string(),
    deleteable: z.number()
}).openapi({
	description: 'Access Role Response Object',
	ref: 'AccessRoleResDto',
});

export default interface AccessRoleResDto {
    id: number,
	name: string,
    deleteable: number
}