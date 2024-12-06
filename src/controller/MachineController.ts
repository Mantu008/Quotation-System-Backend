import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasMachineResDto } from '../dto/res/MachineResDto';
import { oasMachineReqDto } from '../dto/req/MachineReqDto';
import MachineService from '../service/MachineService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const machineController = new Hono();

export const oaspGetMachines: ZodOpenApiPathsObject = {
    "/machines": {
        get: {
            tags: ["machine-controller"],
            summary: "Get all machines",
            operationId: "getAllMachines",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Name of the machine to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Get all machines",
                    content: {
                        "application/json": {
                            schema: z.array(oasMachineResDto)
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
            tags: ["machine-controller"],
            summary: "Create a new machine",
            operationId: "createMachines",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasMachineReqDto
                    }
                },
                required: true,
                description: "Machine to be created"
            },
            responses: {
                200: {
                    description: "Machine created successfully",
                    content: {
                        "application/json": {
                            schema: oasMachineResDto
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
    "/machines/{id}": {
        get: {
            tags: ["machine-controller"],
            summary: "Get a single machine by ID",
            operationId: "getMachinesById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the machine to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Machine found",
                    content: {
                        "application/json": {
                            schema: oasMachineResDto
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
                    description: "Machine not found",
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
            tags: ["machine-controller"],
            summary: "Update a single machine by ID",
            operationId: "putMachinesById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the machine to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasMachineReqDto
                    }
                },
                required: true,
                description: "Machine to be updated"
            },
            responses: {
                200: {
                    description: "Machine updated",
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
                    description: "Machine not found",
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
            tags: ["machine-controller"],
            summary: "Delete a single machine by ID",
            operationId: "deleteMachinesById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the machine to delete"
                }
            ],
            responses: {
                200: {
                    description: "Machine deleted.",
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
                    description: "Machine not found",
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

machineController.get('/', async (c) => {
    const { name } = c.req.query();
    let nameVar: string | null = null;

    if (name !== null && name !== undefined && name?.length !== 0) {
        nameVar = name;
    }

    const commonGetResDto = await MachineService.getLdtos(nameVar);
    // const commonGetResDto = await MachineService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

machineController.post('/', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Machine empty."
            }
        };
        return c.json(errorRes, 400);
    }

    const commonCudResDto = await MachineService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

machineController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await MachineService.getOne(id);

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
                message: "Machine not found.",
                details: "Can not find machine for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

machineController.put('/:id', async (c) => {
    const body = await c.req.json();

    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Machine empty."
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

    const res = await MachineService.updateOne(id, body);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

machineController.delete('/:id', async (c) => {
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

    const res = await MachineService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default machineController;