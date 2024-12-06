import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasProductModelResDto } from '../dto/res/ProductModelResDto';
import { oasProductModelReqDto } from '../dto/req/ProductModelReqDto';
import ProductModelService from '../service/ProductModelService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const productModelController = new Hono();

export const oaspGetProductModel: ZodOpenApiPathsObject = {
	"/product-models": {
		get: {
			tags: ["product-model-controller"],
			summary: "Get all productmodel",
			operationId: "getAllProductModel",
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
				}
			],
			responses: {
				200: {
					description: "Get all Product Model",
					content: {
						"application/json": {
							schema: z.array(oasProductModelResDto)
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
			tags: ["product-model-controller"],
			summary: "Create a new product model",
			operationId: "createProduct model",
			requestBody: {
				content: {
					"application/json": {
						schema: oasProductModelReqDto
					}
				},
				required: true,
				description: "Product model to be created"
			},
			responses: {
				200: {
					description: "Product model created successfully",
					content: {
						"application/json": {
							schema: oasProductModelResDto
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
	"/product-models/{id}": {
		get: {
			tags: ["product-model-controller"],
			summary: "Get a single product model by ID",
			operationId: "getProductModelById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the product model to fetch"
				}
			],
			responses: {
				200: {
					description: "Product model found",
					content: {
						"application/json": {
							schema: oasProductModelResDto
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
					description: "Product model not found",
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
			tags: ["product-model-controller"],
			summary: "Update a single product model by ID",
			operationId: "putProductModelById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the product model to update"
				}
			],
			requestBody: {
				content: {
					"application/json": {
						schema: oasProductModelReqDto
					}
				},
				required: true,
				description: "Product model to be updated"
			},
			responses: {
				200: {
					description: "Product model updated",
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
					description: "Product model not found",
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
			tags: ["product-model-controller"],
			summary: "Delete a single product model by ID",
			operationId: "deleteProductModelById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the product model to delete"
				}
			],
			responses: {
				200: {
					description: "Product model deleted.",
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
					description: "Product model not found",
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

productModelController.get('/', async (c) => {

	const { category_id, name } = c.req.query();

	let categoryId: number | null = null;
	let nameVar: string | null = null;

	if (category_id !== undefined && category_id !== null && category_id?.length !== 0) {
		categoryId = Number(category_id);
	}

	if (name !== undefined && name !== null && name?.length !== 0) {
		nameVar = name;
	}

	const commonGetResDto = await ProductModelService.getLdtos(categoryId, nameVar);

	// const commonGetResDto = await ProductModelService.getAll();

	if (commonGetResDto.hasException) {
		return c.json(commonGetResDto.errorResDto, 500);
	}

	if (!commonGetResDto.isSuccess) {
		return c.json(commonGetResDto.errorResDto, 400);
	}

	return c.json(commonGetResDto.items);
});

productModelController.post('/', async (c) => {
	const body = await c.req.json();
	if (body.name === null || body.name === undefined || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of Product model empty."
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
				message: "Please enter category id.",
				details: "Can not leave category id of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}



	if (body.prefix === null || body.prefix === undefined || body.prefix.length === 0) {

		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter prefix.",
				details: "Can not leave prefix of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.postfix === null || body.postfix === undefined || body.postfix.length === 0) {

		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter postfix.",
				details: "Can not leave postfix of Product model empty."
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
				message: "Please enter hsn_code.",
				details: "Can not leave hsn_code of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.rate === null || body.rate === undefined || body.rate === 0) {

		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter rate.",
				details: "Can not leave rate of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}

	const commonCudResDto = await ProductModelService.create(body);

	if (commonCudResDto.hasException) {
		return c.json(commonCudResDto, 500);
	}

	if (!commonCudResDto.isSuccess) {
		return c.json(commonCudResDto, 400);
	}

	return c.json(commonCudResDto, 200);
});

productModelController.get('/:id', async (c) => {
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

	const commonGetOneResDto = await ProductModelService.getOne(id);

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
				message: "Product model not found.",
				details: "Can not find product model for given ID"
			}
		};
		return c.json(errorRes, 404);
	}

	return c.json(commonGetOneResDto.item, 200);
});

productModelController.put('/:id', async (c) => {
	const body = await c.req.json();

	if (body.name === null || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.category_id === null || body.category_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter category id.",
				details: "Can not leave category id of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.name === null || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter name.",
				details: "Can not leave name of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.prefix === null || body.prefix.length === 0) {

		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter prefix.",
				details: "Can not leave prefix of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.postfix === null || body.postfix.length === 0) {

		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter postfix.",
				details: "Can not leave postfix of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.hsn_code === null || body.hsn_code.length === 0) {

		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter hsn_code.",
				details: "Can not leave hsn_code of Product model empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.rate === null || body.rate === 0) {

		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter rate.",
				details: "Can not leave rate of Product model empty."
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

	const res = await ProductModelService.updateOne(id, body);

	if (res && res.hasException) {
		return c.json(res, 500);
	}

	if (res && !res.isSuccess) {
		return c.json(res, 400);
	}

	return c.json(res, 200);
});

productModelController.delete('/:id', async (c) => {
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

	const res = await ProductModelService.deleteOne(id);

	if (res && res.hasException) {
		return c.json(res, 500);
	}

	if (res && !res.isSuccess) {
		return c.json(res, 400);
	}

	return c.json(res, 200);
});

export default productModelController;