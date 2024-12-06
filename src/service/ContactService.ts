import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import ContactResDto from '../dto/res/ContactResDto';
import ContactReqDto from '../dto/req/ContactReqDto';
import connPool from '../config/DbConfig';
import ContactDao from '../dao/ContactDao';
import CommonCudType from '../types/CommonCudType';
import StateDao from '../dao/StateDao';
import ContactNatureDao from '../dao/ContactNatureDao';
import InquirySourceDao from '../dao/InquirySourceDao';
import IndustryDao from '../dao/IndustryDao';
import MachineDao from '../dao/MachineDao';
import CompetitorDao from '../dao/CompetitorDao';
import UserDao from '../dao/UserDao';
import CustomerDao from '../dao/CustomerDao';
import CustomerContactReqDto from '../dto/req/CustomerContactReqDto';
import CustomerContactDao from '../dao/CustomerContactDao';

export default class ContactService {

	static async getAll(): Promise<CommonGetListType<ContactResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<ContactResDto>;

		try {
			conn.beginTransaction();
			let contactDao = new ContactDao(conn);
			const rows: ContactResDto[] = await contactDao.getAll();
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				items: rows
			}
		}
		catch (e) {
			console.log(e);
			res = {
				isSuccess: false,
				hasException: true,
				errorResDto: {
					timestamp: new Date(),
					code: "internal_server_error",
					message: "Internal server error occured",
					details: "Internal server error occured"
				}
			};
		}
		finally {
			conn.release();
		}

		return res;

	}

	static async getOne(id: string): Promise<CommonGetOneType<ContactResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<ContactResDto | null>;

		try {
			conn.beginTransaction();
			let contactDao = new ContactDao(conn);
			const rows: ContactResDto | null = await contactDao.getOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				item: rows,
				hasException: false
			}
		}
		catch (e) {
			console.log(e);
			res = {
				isSuccess: false,
				hasException: true,
				errorResDto: {
					timestamp: new Date(),
					code: "internal_server_error",
					message: "Internal server error occured",
					details: "Internal server error occured"
				}
			};
		}
		finally {
			conn.release();
		}
		return res;
	}

	static async getLdtos(
		nameVar: string | null,
		addressVar: string | null,
		cityVar: string | null,
		stateId: number | null,
		countryVar: string | null,
		pinVar: number | null,
		jobTitle: string | null,
		contactNo: string | null,
		emailVar: string | null,
		contactNatureId: number | null,
		inqSrcId: number | null,
		industryId: number | null,
		descVar: string | null
	): Promise<CommonGetListType<ContactResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<ContactResDto>;
		try {
			conn.beginTransaction();
			let contactDao = new ContactDao(conn);
			const rows: ContactResDto[] = await contactDao.getLdtos(
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
			conn.commit();
			res = {
				isSuccess: true,
				items: rows,
				hasException: false
			}
		}
		catch (e) {
			console.log(e);
			res = {
				isSuccess: false,
				hasException: true,
				errorResDto: {
					timestamp: new Date(),
					code: "internal_server_error",
					message: "Internal server error occured",
					details: "Internal server error occured"
				}
			};
		}
		finally {
			conn.release();
		}
		return res;
	}

	static async create(body: ContactReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try {
			conn.beginTransaction();
			let contactDao = new ContactDao(conn);
			const data = await contactDao.findByName(body.name);
			if (data?.name === body.name) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "name_already_exists",
						message: "Can not create duplicate entry with same Name.",
						details: "Can not create duplicate entry with same Name."
					}
				};
			}

			if (body.state_id !== undefined && body.state_id !== null) {
				let stateDao = new StateDao(conn);
				const stateRes = await stateDao.getOne(body.state_id?.toString());
				if (stateRes === null) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "not_found",
							message: "State not found.",
							details: "Can not find state for given ID"
						}
					};
				}
			}

			if (body.contact_nature_id !== undefined && body.contact_nature_id !== null) {
				let contactNatureDao = new ContactNatureDao(conn);
				const contactNatureRes = await contactNatureDao.getOne(body.contact_nature_id.toString());
				if (contactNatureRes === null) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "not_found",
							message: "Contact nature not found.",
							details: "Can not find contact nature for given ID"
						}
					};
				}
			}

			if (body.inq_src_id !== undefined && body.inq_src_id !== null) {
				let inquirySourceDao = new InquirySourceDao(conn);
				const inquirySourceRes = await inquirySourceDao.getOne(body.inq_src_id.toString());
				if (inquirySourceRes === null) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "not_found",
							message: "Inquiry Source not found.",
							details: "Can not find inquiry source for given ID"
						}
					};
				}
			}

			if (body.industry_id !== undefined && body.industry_id !== null) {
				let industryDao = new IndustryDao(conn);
				const industryRes = await industryDao.getOne(body.industry_id?.toString());
				if (industryRes === null) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "not_found",
							message: "Industry not found.",
							details: "Can not find industry for given ID"
						}
					};
				}
			}

			/*
				{
					"name": "str",
					"address": "string",
					"city": "string",
					"state_id": 1,
					"country": "string",
					"pin": 0,
					"job_title": "string",
					"contact_no1": "string",
					"contact_no2": "string",
					"contact_no3": "string",
					"email1": "string",
					"email2": "string",
					"contact_nature_id": null,
					"inq_src_id": null,
					"industry_id": null,
					"desc": "string",
					"customer_ids": [
						1342,
						1343
					]
				}
			*/
			const contactCreateRes = await contactDao.create(body);

			if (body.customer_ids !== null && body.customer_ids !== undefined && body.customer_ids?.length !== 0) {
				// const contactRes = await contactDao.findByName(body.name);
				if (contactCreateRes.insertId !== null) {
					let customerDao = new CustomerDao(conn);
					let customerIdsNotFound: number[] = [];
					let commonGetOneResDto = null;

					await Promise.all(
						body.customer_ids.map(async (id: number) => {
							commonGetOneResDto = await customerDao.getOne(id.toString());
							if (commonGetOneResDto === null) {
								customerIdsNotFound.push(id);
							}
						})
					);

					if (customerIdsNotFound.length !== 0) {
						// conn.commit();
						return {
							isSuccess: false,
							hasException: false,
							errorResDto: {
								timestamp: new Date(),
								code: "customers_not_found",
								message: `Customers not found for following ids: ${customerIdsNotFound.join(", ")}`,
								details: `Customers not found for following ids: ${customerIdsNotFound.join(", ")}`
							}
						};
					}
					else {
						let customerContactReqDto: CustomerContactReqDto = { customer_id: 0, contact_id: contactCreateRes.insertId };
						try {
							let customerContactDao = new CustomerContactDao(conn);
							body.customer_ids.map(async (id: number) => {
								customerContactReqDto.customer_id = id;
								await customerContactDao.create(customerContactReqDto);
							});
						} catch (error) {
							console.log(error);
							return {
								isSuccess: false,
								hasException: true,
								errorResDto: {
									timestamp: new Date(),
									code: "internal_server_error",
									message: "Internal server error occured while creating customer contact.",
									details: "Internal server error occured while creating customer contact."
								}
							};
						}
					}
				}
				else {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "contact_not_found",
							message: "Newly created contact not found while creating customer contacts.",
							details: "Newly created contact not found while creating customer contacts."
						}
					};
				}
			}

			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New contact created."
			};
		} catch (e) {
			console.log(e);
			res = {
				isSuccess: false,
				hasException: true,
				errorResDto: {
					timestamp: new Date(),
					code: "internal_server_error",
					message: "Internal server error occured",
					details: "Internal server error occured"
				}
			};
		} finally {
			conn.release();
		}
		return res;
	}

	static async updateOne(id: string, body: ContactReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try {
			conn.beginTransaction();
			let contactDao = new ContactDao(conn);
			const commonGetOneResDto = await contactDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "contact_not_found",
						message: "Contact not found.",
						details: "Can not find contact for given ID"
					}
				};
			}

			const data = await contactDao.findByName(body.name);
			if (data?.name === body.name && data.id.toString() !== id) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "name_already_exists",
						message: "Can not create duplicate entry with same Name.",
						details: "Can not create duplicate entry with same Name."
					}
				};
			}

			if (body.state_id !== undefined && body.state_id !== null) {
				let stateDao = new StateDao(conn);
				const stateRes = await stateDao.getOne(body.state_id?.toString());
				if (stateRes === null) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "not_found",
							message: "State not found.",
							details: "Can not find state for given ID"
						}
					};
				}
			}

			if (body.contact_nature_id !== undefined && body.contact_nature_id !== null) {
				let contactNatureDao = new ContactNatureDao(conn);
				const contactNatureRes = await contactNatureDao.getOne(body.contact_nature_id.toString());
				if (contactNatureRes === null) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "not_found",
							message: "Contact nature not found.",
							details: "Can not find contact nature for given ID"
						}
					};
				}
			}

			if (body.inq_src_id !== undefined && body.inq_src_id !== null) {
				let inquirySourceDao = new InquirySourceDao(conn);
				const inquirySourceRes = await inquirySourceDao.getOne(body.inq_src_id.toString());
				if (inquirySourceRes === null) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "not_found",
							message: "Inquiry Source not found.",
							details: "Can not find inquiry source for given ID"
						}
					};
				}
			}

			if (body.industry_id !== undefined && body.industry_id !== null) {
				let industryDao = new IndustryDao(conn);
				const industryRes = await industryDao.getOne(body.industry_id?.toString());
				if (industryRes === null) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "not_found",
							message: "Industry not found.",
							details: "Can not find industry for given ID"
						}
					};
				}
			}

			await contactDao.updateOne(id, body);

			if (body.customer_ids !== null && body.customer_ids !== undefined && body.customer_ids?.length !== 0) {

				let customerDao = new CustomerDao(conn);
				let contactIdsNotFound: number[] = [];
				let commonGetOneResDto = null;

				await Promise.all(
					body.customer_ids.map(async (id: number) => {
						commonGetOneResDto = await customerDao.getOne(id.toString());
						if (commonGetOneResDto === null) {
							contactIdsNotFound.push(id);
						}
					})
				);

				if (contactIdsNotFound.length !== 0) {
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "customers_not_found",
							message: `Customers not found for following ids: ${contactIdsNotFound.join(", ")}`,
							details: `Customers not found for following ids: ${contactIdsNotFound.join(", ")}`
						}
					};
				}
				else {
					const customerContactDao = new CustomerContactDao(conn);
					await customerContactDao.deleteByContactId(id);

					let customerContactReqDto: CustomerContactReqDto = { customer_id: 0, contact_id: Number(id) };
					try {
						let customerContactDao = new CustomerContactDao(conn);
						body.customer_ids.map(async (id: number) => {
							customerContactReqDto.customer_id = id;
							await customerContactDao.create(customerContactReqDto);
						});
					} catch (error) {
						console.log(error);
						return {
							isSuccess: false,
							hasException: true,
							errorResDto: {
								timestamp: new Date(),
								code: "internal_server_error",
								message: "Internal server error occured while updating customer contact.",
								details: "Internal server error occured while updating customer contact."
							}
						};
					}
				}
			}

			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Contact Updated."
			};
		} catch (e) {
			console.log(e);
			res = {
				isSuccess: false,
				hasException: true,
				errorResDto: {
					timestamp: new Date(),
					code: "internal_server_error",
					message: "Internal server error occured",
					details: "Internal server error occured"
				}
			};
		} finally {
			conn.release();
		}
		return res;
	}

	static async deleteOne(id: string): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try {
			conn.beginTransaction();
			let contactDao = new ContactDao(conn);

			const commonGetOneResDto = await contactDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Contact not found.",
						details: "Can not find contact for given ID"
					}
				};
			}

			await contactDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Contact Deleted."
			};
		} catch (e) {
			console.log(e);
			res = {
				isSuccess: false,
				hasException: true,
				errorResDto: {
					timestamp: new Date(),
					code: "internal_server_error",
					message: "Internal server error occured",
					details: "Internal server error occured"
				}
			};
		} finally {
			conn.release();
		}
		return res;
	}
}