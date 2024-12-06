import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasGstRateResDto } from '../dto/res/GstRateResDto';
import { oasGstRateReqDto } from '../dto/req/GstRateReqDto';
import GstRateService from '../service/GstRateService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const gstRateController = new Hono();

export const oaspGetGstRates: ZodOpenApiPathsObject = {
	"/gst-rates": {
		get: {
			tags: ["gst-rate-controller"],
			summary: "Get all gstrates",
			operationId: "getAllGstRates",
			parameters: [
				{
					name: "name",
					in: "query",
					required: false,
					schema: {
						type: "string"
					},
					description: "Name of the gst rate to fetch"
				}
			],
			responses: {
				200: {
					description: "Get all gstrates",
					content: {
						"application/json": {
							schema: z.array(oasGstRateResDto)
						}
					}
				},
				400: {
					description: "Bad Request",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				},
				500: {
					description: "Internal Server Error",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				}
			}
		},
		post: {
			tags: ["gst-rate-controller"],
			summary: "Create a new gst rate",
			operationId: "createGst Rate",
			requestBody: {
				content: {
					"application/json": {
						schema: oasGstRateReqDto
					}
				},
				required: true,
				description: "Gst Rate to be created"
			},
			responses: {
				200: {
					description: "Gst Rate created successfully",
					content: {
						"application/json": {
							schema: oasGstRateResDto
						}
					}
				},
				400: {
					description: "Bad Request",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				},
				500: {
					description: "Internal Server Error",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				}
			}
		}
	},
	"/gst-rates/{id}": {
		get: {
			tags: ["gst-rate-controller"],
			summary: "Get a single gst rate by ID",
			operationId: "getGst RateById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the gst rate to fetch"
				}
			],
			responses: {
				200: {
					description: "Gst Rate found",
					content: {
						"application/json": {
							schema: oasGstRateResDto
						}
					}
				},
				400: {
					description: "Bad Request",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				},
				404: {
					description: "Gst Rate not found",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				},
				500: {
					description: "Internal Server Error",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				}
			}
		},
		put: {
			tags: ["gst-rate-controller"],
			summary: "Update a single gst rate by ID",
			operationId: "putGstRateById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the gst rate to update"
				}
			],
			requestBody: {
				content: {
					"application/json": {
						schema: oasGstRateReqDto
					}
				},
				required: true,
				description: "Gst Rate to be updated"
			},
			responses: {
				200: {
					description: "Gst Rate updated",
					content: {
						"application/json": {
							schema: {
								isSuccess: z.boolean(),
								message: z.string()
							}
						}
					}
				},
				400: {
					description: "Bad Request",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				},
				404: {
					description: "Gst Rate not found",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				},
				500: {
					description: "Internal Server Error",
					content: {
						"application/json": {
							// schema: {
							// 	"$ref": "#/components/schemas/ErrorResDto"
							// }
							schema: oasCommonCudType
						}
					}
				}
			}
		},
		delete: {
			tags: ["gst-rate-controller"],
			summary: "Delete a single gst rate by ID",
			operationId: "deleteGstRateById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the gst rate to delete"
				}
			],
			responses: {
				200: {
					description: "Gst Rate deleted.",
					content: {
						"application/json": {
							schema: {
								isSuccess: z.boolean(),
								message: z.string()
							}
						}
					}
				},
				400: {
					description: "Bad Request",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				},
				404: {
					description: "Gst Rate not found",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				},
				500: {
					description: "Internal Server Error",
					content: {
						"application/json": {
							schema: oasCommonCudType
						}
					}
				}
			}
		}
	}
};

gstRateController.get('/', async (c) => {
	const { name } = c.req.query();
	let nameVar: string | null = null;

	if (name !== null && name !== undefined && name?.length !== 0) {
		nameVar = name;
	}

	const commonGetResDto = await GstRateService.getLdtos(nameVar);
	// const commonGetResDto = await GstRateService.getAll();

	if (commonGetResDto.hasException) {
		return c.json(commonGetResDto.errorResDto, 500);
	}

	if (!commonGetResDto.isSuccess) {
		return c.json(commonGetResDto.errorResDto, 400);
	}

	return c.json(commonGetResDto.items);
});

gstRateController.post('/', async (c) => {
	const body = await c.req.json();
	if (body.name === null || body.name === undefined || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of Gst Rate empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.cgst === null || body.cgst === undefined || body.cgst.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter cgst.",
				details: "Can not leave cgst of Gst Rate empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.sgst === null || body.sgst === undefined || body.sgst.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter sgst.",
				details: "Can not leave sgst of Gst Rate empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.igst === null || body.igst === undefined || body.igst.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter igst.",
				details: "Can not leave igst of Gst Rate empty."
			}
		};
		return c.json(errorRes, 400);
	}

	const commonCudResDto = await GstRateService.create(body);

	if (commonCudResDto.hasException) {
		return c.json(commonCudResDto, 500);
	}

	if (!commonCudResDto.isSuccess) {
		return c.json(commonCudResDto, 400);
	}

	return c.json(commonCudResDto, 200);
});

gstRateController.get('/:id', async (c) => {
	const { id } = c.req.param();
	if (id === undefined || id === null || id?.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter id of the record.",
				details: "Please enter id of the record."
			}
		};
		return c.json(errorRes, 400);
	}

	const commonGetOneResDto = await GstRateService.getOne(id);

	if (commonGetOneResDto.hasException) {
		return c.json(commonGetOneResDto, 500);
	}

	if (!commonGetOneResDto.isSuccess) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Bad Request.",
				details: "Bad Request."
			}
		};
		return c.json(errorRes, 400);
	}

	if (commonGetOneResDto.item === null) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "not_found",
				message: "Gst Rate not found.",
				details: "Can not find gst rate for given ID"
			}
		};
		return c.json(errorRes, 404);
	}

	return c.json(commonGetOneResDto.item, 200);
});

gstRateController.put('/:id', async (c) => {
	const body = await c.req.json();

	if (body.name === null || body.name === undefined || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of Gst Rate empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.cgst === null || body.cgst === undefined || body.cgst.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter cgst.",
				details: "Can not leave cgst of Gst Rate empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.sgst === null || body.sgst === undefined || body.sgst.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter sgst.",
				details: "Can not leave sgst of Gst Rate empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.igst === null || body.igst === undefined || body.igst.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter igst.",
				details: "Can not leave igst of Gst Rate empty."
			}
		};
		return c.json(errorRes, 400);
	}

	const { id } = c.req.param();
	if (id === undefined || id === null || id?.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter id of the record.",
				details: "Please enter id of the record."
			}
		};
		return c.json(errorRes, 400);
	}

	const res = await GstRateService.updateOne(id, body);

	if (res && res.hasException) {
		return c.json(res, 500);
	}

	if (res && !res.isSuccess) {
		return c.json(res, 400);
	}

	return c.json(res, 200);
});

gstRateController.delete('/:id', async (c) => {
	const { id } = c.req.param();
	if (id === undefined || id === null || id?.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter id of the record.",
				details: "Please enter id of the record."
			}
		};
		return c.json(errorRes, 400);
	}

	const res = await GstRateService.deleteOne(id);

	if (res && res.hasException) {
		return c.json(res, 500);
	}

	if (res && !res.isSuccess) {
		return c.json(res, 400);
	}

	return c.json(res, 200);
});

export default gstRateController;