import { z } from "zod";

export const oasProductResDto = z.object({
	id: z.number(),
	name: z.string(),
	category_id: z.number(),
	model_no: z.string(),
	hsn_code: z.string(),
	rate: z.number(),
	gst_rate_id: z.number(),
	specs: z.array(
		z.object({
			spec_name: z.string(),
			spec_val: z.string()
		})
	),
	meta: z.array(
		z.object({
			heading: z.string(),
			info: z.array(
				z.object({
					name: z.string(),
					value: z.string()
				})
			)
		})
	)
}).openapi({
	description: 'Product Response Object',
	ref: 'ProductResDto',
});

type Spec = {
	spec_name: string;
	spec_val: string;
};

type MetaInfo = {
	name: string;
	value: string;
};

type Meta = {
	heading: string;
	info: MetaInfo[];
};

export default interface ProductResDto {
	id: number;
	name: string;
	category_id: number;
	model_no: string;
	hsn_code: string;
	rate: number;
	gst_rate_id: number;
	specs: Spec[];
	meta: Meta[]
}
