import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasStateResDto } from '../dto/res/StateResDto';
import { oasStateReqDto } from '../dto/req/StateReqDto';
import StateService from '../service/StateService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const stateController = new Hono();

export const oaspGetStates: ZodOpenApiPathsObject = {
    "/states": {
        get: {
            tags: ["state-controller"],
            summary: "Get all states",
            operationId: "getAllStates",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Name of the state to fetch"
                },
                {
                    name: "code_name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Code Name of the state to fetch"
                },
                {
                    name: "code_no",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Code Number of the state to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Get all states",
                    content: {
                        "application/json": {
                            schema: z.array(oasStateResDto)
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
            tags: ["state-controller"],
            summary: "Create a new state",
            operationId: "createState",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasStateReqDto
                    }
                },
                required: true,
                description: "State to be created"
            },
            responses: {
                200: {
                    description: "State created successfully",
                    content: {
                        "application/json": {
                            schema: oasStateResDto
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
    "/states/{id}": {
        get: {
            tags: ["state-controller"],
            summary: "Get a single state by ID",
            operationId: "getStateById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the state to fetch"
                }
            ],
            responses: {
                200: {
                    description: "State found",
                    content: {
                        "application/json": {
                            schema: oasStateResDto
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
                    description: "State not found",
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
            tags: ["state-controller"],
            summary: "Update a single state by ID",
            operationId: "putStateById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the state to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasStateReqDto
                    }
                },
                required: true,
                description: "State to be updated"
            },
            responses: {
                200: {
                    description: "State updated",
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
                    description: "State not found",
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
            tags: ["state-controller"],
            summary: "Delete a single state by ID",
            operationId: "deleteStateById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the state to delete"
                }
            ],
            responses: {
                200: {
                    description: "State deleted.",
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
                    description: "State not found",
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

stateController.get('/', async (c) => {
    const { name, code_name, code_no } = c.req.query();

    let nameVar: string | null = null;
    let codeName: string | null = null;
    let codeNo: number | null = null;

    if (name !== undefined && name !== null && name?.length !== 0) {
        nameVar = name;
    }

    if (code_name !== undefined && code_name !== null && code_name?.length !== 0) {
        codeName = code_name;
    }

    if (code_no !== undefined && code_no !== null && code_no?.length !== 0) {
        codeNo = Number(code_no);
    }

    const commonGetResDto = await StateService.getLdtos(nameVar, codeName, codeNo);

    // const commonGetResDto = await StateService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

stateController.post('/', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of State empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.code_name === null || body.code_name === undefined || body.code_name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter code_name.",
                details: "Can not leave code_name of State empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.code_no === null || body.code_no === undefined || body.code_no === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter code_no.",
                details: "Can not leave code_no of State empty."
            }
        };
        return c.json(errorRes, 400);
    }

    const commonCudResDto = await StateService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

stateController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await StateService.getOne(id);

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
                message: "State not found.",
                details: "Can not find state for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

stateController.put('/:id', async (c) => {
    const body = await c.req.json();

    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of State empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.code_name === null || body.code_name === undefined || body.code_name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter code_name.",
                details: "Can not leave code_name of State empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.code_no === null || body.code_no === undefined || body.code_no === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter code_no.",
                details: "Can not leave code_no of State empty."
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

    const res = await StateService.updateOne(id, body);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

stateController.delete('/:id', async (c) => {
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

    const res = await StateService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default stateController;