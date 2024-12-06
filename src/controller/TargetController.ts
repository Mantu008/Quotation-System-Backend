import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasTargetResDto } from '../dto/res/TargetResDto';
import { oasTargetReqDto } from '../dto/req/TargetReqDto';
import TargetService from '../service/TargetService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const targetController = new Hono();

export const oaspGetTargets: ZodOpenApiPathsObject = {
	"/targets": {
		get: {
			tags: ["target-controller"],
			summary: "Get all targets",
			operationId: "getAllTargets",
			parameters: [
				{
					name: "user_id",
					in: "query",
					required: false,
					schema: {
						type: "number"
					},
					description: "To fetch record with given user_id."
				},
				{
					name: "created_by_user_id",
					in: "query",
					required: false,
					schema: {
						type: "number"
					},
					description: "To fetch record with given created_by_user_id."
				}
			],
			responses: {
				200: {
					description: "Get all targets",
					content: {
						"application/json": {
							schema: z.array(oasTargetResDto)
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
			tags: ["target-controller"],
			summary: "Create a new target",
			operationId: "createTarget",
			requestBody: {
				content: {
					"application/json": {
						schema: oasTargetReqDto
					}
				},
				required: true,
				description: "Target to be created"
			},
			responses: {
				200: {
					description: "Target created successfully",
					content: {
						"application/json": {
							schema: oasCommonCudType
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
	"/targets/{id}": {
		get: {
			tags: ["target-controller"],
			summary: "Get a single target by ID",
			operationId: "getTargetById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the target to fetch"
				}
			],
			responses: {
				200: {
					description: "Target found",
					content: {
						"application/json": {
							schema: oasTargetResDto
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
					description: "Target not found",
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
			tags: ["target-controller"],
			summary: "Update a single target by ID",
			operationId: "putTargetById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the target to update"
				}
			],
			requestBody: {
				content: {
					"application/json": {
						schema: oasTargetReqDto
					}
				},
				required: true,
				description: "Target to be updated"
			},
			responses: {
				200: {
					description: "Target updated",
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
					description: "Target not found",
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
			tags: ["target-controller"],
			summary: "Delete a single target by ID",
			operationId: "deleteTargetById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the target to delete"
				}
			],
			responses: {
				200: {
					description: "Target deleted.",
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
					description: "Target not found",
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

targetController.get('/', async (c) => {

	const { user_id, created_by_user_id } = c.req.query();

	let userId: number | null = null;
	let createdByUserId: number | null = null;

	if (user_id !== undefined && user_id !== null && user_id?.length !== 0) {
		userId = Number(user_id);
	}

	if (created_by_user_id !== undefined && created_by_user_id !== null && created_by_user_id?.length !== 0) {
		createdByUserId = Number(created_by_user_id);
	}
	const commonGetResDto = await TargetService.getLdtos(userId, createdByUserId);

	// if ((created_by_user_id !== undefined && created_by_user_id !== null && created_by_user_id?.length !== 0) && (user_id !== undefined && user_id !== null && user_id?.length !== 0)) {
	// 	const commonGetOneResDto = await TargetService.findByUserIdAndCreatedByUserId(user_id, created_by_user_id);
	// 	if (commonGetOneResDto.hasException) {
	// 		return c.json(commonGetOneResDto, 500);
	// 	}

	// 	if (!commonGetOneResDto.isSuccess) {
	// 		const errorRes: CommonCudType = {
	// 			isSuccess: false,
	// 			hasException: false,
	// 			errorResDto: {
	// 				timestamp: new Date(),
	// 				code: "bad_request",
	// 				message: "Bad Request.",
	// 				details: "Bad Request."
	// 			}
	// 		};
	// 		return c.json(errorRes, 400);
	// 	}

	// 	if (commonGetOneResDto.items === null) {
	// 		const errorRes: CommonCudType = {
	// 			isSuccess: false,
	// 			hasException: false,
	// 			errorResDto: {
	// 				timestamp: new Date(),
	// 				code: "record_not_found",
	// 				message: "Record not found with given filters.",
	// 				details: "Can not find record for given filters."
	// 			}
	// 		};
	// 		return c.json(errorRes, 404);
	// 	}
	// 	return c.json(commonGetOneResDto.items, 200);
	// }

	// if ((created_by_user_id !== undefined && created_by_user_id !== null && created_by_user_id?.length !== 0) || (user_id !== undefined && user_id !== null && user_id?.length !== 0)) {
	// 	const commonGetOneResDto = await TargetService.findByUserIdOrCreatedByUserId(user_id, created_by_user_id);
	// 	if (commonGetOneResDto.hasException) {
	// 		return c.json(commonGetOneResDto, 500);
	// 	}

	// 	if (!commonGetOneResDto.isSuccess) {
	// 		const errorRes: CommonCudType = {
	// 			isSuccess: false,
	// 			hasException: false,
	// 			errorResDto: {
	// 				timestamp: new Date(),
	// 				code: "bad_request",
	// 				message: "Bad Request.",
	// 				details: "Bad Request."
	// 			}
	// 		};
	// 		return c.json(errorRes, 400);
	// 	}

	// 	if (commonGetOneResDto.items === null) {
	// 		const errorRes: CommonCudType = {
	// 			isSuccess: false,
	// 			hasException: false,
	// 			errorResDto: {
	// 				timestamp: new Date(),
	// 				code: "record_not_found",
	// 				message: "Record not found with given filters.",
	// 				details: "Can not find record for given filters."
	// 			}
	// 		};
	// 		return c.json(errorRes, 404);
	// 	}

	// 	return c.json(commonGetOneResDto.items, 200);
	// }

	// const commonGetResDto = await TargetService.getAll();

	if (commonGetResDto.hasException) {
		return c.json(commonGetResDto.errorResDto, 500);
	}

	if (!commonGetResDto.isSuccess) {
		return c.json(commonGetResDto.errorResDto, 400);
	}

	return c.json(commonGetResDto.items);
});

targetController.post('/', async (c) => {
	const body = await c.req.json();
	if (body.user_id === null || body.user_id === undefined || body.user_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter user id.",
				details: "Can not leave user id of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.from_month === null || body.from_month === undefined || body.from_month === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter from month.",
				details: "Can not leave from month of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.from_yr === null || body.from_yr === undefined || body.from_yr === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter from year.",
				details: "Can not leave from year of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.to_month === null || body.to_month === undefined || body.to_month === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter To Month.",
				details: "Can not leave To Month of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.to_yr === null || body.to_yr === undefined || body.to_yr === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter To Year.",
				details: "Can not leave To Year of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.amt === null || body.amt === undefined || body.amt === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter amount.",
				details: "Can not leave amount of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.cnt_month === null || body.cnt_month === undefined || body.cnt_month === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter cnt_month.",
				details: "Can not leave cnt_month of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.created_by_user_id === null || body.created_by_user_id === undefined || body.created_by_user_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter created by user id.",
				details: "Can not leave created by user id of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	const commonCudResDto = await TargetService.create(body);

	if (commonCudResDto.hasException) {
		return c.json(commonCudResDto, 500);
	}

	if (!commonCudResDto.isSuccess) {
		return c.json(commonCudResDto, 400);
	}

	return c.json(commonCudResDto, 200);
});

targetController.get('/:id', async (c) => {
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

	const commonGetOneResDto = await TargetService.getOne(id);

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
				message: "Target not found.",
				details: "Can not find target for given ID"
			}
		};
		return c.json(errorRes, 404);
	}

	return c.json(commonGetOneResDto.item, 200);
});

targetController.put('/:id', async (c) => {
	const body = await c.req.json();

	if (body.user_id === null || body.user_id === undefined || body.user_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter user id.",
				details: "Can not leave user id of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.from_month === null || body.from_month === undefined || body.from_month === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter from month.",
				details: "Can not leave from month of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.from_yr === null || body.from_yr === undefined || body.from_yr === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter from year.",
				details: "Can not leave from year of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.to_month === null || body.to_month === undefined || body.to_month === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter To Month.",
				details: "Can not leave To Month of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.to_yr === null || body.to_yr === undefined || body.to_yr === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter To Year.",
				details: "Can not leave To Year of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.amt === null || body.amt === undefined || body.amt === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter amount.",
				details: "Can not leave amount of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.cnt_month === null || body.cnt_month === undefined || body.cnt_month === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter cnt_month.",
				details: "Can not leave cnt_month of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.created_by_user_id === null || body.created_by_user_id === undefined || body.created_by_user_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter created by user id.",
				details: "Can not leave created by user id of Target empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.created_at === null || body.created_at === undefined) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter created at date.",
				details: "Can not leave created at date of Target empty."
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

	const res = await TargetService.updateOne(id, body);

	if (res && res.hasException) {
		return c.json(res, 500);
	}

	if (res && !res.isSuccess) {
		return c.json(res, 400);
	}

	return c.json(res, 200);
});

targetController.delete('/:id', async (c) => {
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

	const res = await TargetService.deleteOne(id);

	if (res && res.hasException) {
		return c.json(res, 500);
	}

	if (res && !res.isSuccess) {
		return c.json(res, 400);
	}

	return c.json(res, 200);
});

export default targetController;