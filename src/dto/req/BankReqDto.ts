import { z } from "zod";

export const oasBankReqDto = z.object({
    name: z.string(),
    acct_no: z.string(),
    ifsc: z.string(),
    branch: z.string(),
    address: z.string()
}).openapi({
    description: 'Bank Request Object',
    ref: 'BankReqDto',
});

export default interface BankReqDto {
    name: string,
    acct_no: string,
    ifsc: string,
    branch: string,
    address: string
}
