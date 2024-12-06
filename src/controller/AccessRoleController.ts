import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasAccessRoleResDto } from '../dto/res/AccessRoleResDto';
import { oasAccessRoleReqDto } from '../dto/req/AccessRoleReqDto';
import AccessRoleService from '../service/AccessRoleService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const accessRoleController = new Hono();

export const oaspGetAccessRoles: ZodOpenApiPathsObject = {
    "/access-roles": {
        get: {
            tags: ["access-role-controller"],
            summary: "Get all accessroles",
            operationId: "getAllAccessRoles",
            responses: {
                200: {
                    description: "Get all accessroles",
                    content: {
                        "application/json": {
                            schema: z.array(oasAccessRoleResDto)
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
            tags: ["access-role-controller"],
            summary: "Create a new access role",
            operationId: "createAccessRole",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasAccessRoleReqDto
                    }
                },
                required: true,
                description: "Access role to be created"
            },
            responses: {
                200: {
                    description: "Access role created successfully",
                    content: {
                        "application/json": {
                            schema: oasAccessRoleResDto
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
    "/access-roles/{id}": {
        get: {
            tags: ["access-role-controller"],
            summary: "Get a single access role by ID",
            operationId: "getAccessRoleById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the access role to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Access role found",
                    content: {
                        "application/json": {
                            schema: oasAccessRoleResDto
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
                    description: "Access role not found",
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
            tags: ["access-role-controller"],
            summary: "Update a single access role by ID",
            operationId: "putAccessRoleById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the access role to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasAccessRoleReqDto
                    }
                },
                required: true,
                description: "Access role to be updated"
            },
            responses: {
                200: {
                    description: "Access role updated",
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
                    description: "Access role not found",
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
            tags: ["access-role-controller"],
            summary: "Delete a single access role by ID",
            operationId: "deleteAccessRoleById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the access role to delete"
                }
            ],
            responses: {
                200: {
                    description: "Access role deleted.",
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
                    description: "Access role not found",
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

accessRoleController.get('/', async (c) => {
    const commonGetResDto = await AccessRoleService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

accessRoleController.post('/', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Access role empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.deleteable === null || body.deleteable === undefined) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter is it deleteable or not.",
                details: "Can not leave Deleteable field of Access role empty."
            }
        };
        return c.json(errorRes, 400);
    }

    const commonCudResDto = await AccessRoleService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

accessRoleController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await AccessRoleService.getOne(id);

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
                message: "Access role not found.",
                details: "Can not find access role for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

accessRoleController.put('/:id', async (c) => {
    const body = await c.req.json();

    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Access role empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.deleteable === null || body.deleteable === undefined) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter is it deleteable or not.",
                details: "Can not leave Deleteable field of Access role empty."
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

    const res = await AccessRoleService.updateOne(id, body);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

accessRoleController.delete('/:id', async (c) => {
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

    const res = await AccessRoleService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default accessRoleController;