import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasPaymentMethodResDto } from '../dto/res/PaymentMethodResDto';
import { oasPaymentMethodReqDto } from '../dto/req/PaymentMethodReqDto';
import PaymentMethodService from '../service/PaymentMethodService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const paymentmethodController = new Hono();

export const oaspGetPaymentmethods: ZodOpenApiPathsObject = {
    "/payment-methods": {
        get: {
            tags: ["payment-method-controller"],
            summary: "Get all payment methods",
            operationId: "getAllPaymentMethods",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Name of the Payment method to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Get all payment methods",
                    content: {
                        "application/json": {
                            schema: z.array(oasPaymentMethodResDto)
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
            tags: ["payment-method-controller"],
            summary: "Create a new payment method",
            operationId: "createPaymentMethods",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasPaymentMethodReqDto
                    }
                },
                required: true,
                description: "Paymentmethod to be created"
            },
            responses: {
                200: {
                    description: "Paymentmethod created successfully",
                    content: {
                        "application/json": {
                            schema: oasPaymentMethodResDto
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
    "/payment-methods/{id}": {
        get: {
            tags: ["payment-method-controller"],
            summary: "Get a single payment method by ID",
            operationId: "getPaymentMethodsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the payment method to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Payment method found",
                    content: {
                        "application/json": {
                            schema: oasPaymentMethodResDto
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
                    description: "Payment method not found",
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
            tags: ["payment-method-controller"],
            summary: "Update a single payment method by ID",
            operationId: "putPaymentMethodsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the payment method to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasPaymentMethodReqDto
                    }
                },
                required: true,
                description: "Payment method to be updated"
            },
            responses: {
                200: {
                    description: "Payment method updated",
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
                    description: "Payment method not found",
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
            tags: ["payment-method-controller"],
            summary: "Delete a single payment method by ID",
            operationId: "deletePaymentMethodsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the payment method to delete"
                }
            ],
            responses: {
                200: {
                    description: "Payment method deleted.",
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
                    description: "Payment method not found",
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

paymentmethodController.get('/', async (c) => {
    const { name } = c.req.query();
    let nameVar: string | null = null;

    if (name !== null && name !== undefined && name?.length !== 0) {
        nameVar = name;
    }

    const commonGetResDto = await PaymentMethodService.getLdtos(nameVar);
    // const commonGetResDto = await PaymentMethodService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

paymentmethodController.post('/', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Payment method empty."
            }
        };
        return c.json(errorRes, 400);
    }

    const commonCudResDto = await PaymentMethodService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

paymentmethodController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await PaymentMethodService.getOne(id);

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
                message: "Paymentmethod not found.",
                details: "Can not find payment method for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

paymentmethodController.put('/:id', async (c) => {
    const body = await c.req.json();

    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Payment method empty."
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

    const res = await PaymentMethodService.updateOne(id, body);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

paymentmethodController.delete('/:id', async (c) => {
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

    const res = await PaymentMethodService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default paymentmethodController;