import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasCustomerContactResDto } from '../dto/res/CustomerContactResDto';
import { oasCustomerContactReqDto } from '../dto/req/CustomerContactReqDto';
import CustomerContactService from '../service/CustomerContactService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const customercontactController = new Hono();

export const oaspGetCustomerContacts: ZodOpenApiPathsObject = {
    "/customer-contacts": {
        get: {
            tags: ["customer-contact-controller"],
            summary: "Get all customer contact",
            operationId: "getAllCustomerContacts",
            parameters: [
                {
                    name: "customer_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Customer Id of the customer contact to fetch"
                },
                {
                    name: "contact_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Contact Id of the customer contact to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Get all customer contacts",
                    content: {
                        "application/json": {
                            schema: z.array(oasCustomerContactResDto)
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
            tags: ["customer-contact-controller"],
            summary: "Create a new customer contact",
            operationId: "createCustomerContacts",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasCustomerContactReqDto
                    }
                },
                required: true,
                description: "Customer Contact to be created"
            },
            responses: {
                200: {
                    description: "Customer Contact created successfully",
                    content: {
                        "application/json": {
                            schema: oasCustomerContactResDto
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
    "/customer-contacts/{id}": {
        get: {
            tags: ["customer-contact-controller"],
            summary: "Get a single customer contact by ID",
            operationId: "getCustomerContactsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the customer contact to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Customer Contact found",
                    content: {
                        "application/json": {
                            schema: oasCustomerContactResDto
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
                    description: "Customer Contact not found",
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
            tags: ["customer-contact-controller"],
            summary: "Update a single customer contact by ID",
            operationId: "putCustomerContactsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the customer contact to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasCustomerContactReqDto
                    }
                },
                required: true,
                description: "Customer Contact to be updated"
            },
            responses: {
                200: {
                    description: "Customer Contact updated",
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
                    description: "Customer Contacts not found",
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
            tags: ["customer-contact-controller"],
            summary: "Delete a single customer contact by ID",
            operationId: "deleteCustomerContactsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the customer contact to delete"
                }
            ],
            responses: {
                200: {
                    description: "Customer Contact deleted.",
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
                    description: "Customer Contact not found",
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

customercontactController.get('/', async (c) => {
    const { customer_id, contact_id } = c.req.query();
    let customerId: number | null = null;
    let contactId: number | null = null;

    if (customer_id !== null && customer_id !== undefined && customer_id?.length !== 0) {
        customerId = Number(customer_id);
    }

    if (contact_id !== null && contact_id !== undefined && contact_id?.length !== 0) {
        contactId = Number(contact_id);
    }

    const commonGetResDto = await CustomerContactService.getLdtos(customerId, contactId);
    // const commonGetResDto = await CustomerContactService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

customercontactController.post('/', async (c) => {
    const body = await c.req.json();
    if (body.customer_id === null || body.customer_id === undefined || body.customer_id.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter customer id.",
                details: "Can not leave customer id of Customer Contacts empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.contact_id === null || body.contact_id === undefined || body.contact_id.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter contact id.",
                details: "Can not leave contact id of Customer Contacts empty."
            }
        };
        return c.json(errorRes, 400);
    }

    const commonCudResDto = await CustomerContactService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

customercontactController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await CustomerContactService.getOne(id);

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
                message: "CustomerContacts not found.",
                details: "Can not find customercontact for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

customercontactController.put('/:id', async (c) => {
    const body = await c.req.json();

    if (body.customer_id === null || body.customer_id === undefined || body.customer_id.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter customer id.",
                details: "Can not leave customer id of Customer Contacts empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.contact_id === null || body.contact_id === undefined || body.contact_id.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter contact id.",
                details: "Can not leave contact id of Customer Contacts empty."
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

    const res = await CustomerContactService.updateOne(id, body);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

customercontactController.delete('/:id', async (c) => {
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

    const res = await CustomerContactService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default customercontactController;