import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasUserResDto } from '../dto/res/UserResDto';
import { oasUserReqDto } from '../dto/req/UserReqDto';
import UserService from '../service/UserService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const userController = new Hono();

export const oaspGetUser: ZodOpenApiPathsObject = {
	"/users": {
		get: {
			tags: ["user-controller"],
			summary: "Get all user",
			operationId: "getAllUser",
			parameters: [
				{
					name: "username",
					in: "query",
					required: false,
					schema: {
						type: "string"
					},
					description: "Username of the user to fetch"
				}
			],
			responses: {
				200: {
					description: "Get all user",
					content: {
						"application/json": {
							schema: z.array(oasUserResDto)
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
			tags: ["user-controller"],
			summary: "Create a new user",
			operationId: "createUser",
			requestBody: {
				content: {
					"application/json": {
						schema: oasUserReqDto
					}
				},
				required: true,
				description: "User to be created"
			},
			responses: {
				200: {
					description: "User created successfully",
					content: {
						"application/json": {
							schema: oasUserResDto
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
	"/users/{id}": {
		get: {
			tags: ["user-controller"],
			summary: "Get a single user by ID",
			operationId: "getUserById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the user to fetch"
				}
			],
			responses: {
				200: {
					description: "User found",
					content: {
						"application/json": {
							schema: oasUserResDto
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
					description: "User not found",
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
			tags: ["user-controller"],
			summary: "Update a single user by ID",
			operationId: "putUserById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the user to update"
				}
			],
			requestBody: {
				content: {
					"application/json": {
						schema: oasUserReqDto
					}
				},
				required: true,
				description: "User to be updated"
			},
			responses: {
				200: {
					description: "User updated",
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
					description: "User not found",
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
			tags: ["user-controller"],
			summary: "Delete a single user by ID",
			operationId: "deleteUserById",
			parameters: [
				{
					name: "id",
					in: "path",
					required: true,
					schema: {
						type: "string"
					},
					description: "ID of the user to delete"
				}
			],
			responses: {
				200: {
					description: "User deleted.",
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
				404: {
					description: "User not found",
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
	}/*,
	"/users/findbyusername": {
		post: {
			tags: ["user-controller"],
			summary: "Get a single user by username",
			operationId: "getUserByUsername",
			requestBody: {
				content: {
					"application/json": {
						schema: z.object({ username: z.string() })
					}
				},
				required: true,
				description: "Get a user by username"
			},
			responses: {
				200: {
					description: "Get a user by username",
					content: {
						"application/json": {
							schema: z.array(oasUserResDto)
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
	}*/
};

userController.get('/', async (c) => {

	const { username } = c.req.query();
	// console.log("username: " + username);
	if (username !== undefined && username !== null && username?.length !== 0) {
		const commonGetOneResDto = await UserService.findByUsername(username);
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
					message: "Username not found.",
					details: "Can not find user for given username"
				}
			};
			return c.json(errorRes, 404);
		}

		return c.json(commonGetOneResDto.item, 200);
	}

	const commonGetResDto = await UserService.getAll();

	if (commonGetResDto.hasException) {
		return c.json(commonGetResDto.errorResDto, 500);
	}

	if (!commonGetResDto.isSuccess) {
		return c.json(commonGetResDto.errorResDto, 400);
	}

	return c.json(commonGetResDto.items);
});

userController.get('/:id', async (c) => {
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

	const commonGetOneResDto = await UserService.getOne(id);

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
				message: "User not found.",
				details: "Can not find user for given ID"
			}
		};
		return c.json(errorRes, 404);
	}

	return c.json(commonGetOneResDto.item, 200);
});

// userController.post('/findbyusername', async (c) => {
// 	const body = await c.req.json();
// 	if (body.username === null || body.username === undefined || body.username.length === 0) {
// 		const errorRes: CommonCudType = {
// 			isSuccess: false,
// 			hasException: false,
// 			errorResDto: {
// 				timestamp: new Date(),
// 				code: "bad_request",
// 				message: "Please enter Username.",
// 				details: "Can not leave Username of User empty."
// 			}
// 		};
// 		return c.json(errorRes, 400);
// 	}
// 	const commonGetOneResDto = await UserService.findByUsername(body.username);
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

// 	if (commonGetOneResDto.item === null) {
// 		const errorRes: CommonCudType = {
// 			isSuccess: false,
// 			hasException: false,
// 			errorResDto: {
// 				timestamp: new Date(),
// 				code: "not_found",
// 				message: "Username not found.",
// 				details: "Can not find user for given username"
// 			}
// 		};
// 		return c.json(errorRes, 404);
// 	}

// 	return c.json(commonGetOneResDto.item, 200);
// });

userController.post('/', async (c) => {
	const body = await c.req.json();
	if (body.name === null || body.name === undefined || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.username === null || body.username === undefined || body.username.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Username.",
				details: "Can not leave Username of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.password === null || body.password === undefined || body.password.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter password.",
				details: "Can not leave password of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.contact_no === null || body.contact_no === undefined || body.contact_no.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter contact_no.",
				details: "Can not leave contact_no of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.email === null || body.email === undefined || body.email.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter email.",
				details: "Can not leave email of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.access_role_id === null || body.access_role_id === undefined || body.access_role_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter access_role_id.",
				details: "Can not leave access_role_id of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	const commonCudResDto = await UserService.create(body);

	if (commonCudResDto.hasException) {
		return c.json(commonCudResDto, 500);
	}

	if (!commonCudResDto.isSuccess) {
		return c.json(commonCudResDto, 400);
	}

	return c.json(commonCudResDto, 200);
});

userController.put('/:id', async (c) => {
	const body = await c.req.json();
	if (body.name === null || body.name === undefined || body.name.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Name.",
				details: "Can not leave Name of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.username === null || body.username === undefined || body.username.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter Username.",
				details: "Can not leave Username of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.password === null || body.password === undefined || body.password.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter password.",
				details: "Can not leave password of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.contact_no === null || body.contact_no === undefined || body.contact_no.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter contact_no.",
				details: "Can not leave contact_no of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.email === null || body.email === undefined || body.email.length === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter email.",
				details: "Can not leave email of User empty."
			}
		};
		return c.json(errorRes, 400);
	}

	if (body.access_role_id === null || body.access_role_id === undefined || body.access_role_id === 0) {
		const errorRes: CommonCudType = {
			isSuccess: false,
			hasException: false,
			errorResDto: {
				timestamp: new Date(),
				code: "bad_request",
				message: "Please enter access_role_id.",
				details: "Can not leave access_role_id of User empty."
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

	const res = await UserService.updateOne(id, body);

	if (res && res.hasException) {
		return c.json(res, 500);
	}

	if (res && !res.isSuccess) {
		return c.json(res, 400);
	}

	return c.json(res, 200);
});

userController.delete('/:id', async (c) => {
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

	const res = await UserService.deleteOne(id);

	if (res && res.hasException) {
		return c.json(res, 500);
	}

	if (res && !res.isSuccess) {
		return c.json(res, 400);
	}

	return c.json(res, 200);
});

export default userController;