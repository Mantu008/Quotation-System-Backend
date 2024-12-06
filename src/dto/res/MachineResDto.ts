import { z } from "zod";

export const oasMachineResDto = z.object({
    id: z.number(),
    name: z.string()
}).openapi({
	description: 'Machine Response Object',
	ref: 'MachineResDto',
});

export default interface MachineResDto {
    id: number,
	name: string
}