import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasCompetitorResDto } from '../dto/res/CompetitorResDto';
import { oasCompetitorReqDto } from '../dto/req/CompetitorReqDto';
import CompetitorService from '../service/CompetitorService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const competitorController = new Hono();

export const oaspGetCompetitors: ZodOpenApiPathsObject = {
    "/competitors": {
        get: {
            tags: ["competitor-controller"],
            summary: "Get all competitors",
            operationId: "getAllCompetitors",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Name of the competitor to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Get all competitors",
                    content: {
                        "application/json": {
                            schema: z.array(oasCompetitorResDto)
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
            tags: ["competitor-controller"],
            summary: "Create a new competitor",
            operationId: "createCompetitors",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasCompetitorReqDto
                    }
                },
                required: true,
                description: "Competitor to be created"
            },
            responses: {
                200: {
                    description: "Competitor created successfully",
                    content: {
                        "application/json": {
                            schema: oasCompetitorResDto
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
    "/competitors/{id}": {
        get: {
            tags: ["competitor-controller"],
            summary: "Get a single competitor by ID",
            operationId: "getCompetitorsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the competitor to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Competitor found",
                    content: {
                        "application/json": {
                            schema: oasCompetitorResDto
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
                    description: "Competitor not found",
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
            tags: ["competitor-controller"],
            summary: "Update a single competitor by ID",
            operationId: "putCompetitorsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the competitor to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasCompetitorReqDto
                    }
                },
                required: true,
                description: "Competitor to be updated"
            },
            responses: {
                200: {
                    description: "Competitor updated",
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
                    description: "Competitor not found",
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
            tags: ["competitor-controller"],
            summary: "Delete a single competitor by ID",
            operationId: "deleteCompetitorsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the competitor to delete"
                }
            ],
            responses: {
                200: {
                    description: "Competitor deleted.",
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
                    description: "Competitor not found",
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

competitorController.get('/', async (c) => {
    const { name } = c.req.query();
    let nameVar: string | null = null;

    if (name !== null && name !== undefined && name?.length !== 0) {
        nameVar = name;
    }

    const commonGetResDto = await CompetitorService.getLdtos(nameVar);
    // const commonGetResDto = await CompetitorService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

competitorController.post('/', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Competitor empty."
            }
        };
        return c.json(errorRes, 400);
    }

    const commonCudResDto = await CompetitorService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

competitorController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await CompetitorService.getOne(id);

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
                message: "Competitor not found.",
                details: "Can not find competitor for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

competitorController.put('/:id', async (c) => {
    const body = await c.req.json();

    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Competitor empty."
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

    const res = await CompetitorService.updateOne(id, body);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

competitorController.delete('/:id', async (c) => {
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

    const res = await CompetitorService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default competitorController;