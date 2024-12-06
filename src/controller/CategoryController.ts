import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasCategoryResDto } from '../dto/res/CategoryResDto';
import { oasCategoryReqDto } from '../dto/req/CategoryReqDto';
import CategoryService from '../service/CategoryService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const categoryController = new Hono();

export const oaspGetCategories: ZodOpenApiPathsObject = {
	"/categories": {
		get: {
			tags: ["category-controller"],
			summary: "Get all categories",
			operationId: "getAllCategories",
			parameters: [
				{
					name: "name",
					in: "query",
					required: false,
					schema: {
						type: "string"
					},
					description: "Name of the category to fetch"
				}
			],
			responses: {
				200: {
					description: "Get all categories",
					content: {
						"application/json": {
							schema: z.array(oasCategoryResDto)
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
			tags: ["category-controller"],
			summary: "Create a new category",
			operationId: "createCategory",
			requestBody: {
				content: {
					"application/json": {
						schema: oasCategoryReqDto
					}
				},
				required: true,
				description: "Category to be created"
			},
			responses: {
				200: {
					description: "Category created successfully",
					content: {
						"application/json": {
							schema: oasCategoryResDto
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
	"/categories/{id}": {
		get: {
			tags: ["category-controller"],
			summary: "Get a single category by ID",
			operationId: "getCategoryById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the category to fetch"
				}
			],
			responses: {
				200: {
					description: "Category found",
					content: {
						"application/json": {
							schema: oasCategoryResDto
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
					description: "Category not found",
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
			tags: ["category-controller"],
			summary: "Update a single category by ID",
			operationId: "putCategoryById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the category to update"
				}
			],
			requestBody: {
				content: {
					"application/json": {
						schema: z.object({
							name: z.string()
						})
					}
				},
				required: true,
				description: "Category to be created"
			},
			responses: {
				200: {
					description: "Category updated",
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
					description: "Category not found",
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
			tags: ["category-controller"],
			summary: "Delete a single category by ID",
			operationId: "deleteCategoryById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the category to delete"
				}
			],
			responses: {
				200: {
					description: "Category deleted.",
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
					description: "Category not found",
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

categoryController.get('/', async (c) => {
	const { name } = c.req.query();
	let nameVar: string | null = null;

	if (name !== null && name !== undefined && name?.length !== 0) {
		nameVar = name;
	}

	const commonGetResDto = await CategoryService.getLdtos(nameVar);
	// const commonGetResDto = await CategoryService.getAll();

	if (commonGetResDto.hasException) {
		return c.json(commonGetResDto.errorResDto, 500);
	}

	if (!commonGetResDto.isSuccess) {
		return c.json(commonGetResDto.errorResDto, 400);
	}

	return c.json(commonGetResDto.items);
});

categoryController.post('/', async (c) => {
	const body = await c.req.json();
	if (body.name === null || body.name === undefined || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of Category empty."
			}
		};
		return c.json(errorRes, 400);
	}

	const commonCudResDto = await CategoryService.create(body);

	if (commonCudResDto.hasException) {
		return c.json(commonCudResDto, 500);
	}

	if (!commonCudResDto.isSuccess) {
		return c.json(commonCudResDto, 400);
	}

	return c.json(commonCudResDto, 200);
});

categoryController.get('/:id', async (c) => {
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

	const commonGetOneResDto = await CategoryService.getOne(id);

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
				message: "Category not found.",
				details: "Can not find category for given ID"
			}
		};
		return c.json(errorRes, 404);
	}

	return c.json(commonGetOneResDto.item, 200);
});

categoryController.put('/:id', async (c) => {
	const body = await c.req.json();

	if (body.name === null || body.name === undefined || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of Category empty."
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

	const res = await CategoryService.updateOne(id, body.name);

	if (!res.isSuccess && res.errorResDto?.code === "not_found")
		return c.json(res, 404);

	if (!res.isSuccess && res.hasException && res.errorResDto?.code === "internal_server_error")
		return c.json(res, 500);

	return c.json(res, 200);
});

categoryController.delete('/:id', async (c) => {
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

	const res = await CategoryService.deleteOne(id);

	if (!res.isSuccess && res.errorResDto?.code === "not_found")
		return c.json(res, 404);

	if (!res.isSuccess && res.hasException && res.errorResDto?.code === "internal_server_error")
		return c.json(res, 500);

	return c.json(res, 200);
});

export default categoryController;
