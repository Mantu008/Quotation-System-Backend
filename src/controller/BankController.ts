import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasBankResDto } from '../dto/res/BankResDto';
import { oasBankReqDto } from '../dto/req/BankReqDto';
import BankService from '../service/BankService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const bankController = new Hono();

export const oaspGetBanks: ZodOpenApiPathsObject = {
    "/banks": {
        get: {
            tags: ["bank-controller"],
            summary: "Get all banks",
            operationId: "getAllBanks",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Name of the bank to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Get all banks",
                    content: {
                        "application/json": {
                            schema: z.array(oasBankResDto)
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
            tags: ["bank-controller"],
            summary: "Create a new bank",
            operationId: "createBanks",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasBankReqDto
                    }
                },
                required: true,
                description: "Bank to be created"
            },
            responses: {
                200: {
                    description: "Bank created successfully",
                    content: {
                        "application/json": {
                            schema: oasBankResDto
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
    "/banks/{id}": {
        get: {
            tags: ["bank-controller"],
            summary: "Get a single bank by ID",
            operationId: "getBanksById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the bank to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Bank found",
                    content: {
                        "application/json": {
                            schema: oasBankResDto
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
                    description: "Bank not found",
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
            tags: ["bank-controller"],
            summary: "Update a single bank by ID",
            operationId: "putBanksById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the bank to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasBankReqDto
                    }
                },
                required: true,
                description: "Bank to be updated"
            },
            responses: {
                200: {
                    description: "Bank updated",
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
                    description: "Bank not found",
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
            tags: ["bank-controller"],
            summary: "Delete a single bank by ID",
            operationId: "deleteBanksById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the bank to delete"
                }
            ],
            responses: {
                200: {
                    description: "Bank deleted.",
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
                    description: "Bank not found",
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

bankController.get('/', async (c) => {

    const { name } = c.req.query();
    let nameVar: string | null = null;

    if (name !== null && name !== undefined && name?.length !== 0) {
        nameVar = name;
    }

    const commonGetResDto = await BankService.getLdtos(nameVar);
    // const commonGetResDto = await BankService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

bankController.post('/', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Bank empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.acct_no === null || body.acct_no === undefined || body.acct_no.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Account Number.",
                details: "Can not leave Account Number of Bank empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.ifsc === null || body.ifsc === undefined || body.ifsc.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter IFSC.",
                details: "Can not leave IFSC of Bank empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.branch === null || body.branch === undefined || body.branch.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter branch.",
                details: "Can not leave branch of Bank empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.address === null || body.address === undefined || body.address.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter address.",
                details: "Can not leave address of Bank empty."
            }
        };
        return c.json(errorRes, 400);
    }

    const commonCudResDto = await BankService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

bankController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await BankService.getOne(id);

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
                message: "Bank not found.",
                details: "Can not find bank for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

bankController.put('/:id', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Bank empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.acct_no === null || body.acct_no === undefined || body.acct_no.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Account Number.",
                details: "Can not leave Account Number of Bank empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.ifsc === null || body.ifsc === undefined || body.ifsc.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter IFSC.",
                details: "Can not leave IFSC of Bank empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.branch === null || body.branch === undefined || body.branch.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter branch.",
                details: "Can not leave branch of Bank empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.address === null || body.address === undefined || body.address.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter address.",
                details: "Can not leave address of Bank empty."
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

    const res = await BankService.updateOne(id, body);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

bankController.delete('/:id', async (c) => {
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

    const res = await BankService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default bankController;