import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasBusinessInfoOtherResDto } from '../dto/res/BusinessInfoOtherResDto';
import { oasBusinessInfoOtherReqDto } from '../dto/req/BusinessInfoOtherReqDto';
import BusinessInfoOtherService from '../service/BusinessInfoOtherService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const businessInfoOtherController = new Hono();

export const oaspGetBusinessInfoOthers: ZodOpenApiPathsObject = {
    "/business-info-others": {
        get: {
            tags: ["business-info-other-controller"],
            summary: "Get all business information others",
            operationId: "getAllBusinessInfoOthers",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Name of the business information other to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Get all business information others",
                    content: {
                        "application/json": {
                            schema: z.array(oasBusinessInfoOtherResDto)
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
            tags: ["business-info-other-controller"],
            summary: "Create a new business information others",
            operationId: "createBusinessInfoOthers",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasBusinessInfoOtherReqDto
                    }
                },
                required: true,
                description: "Business information others to be created"
            },
            responses: {
                200: {
                    description: "Business information others created successfully",
                    content: {
                        "application/json": {
                            schema: oasBusinessInfoOtherResDto
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
    "/business-info-others/{id}": {
        get: {
            tags: ["business-info-other-controller"],
            summary: "Get a single business information others by ID",
            operationId: "getBusinessInfoOthersById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the business information others to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Business Information Other found",
                    content: {
                        "application/json": {
                            schema: oasBusinessInfoOtherResDto
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
                    description: "Business Information Other not found",
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
            tags: ["business-info-other-controller"],
            summary: "Update a single business information others by ID",
            operationId: "putBusinessInfoOthersById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the business information others to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasBusinessInfoOtherReqDto
                    }
                },
                required: true,
                description: "Business Information Other to be updated"
            },
            responses: {
                200: {
                    description: "Business information others updated",
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
                    description: "Business Information Other not found",
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
            tags: ["business-info-other-controller"],
            summary: "Delete a single business information others by ID",
            operationId: "deleteBusinessInfoOthersById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the business information others to delete"
                }
            ],
            responses: {
                200: {
                    description: "Business Information Other deleted.",
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
                    description: "Business Information Other not found",
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

businessInfoOtherController.get('/', async (c) => {
    const { name } = c.req.query();
    let nameVar: string | null = null;

    if (name !== null && name !== undefined && name?.length !== 0) {
        nameVar = name;
    }

    const commonGetResDto = await BusinessInfoOtherService.getLdtos(nameVar);
    // const commonGetResDto = await BusinessInfoOtherService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

businessInfoOtherController.post('/', async (c) => {
    const body = await c.req.json();
    if (body.no === null || body.no === undefined || body.no === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter number (no).",
                details: "Can not leave number (no) of business information others empty."
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
                details: "Can not leave Name of business information others empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.text === null || body.text === undefined || body.text.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Text.",
                details: "Can not leave Text of business information others empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.is_in_quo === null || body.is_in_quo === undefined) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Is it in quotation or not.",
                details: "Can not leave Is it in quotation or not of business information others empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.is_in_pi === null || body.is_in_pi === undefined) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter value of is_in_pi field.",
                details: "Can not leave value of is_in_pi field empty."
            }
        };
        return c.json(errorRes, 400);
    }

    const commonCudResDto = await BusinessInfoOtherService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

businessInfoOtherController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await BusinessInfoOtherService.getOne(id);

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
                message: "Business Information Other not found.",
                details: "Can not find business information others for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

businessInfoOtherController.put('/:id', async (c) => {
    const body = await c.req.json();

    if (body.no === null || body.no === undefined || body.no === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter number (no).",
                details: "Can not leave number (no) of business information others empty."
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
                details: "Can not leave Name of business information others empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.text === null || body.text === undefined || body.text.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Text.",
                details: "Can not leave Text of business information others empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.is_in_quo === null || body.is_in_quo === undefined) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Is it in quotation or not.",
                details: "Can not leave Is it in quotation or not of business information others empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.is_in_pi === null || body.is_in_pi === undefined) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter value of is_in_pi field.",
                details: "Can not leave value of is_in_pi field empty."
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

    const res = await BusinessInfoOtherService.updateOne(id, body);
    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

businessInfoOtherController.delete('/:id', async (c) => {
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

    const res = await BusinessInfoOtherService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default businessInfoOtherController;