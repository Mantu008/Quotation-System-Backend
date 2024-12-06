import { z } from "zod";

export const oasProductReqDto = z.object({
	category_id: z.number(),
	name: z.string(),
	model_no: z.string(),
	hsn_code: z.string(),
	rate: z.number(),
	gst_rate_id: z.number(),
	specs: z.array(
		z.object({
			spec_name: z.string(),
			spec_value: z.string()
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
	description: 'Product Request Object',
	ref: 'ProductReqDto',
});

type Spec = {
	spec_name: string;
	spec_value: string;
};

type MetaInfo = {
	name: string;
	value: string;
};

type Meta = {
	heading: string;
	info: MetaInfo[];
};

export default interface ProductReqDto {
	category_id: number;
	name: string;
	model_no: string;
	hsn_code: string;
	rate: number;
	gst_rate_id: number;
	specs: Spec[];
	meta: Meta[];
}
