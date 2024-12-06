import { z } from "zod";

export const oasBankResDto = z.object({
    id: z.number(),
    name: z.string(),
    acct_no: z.string(),
    ifsc: z.string(),
    branch: z.string(),
    address: z.string()
}).openapi({
    description: 'Bank Response Object',
    ref: 'BankResDto',
});

export default interface BankResDto {
    id: number,
    name: string,
    acct_no: string,
    ifsc: string,
    branch: string,
    address: string
}
