import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasProductResDto } from '../dto/res/ProductResDto';
import ProductSer from '../service/ProductSer';
import { oasProductReqDto } from '../dto/req/ProductReqDto';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const productController = new Hono();

export const oaspGetProducts: ZodOpenApiPathsObject = {
	"/products": {
		get: {
			tags: ["product-controller"],
			summary: "Get all products",
			operationId: "getAllProducts",
			parameters: [
				{
					name: "category_id",
					in: "query",
					required: false,
					schema: {
						type: "string"
					},
					description: "To fetch record with given category_id."
				},
				{
					name: "name",
					in: "query",
					required: false,
					schema: {
						type: "string"
					},
					description: "to fetch record with given name."
				},
				{
					name: "model_no",
					in: "query",
					required: false,
					schema: {
						type: "string"
					},
					description: "to fetch record with given model_no."
				}
			],
			responses: {
				200: {
					description: "Get all products",
					content: {
						"application/json": {
							schema: z.array(oasProductResDto)
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
							schema: {
								"$ref": "#/components/schemas/CommonCudType"
							}
						}
					}
				}
			}
		},
		post: {
			tags: ["product-controller"],
			summary: "Create a new product",
			operationId: "createProduct",
			requestBody: {
				content: {
					"application/json": {
						schema: oasProductReqDto
					}
				},
				required: true,
				description: "Product to be created"
			},
			responses: {
				200: {
					description: "Product created successfully",
					content: {
						"application/json": {
							schema: oasProductResDto
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
							schema: {
								"$ref": "#/components/schemas/CommonCudType"
							}
						}
					}
				}
			}
		}
	},
	"/products/{id}": {
		get: {
			tags: ["product-controller"],
			summary: "Get a single product by ID",
			operationId: "getProductById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the product to fetch"
				}
			],
			responses: {
				200: {
					description: "Product found",
					content: {
						"application/json": {
							schema: oasProductResDto
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
					description: "Product not found",
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
			tags: ["product-controller"],
			summary: "Update a single product by ID",
			operationId: "putProductById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the product to update"
				}
			],
			requestBody: {
				content: {
					"application/json": {
						schema: oasProductReqDto
					}
				},
				required: true,
				description: "Gst Rate to be updated"
			},
			responses: {
				200: {
					description: "Product updated",
					content: {
						"application/json": {
							schema: oasProductResDto
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
					description: "Product not found",
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
		delete: {
			tags: ["product-controller"],
			summary: "Delete a single product by ID",
			operationId: "deleteProductById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the product to delete"
				}
			],
			responses: {
				200: {
					description: "Product deleted.",
					content: {
						"application/json": {
							schema: oasProductResDto
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
					description: "Product not found",
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

productController.get('/', async (c) => {

	const { category_id, name, model_no } = c.req.query();

	let categoryId: number | null = null;
	let nameVar: string | null = null;
	let modelNo: string | null = null;

	if (category_id !== undefined && category_id !== null && category_id?.length !== 0) {
		categoryId = Number(category_id);
	}

	if (name !== undefined && name !== null && name?.length !== 0) {
		nameVar = name;
	}

	if (model_no !== undefined && model_no !== null && model_no?.length !== 0) {
		modelNo = model_no;
	}

	const commonGetResDto = await ProductSer.getLdtos(categoryId, nameVar, modelNo);
	// const commonGetResDto = await ProductSer.getAll();

	if (commonGetResDto.hasException) {
		return c.json(commonGetResDto, 500);
	}

	if (!commonGetResDto.isSuccess) {
		return c.json(commonGetResDto, 400);
	}

	return c.json(commonGetResDto.items);
});

productController.post('/', async (c) => {
	const body = await c.req.json();

	if (body.category_id === null || body.category_id === undefined || body.category_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Category ID.",
				details: "Can not leave Category ID empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.gst_rate_id === null || body.gst_rate_id === undefined || body.gst_rate_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter GST RATE ID.",
				details: "Can not leave GST RATE ID empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.name === null || body.name === undefined || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of Product empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.model_no === null || body.model_no === undefined || body.model_no.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Model Number.",
				details: "Can not leave Model Number of Product empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.model_no === null || body.model_no === undefined || body.model_no.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Model Number.",
				details: "Can not leave Model Number of Product empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.hsn_code === null || body.hsn_code === undefined || body.hsn_code.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter HSN Code.",
				details: "Can not leave HSN Code of Product empty."
			}
		};
		return c.json(errorRes, 400);
	}

	const commonCudResDto = await ProductSer.create(body);

	if (commonCudResDto.hasException) {
		return c.json(commonCudResDto, 500);
	}

	if (!commonCudResDto.isSuccess) {
		return c.json(commonCudResDto, 400);
	}

	return c.json(commonCudResDto, 200);
});

productController.get('/:id', async (c) => {
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

	const commonGetOneResDto = await ProductSer.getOne(id);

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
				message: "Product not found.",
				details: "Can not find product for given ID"
			}
		};
		return c.json(errorRes, 404);
	}

	return c.json(commonGetOneResDto.item, 200);
});

productController.put('/:id', async (c) => {
	const body = await c.req.json();
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

	if (body.category_id === null || body.category_id === undefined || body.category_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Category ID.",
				details: "Can not leave Category ID empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.gst_rate_id === null || body.gst_rate_id === undefined || body.gst_rate_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter GST RATE ID.",
				details: "Can not leave GST RATE ID empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.name === null || body.name === undefined || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of Product empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.model_no === null || body.model_no === undefined || body.model_no.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Model Number.",
				details: "Can not leave Model Number of Product empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.model_no === null || body.model_no === undefined || body.model_no.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Model Number.",
				details: "Can not leave Model Number of Product empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.hsn_code === null || body.hsn_code === undefined || body.hsn_code.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter HSN Code.",
				details: "Can not leave HSN Code of Product empty."
			}
		};
		return c.json(errorRes, 400);
	}

	const commonCudResDto = await ProductSer.updateOne(id, body);

	if (commonCudResDto && commonCudResDto.hasException) {
		return c.json(commonCudResDto, 500);
	}

	if (commonCudResDto && !commonCudResDto.isSuccess) {
		return c.json(commonCudResDto, 400);
	}

	return c.json(commonCudResDto, 200);
});

productController.delete('/:id', async (c) => {
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

	const res = await ProductSer.deleteOne(id);

	if (res && res.hasException) {
		return c.json(res, 500);
	}

	if (res && !res.isSuccess) {
		return c.json(res, 400);
	}

	return c.json(res, 200);
});

export default productController;
