import { z } from "zod";

export const oasMachineReqDto = z.object({
    name: z.string()
}).openapi({
	description: 'Machine Request Object',
	ref: 'MachineReqDto',
});

export default interface MachineReqDto {
	name: string
}
