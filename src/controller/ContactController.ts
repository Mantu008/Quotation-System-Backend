import { Hono } from 'hono';
import { z } from 'zod';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { oasContactResDto } from '../dto/res/ContactResDto';
import { oasContactReqDto } from '../dto/req/ContactReqDto';
import ContactService from '../service/ContactService';
import CommonCudType, { oasCommonCudType } from '../types/CommonCudType';

const contactController = new Hono();

export const oaspGetContacts: ZodOpenApiPathsObject = {
    "/contacts": {
        get: {
            tags: ["contact-controller"],
            summary: "Get all contacts",
            operationId: "getAllContacts",
            parameters: [
                {
                    name: "name",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Name of the contact to fetch"
                },
                {
                    name: "address",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Address of the contact to fetch"
                },
                {
                    name: "city",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "City of the contact to fetch"
                },
                {
                    name: "state_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "State Id of the contact to fetch"
                },
                {
                    name: "country",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Country of the contact to fetch"
                },
                {
                    name: "pin",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Pin Code of the contact to fetch"
                },
                {
                    name: "job_title",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Job title of the contact to fetch"
                },
                {
                    name: "contact_no",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Contact number of the contact to fetch"
                },
                {
                    name: "email",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Email Id of the contact to fetch"
                },
                {
                    name: "contact_nature_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Contact Nature Id of the contact to fetch"
                },
                {
                    name: "inq_src_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Inquiry Source of the contact to fetch"
                },
                {
                    name: "industry_id",
                    in: "query",
                    required: false,
                    schema: {
                        type: "number"
                    },
                    description: "Industry of the contact to fetch"
                },
                {
                    name: "desc",
                    in: "query",
                    required: false,
                    schema: {
                        type: "string"
                    },
                    description: "Description of the contact to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Get all contacts",
                    content: {
                        "application/json": {
                            schema: z.array(oasContactResDto)
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
            tags: ["contact-controller"],
            summary: "Create a new contact",
            operationId: "createContacts",
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasContactReqDto
                    }
                },
                required: true,
                description: "Contact to be created"
            },
            responses: {
                200: {
                    description: "Contact created successfully",
                    content: {
                        "application/json": {
                            schema: oasContactResDto
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
    "/contacts/{id}": {
        get: {
            tags: ["contact-controller"],
            summary: "Get a single contact by ID",
            operationId: "getContactsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the contact to fetch"
                }
            ],
            responses: {
                200: {
                    description: "Contact found",
                    content: {
                        "application/json": {
                            schema: oasContactResDto
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
                    description: "Contact not found",
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
            tags: ["contact-controller"],
            summary: "Update a single contact by ID",
            operationId: "putContactsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the contact to update"
                }
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: oasContactReqDto
                    }
                },
                required: true,
                description: "Contact to be updated"
            },
            responses: {
                200: {
                    description: "Contact updated",
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
                    description: "Contact not found",
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
            tags: ["contact-controller"],
            summary: "Delete a single contact by ID",
            operationId: "deleteContactsById",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string"
                    },
                    description: "ID of the contact to delete"
                }
            ],
            responses: {
                200: {
                    description: "Contact deleted.",
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
                    description: "Contact not found",
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

contactController.get('/', async (c) => {
    const {
        name,
        address,
        city,
        state_id,
        country,
        pin,
        job_title,
        contact_no,
        email,
        contact_nature_id,
        inq_src_id,
        industry_id,
        desc
    } = c.req.query();

    let nameVar: string | null = null;
    let addressVar: string | null = null;
    let cityVar: string | null = null;
    let stateId: number | null = null;
    let countryVar: string | null = null;
    let pinVar: number | null = null;
    let jobTitle: string | null = null;
    let contactNo: string | null = null;
    let emailVar: string | null = null;
    let contactNatureId: number | null = null;
    let inqSrcId: number | null = null;
    let industryId: number | null = null;
    let descVar: string | null = null;

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

    if (job_title !== null && job_title !== undefined && job_title?.length !== 0) {
        jobTitle = job_title;
    }

    if (contact_no !== null && contact_no !== undefined && contact_no?.length !== 0) {
        contactNo = contact_no;
    }

    if (email !== null && email !== undefined && email?.length !== 0) {
        emailVar = email;
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

    if (desc !== null && desc !== undefined && desc?.length !== 0) {
        descVar = desc;
    }

    const commonGetResDto = await ContactService.getLdtos(
        nameVar,
        addressVar,
        cityVar,
        stateId,
        countryVar,
        pinVar,
        jobTitle,
        contactNo,
        emailVar,
        contactNatureId,
        inqSrcId,
        industryId,
        descVar
    );
    // const commonGetResDto = await ContactService.getAll();

    if (commonGetResDto.hasException) {
        return c.json(commonGetResDto.errorResDto, 500);
    }

    if (!commonGetResDto.isSuccess) {
        return c.json(commonGetResDto.errorResDto, 400);
    }

    return c.json(commonGetResDto.items);
});

contactController.post('/', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Contact empty."
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
                details: "Can not leave country of Contact empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.job_title === null || body.job_title === undefined || body.job_title.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter job_title.",
                details: "Can not leave job_title of Contact empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.contact_no3 === null || body.contact_no3 === undefined || body.contact_no3?.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter contact_no3.",
                details: "Can not leave contact_no3 of Contact empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.email2 === null || body.email2 === undefined || body.email2?.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter email2.",
                details: "Can not leave email2 of Contact empty."
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
                details: "Can not leave description of Contact empty."
            }
        };
        return c.json(errorRes, 400);
    }

    const commonCudResDto = await ContactService.create(body);

    if (commonCudResDto.hasException) {
        return c.json(commonCudResDto, 500);
    }

    if (!commonCudResDto.isSuccess) {
        return c.json(commonCudResDto, 400);
    }

    return c.json(commonCudResDto, 200);
});

contactController.get('/:id', async (c) => {
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

    const commonGetOneResDto = await ContactService.getOne(id);

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
                message: "Contact not found.",
                details: "Can not find contact for given ID"
            }
        };
        return c.json(errorRes, 404);
    }

    return c.json(commonGetOneResDto.item, 200);
});

contactController.put('/:id', async (c) => {
    const body = await c.req.json();
    if (body.name === null || body.name === undefined || body.name.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter Name.",
                details: "Can not leave Name of Contact empty."
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
                details: "Can not leave country of Contact empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.job_title === null || body.job_title === undefined || body.job_title.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter job_title.",
                details: "Can not leave job_title of Contact empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.contact_no3 === null || body.contact_no3 === undefined || body.contact_no3?.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter contact_no3.",
                details: "Can not leave contact_no3 of Contact empty."
            }
        };
        return c.json(errorRes, 400);
    }

    if (body.email2 === null || body.email2 === undefined || body.email2?.length === 0) {
        const errorRes: CommonCudType = {
            isSuccess: false,
            hasException: false,
            errorResDto: {
                timestamp: new Date(),
                code: "bad_request",
                message: "Please enter email2.",
                details: "Can not leave email2 of Contact empty."
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
                details: "Can not leave description of Contact empty."
            }
        };
        return c.json(errorRes, 400);
    }

    // if (body.customer_ids === undefined || body.customer_ids === null || body.customer_ids?.length === 0) {
    //     const errorRes: CommonCudType = {
    //         isSuccess: false,
    //         hasException: false,
    //         errorResDto: {
    //             timestamp: new Date(),
    //             code: "bad_request",
    //             message: "Please enter ids of customers.",
    //             details: "Can not leave customer ids of Contact empty."
    //         }
    //     };
    //     return c.json(errorRes, 400);
    // }

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

    const res = await ContactService.updateOne(id, body);
    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

contactController.delete('/:id', async (c) => {
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

    const res = await ContactService.deleteOne(id);

    if (res && res.hasException) {
        return c.json(res, 500);
    }

    if (res && !res.isSuccess) {
        return c.json(res, 400);
    }

    return c.json(res, 200);
});

export default contactController;