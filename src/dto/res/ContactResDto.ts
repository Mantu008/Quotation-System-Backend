import { z } from "zod";

export const oasContactResDto = z.object({
	id: z.number(),
	name: z.string(),
	address: z.string(),
	city: z.string(),
	state_id: z.number(),
	country: z.string(),
	pin: z.number(),
	job_title: z.string(),
	contact_no1: z.string(),
	contact_no2: z.string(),
	contact_no3: z.string(),
	email1: z.string(),
	emai12: z.string(),
	contact_nature_id: z.number(),
	inq_src_id: z.number(),
	industry_id: z.number(),
	desc: z.string()
}).openapi({
	description: 'Contact Response Object',
	ref: 'ContactResDto',
});

export default interface ContactResDto {
	id: number,
	name: string,
	address: string,
	city: string,
	state_id: number,
	country: string,
	pin: number,
	job_title: string,
	contact_no1: string,
	contact_no2: string,
	contact_no3: string,
	email1: string,
	emai12: string,
	contact_nature_id: number,
	inq_src_id: number,
	industry_id: number,
	desc: string
}
