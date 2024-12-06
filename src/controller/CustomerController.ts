import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasCustomerResDto } from '../dto/res/CustomerResDto';
import { oasCustomerReqDto } from '../dto/req/CustomerReqDto';
import CustomerService from '../service/CustomerService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const customerController = new Hono();

export const oaspGetCustomers: ZodOpenApiPathsObject = {
    "/customers": {
        get: {
            tags: ["customer-controller"],
            summary: "Get all customers",
            operationId: "getAllCustomers",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Name of the customer to fetch"
                },
                {
                    name: "address",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Address of the customer to fetch"
                },
                {
                    name: "city",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "City of the customer to fetch"
                },
                {
                    name: "state_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "State Id of the customer to fetch"
                },
                {
                    name: "country",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Country of the customer to fetch"
                },
                {
                    name: "pin",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Pin Code of the customer to fetch"
                },
                {
                    name: "ship_name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Shipping Name of the customer to fetch"
                },
                {
                    name: "ship_address",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Shiping Address of the customer to fetch"
                },
                {
                    name: "ship_city",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Shipping City of the customer to fetch"
                },
                {
                    name: "ship_state_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Shipping state id of the customer to fetch"
                },
                {
                    name: "ship_country",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Shipping country of the customer to fetch"
                },
                {
                    name: "ship_pin",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Shipping Pin code of the customer to fetch"
                },
                {
                    name: "gst_no",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "GST number of the customer to fetch"
                },
                {
                    name: "owner",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Owner of the customer to fetch"
                },
                {
                    name: "code",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Code of the currency to fetch"
                },
                {
                    name: "contact_no",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Contact number of the customer to fetch"
                },
                {
                    name: "desc",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Description of the customer to fetch"
                },
                {
                    name: "contact_nature_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Contact Nature Id of the customer to fetch"
                },
                {
                    name: "inq_src_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Inquiry Source of the customer to fetch"
                },
                {
                    name: "industry_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Industry of the customer to fetch"
                },
                {
                    name: "machine_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Machine Id of the customer to fetch"
                },
                {
                    name: "email",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Email Id of the customer to fetch"
                },
                {
                    name: "competitor_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Competitor Id of the customer to fetch"
                },
                {
                    name: "class_ud",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Class of the customer to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Get all customers",
                    content: {
                        "application/json": {
                            schema: z.array(oasCustomerResDto)
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
            tags: ["customer-controller"],
            summary: "Create a new customer",
            operationId: "createCustomers",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasCustomerReqDto
                    }
                },
                required: true,
                description: "Customer to be created"
            },
            responses: {
                200: {
                    description: "Customer created successfully",
                    content: {
                        "application/json": {
                            schema: oasCustomerResDto
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
    "/customers/{id}": {
        get: {
            tags: ["customer-controller"],
            summary: "Get a single customer by ID",
            operationId: "getCustomersById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the customer to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Customer found",
                    content: {
                        "application/json": {
                            schema: oasCustomerResDto
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
                    description: "Customer not found",
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
            tags: ["customer-controller"],
            summary: "Update a single customer by ID",
            operationId: "putCustomersById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the customer to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasCustomerReqDto
                    }
                },
                required: true,
                description: "Customer to be updated"
            },
            responses: {
                200: {
                    description: "Customer updated",
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
                    description: "Customer not found",
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
            tags: ["customer-controller"],
            summary: "Delete a single customer by ID",
            operationId: "deleteCustomersById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the customer to delete"
                }
            ],
            responses: {
                200: {
                    description: "Customer deleted.",
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
                    description: "Customer not found",
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

customerController.get('/', async (c) => {

    const { name,
        address,
        city,
        state_id,
        country,
        pin,
        ship_name,
        ship_address,
        ship_city,
        ship_state_id,
        ship_country,
        ship_pin,
        gst_no,
        owner,
        code,
        contact_no,
        desc,
        contact_nature_id,
        inq_src_id,
        industry_id,
        machine_id,
        email,
        competitor_id,
        class_ud } = c.req.query();

    let nameVar: string | null = null;
    let addressVar: string | null = null;
    let cityVar: string | null = null;
    let stateId: number | null = null;
    let countryVar: string | null = null;
    let pinVar: number | null = null;
    let shipName: string | null = null;
    let shipAddress: string | null = null;
    let shipCity: string | null = null;
    let shipStateId: number | null = null;
    let shipCountry: string | null = null;
    let shipPin: number | null = null;
    let gstNo: string | null = null;
    let ownerVar: string | null = null;
    let codeVar: string | null = null;
    let contactNo: string | null = null;
    let descVar: string | null = null;
    let contactNatureId: number | null = null;
    let inqSrcId: number | null = null;
    let industryId: number | null = null;
    let machineId: number | null = null;
    let emailVar: string | null = null;
    let competitorId: number | null = null;
    let classUd: string | null = null;

    if (name !== null && name !== undefined && name?.length !== 0) {
        nameVar = name;
    }

    if (address !== null && address !== undefined && address?.length !== 0) {
        addressVar = address;
    }

    if (city !== null && city !== undefined && city?.length !== 0) {
        cityVar = city;
    }

    if (state_id !== null && state_id !== undefined && state_id?.length !== 0) {
        stateId = Number(state_id);
    }

    if (country !== null && country !== undefined && country?.length !== 0) {
        countryVar = country;
    }

    if (pin !== null && pin !== undefined && pin?.length !== 0) {
        pinVar = Number(pin);
    }

    if (ship_name !== null && ship_name !== undefined && ship_name?.length !== 0) {
        shipName = ship_name;
    }

    if (ship_address !== null && ship_address !== undefined && ship_address?.length !== 0) {
        shipAddress = ship_address;
    }

    if (ship_city !== null && ship_city !== undefined && ship_city?.length !== 0) {
        shipCity = ship_city;
    }

    if (ship_state_id !== null && ship_state_id !== undefined && ship_state_id?.length !== 0) {
        shipStateId = Number(ship_state_id);
    }

    if (ship_country !== null && ship_country !== undefined && ship_country?.length !== 0) {
        shipCountry = ship_country;
    }

    if (ship_pin !== null && ship_pin !== undefined && ship_pin?.length !== 0) {
        shipPin = Number(ship_pin);
    }

    if (gst_no !== null && gst_no !== undefined && gst_no?.length !== 0) {
        gstNo = gst_no;
    }

    if (owner !== null && owner !== undefined && owner?.length !== 0) {
        ownerVar = owner;
    }

    if (code !== null && code !== undefined && code?.length !== 0) {
        codeVar = code;
    }

    if (contact_no !== null && contact_no !== undefined && contact_no?.length !== 0) {
        contactNo = contact_no;
    }

    if (desc !== null && desc !== undefined && desc?.length !== 0) {
        descVar = desc;
    }

    if (contact_nature_id !== null && contact_nature_id !== undefined && contact_nature_id?.length !== 0) {
        contactNatureId = Number(contact_nature_id);
    }

    if (inq_src_id !== null && inq_src_id !== undefined && inq_src_id?.length !== 0) {
        inqSrcId = Number(inq_src_id);
    }

    if (industry_id !== null && industry_id !== undefined && industry_id?.length !== 0) {
        industryId = Number(industry_id);
    }

    if (machine_id !== null && machine_id !== undefined && machine_id?.length !== 0) {
        machineId = Number(machine_id);
    }

    if (email !== null && email !== undefined && email?.length !== 0) {
        emailVar = email;
    }

    if (competitor_id !== null && competitor_id !== undefined && competitor_id?.length !== 0) {
        competitorId = Number(competitor_id);
    }

    if (class_ud !== null && class_ud !== undefined && class_ud?.length !== 0) {
        classUd = class_ud;
    }

    const commonGetResDto = await CustomerService.getLdtos(
        nameVar,
        addressVar,
        cityVar,
        stateId,
        countryVar,
        pinVar,
        shipName,
        shipAddress,
        shipCity,
        shipStateId,
        shipCountry,
        shipPin,
        gstNo,
        ownerVar,
        codeVar,
        contactNo,
        descVar,
        contactNatureId,
        inqSrcId,
        industryId,
        machineId,
        emailVar,
        competitorId,
        classUd
    );
    // const commonGetResDto = await CustomerService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

customerController.post('/', async (c) => {
    let body = await c.req.json();

    // Add a new field to the body object
    body.created_by_user_id = "1"; // Replace 'newField' and 'newValue' with your desired key and value




    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.country === null || body.country === undefined || body.country.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter country.",
                details: "Can not leave country of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.ship_country === null || body.ship_country === undefined || body.ship_country.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter ship_country.",
                details: "Can not leave ship_country of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.gst_no === null || body.gst_no === undefined || body.gst_no.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter gst_no.",
                details: "Can not leave gst_no of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.code === null || body.code === undefined || body.code.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter code.",
                details: "Can not leave code of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.desc === null || body.desc === undefined || body.desc.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter description.",
                details: "Can not leave description of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.consump === null || body.consump === undefined || body.consump.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter consumption.",
                details: "Can not leave consumption of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.class_ud === null || body.class_ud === undefined || body.class_ud.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter class_ud field.",
                details: "Can not leave class_ud field of Customer empty."
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
                message: "Please enter created_by_user_id field.",
                details: "Can not leave created_by_user_id field of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    console.log(body)

    const commonCudResDto = await CustomerService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

customerController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await CustomerService.getOne(id);

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
                message: "Customer not found.",
                details: "Can not find customer for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

customerController.put('/:id', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.country === null || body.country === undefined || body.country.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter country.",
                details: "Can not leave country of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.ship_country === null || body.ship_country === undefined || body.ship_country.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter ship_country.",
                details: "Can not leave ship_country of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.gst_no === null || body.gst_no === undefined || body.gst_no.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter gst_no.",
                details: "Can not leave gst_no of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.code === null || body.code === undefined || body.code.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter code.",
                details: "Can not leave code of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.desc === null || body.desc === undefined || body.desc.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter description.",
                details: "Can not leave description of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.consump === null || body.consump === undefined || body.consump.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter consumption.",
                details: "Can not leave consumption of Customer empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.class_ud === null || body.class_ud === undefined || body.class_ud.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter class_ud field.",
                details: "Can not leave class_ud field of Customer empty."
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
                message: "Please enter created_by_user_id field.",
                details: "Can not leave created_by_user_id field of Customer empty."
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

    const res = await CustomerService.updateOne(id, body);
    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

customerController.delete('/:id', async (c) => {
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

    const res = await CustomerService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default customerController;