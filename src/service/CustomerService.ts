import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import CustomerResDto from '../dto/res/CustomerResDto';
import CustomerReqDto from '../dto/req/CustomerReqDto';
import connPool from '../config/DbConfig';
import CustomerDao from '../dao/CustomerDao';
import CommonCudType from '../types/CommonCudType';
import StateDao from '../dao/StateDao';
import ContactNatureDao from '../dao/ContactNatureDao';
import InquirySourceDao from '../dao/InquirySourceDao';
import IndustryDao from '../dao/IndustryDao';
import MachineDao from '../dao/MachineDao';
import CompetitorDao from '../dao/CompetitorDao';
import UserDao from '../dao/UserDao';
import StateResDto from '../dto/res/StateResDto';
import CustomerContactReqDto from '../dto/req/CustomerContactReqDto';
import ContactDao from '../dao/ContactDao';
import CustomerContactDao from '../dao/CustomerContactDao';
import ContactResDto from '../dto/res/ContactResDto';

export default class CustomerService {

	static async getAll(): Promise<CommonGetListType<CustomerResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<CustomerResDto>;

		try {
			conn.beginTransaction();
			let customerDao = new CustomerDao(conn);
			const rows: CustomerResDto[] = await customerDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<CustomerResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<CustomerResDto | null>;

		try {
			conn.beginTransaction();
			let customerDao = new CustomerDao(conn);
			const rows: CustomerResDto | null = await customerDao.getOne(id);
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
		shipName: string | null,
		shipAddress: string | null,
		shipCity: string | null,
		shipStateId: number | null,
		shipCountry: string | null,
		shipPin: number | null,
		gstNo: string | null,
		ownerVar: string | null,
		codeVar: string | null,
		contactNo: string | null,
		descVar: string | null,
		contactNatureId: number | null,
		inqSrcId: number | null,
		industryId: number | null,
		machineId: number | null,
		emailVar: string | null,
		competitorId: number | null,
		classUd: string | null
	): Promise<CommonGetListType<CustomerResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<CustomerResDto>;
		try {
			conn.beginTransaction();
			let customerDao = new CustomerDao(conn);
			const rows: CustomerResDto[] = await customerDao.getLdtos(
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

	static async create(body: CustomerReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try {
			conn.beginTransaction();
			let customerDao = new CustomerDao(conn);
			const data = await customerDao.findByNameAndCode(body.name, body.code);
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

			if (data?.code === body.code) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "code_already_exists",
						message: "Can not create duplicate entry with same code.",
						details: "Can not create duplicate entry with same code."
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

			if (body.machine_id !== undefined && body.machine_id !== null) {
				let machineDao = new MachineDao(conn);
				const machineRes = await machineDao.getOne(body.machine_id?.toString());
				if (!machineRes) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "machine_not_found",
							message: "Can not find machine from given machine id.",
							details: "Can not find machine from given machine id."
						}
					};
				}
			}

			let competitorDao = new CompetitorDao(conn);
			if (body.competitor1 !== undefined && body.competitor1 !== null) {
				const competitorRes1 = await competitorDao.getOne(body.competitor1?.toString());
				if (!competitorRes1) {
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "competitor_not_found",
							message: "Can not find competitor from given competitor1 id .",
							details: "Can not find competitor from given competitor1 id."
						}
					};
				}
			}

			if (body.competitor2 !== undefined && body.competitor2 !== null) {
				const competitorRes2 = await competitorDao.getOne(body.competitor2.toString());
				if (!competitorRes2) {
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "competitor_not_found",
							message: "Can not find competitor from given competitor2 id.",
							details: "Can not find competitor from given competitor2 id."
						}
					};
				}
			}

			if (body.created_by_user_id) {
				let userDao = new UserDao(conn);
				const userRes = await userDao.getOne(body.created_by_user_id.toString());
				if (!userRes) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "user_not_found",
							message: "Can not find user from given created by user id.",
							details: "Can not find user from given created by user id."
						}
					};
				}
			}

			/*
				{
					"name": "string",
					"owner": "string",
					"address": "string",
					"city": "string",
					"state_id": 29,
					"country": "string",
					"pin": 0,
					"ship_name": "string",
					"ship_add": "string",
					"ship_city": "string",
					"ship_state_id": 0,
					"ship_country": "string",
					"ship_pin": 0,
					"gst_no": "string",
					"code": "string",
					"contact_no1": "string",
					"contact_no2": "string",
					"desc": "string",
					"contact_nature_id": null,
					"inq_src_id": null,
					"industry_id": null,
					"machine_id": null,
					"consump": "string",
					"email": "string",
					"competitor1": 33,
					"competitor2": 34,
					"class_ud": "string",
					"created_by_user_id": 1,
					"contact_ids": [
						1010,
						1008
					]
				}
			*/

			const custCreateRes = await customerDao.create(body);

			if (body.contact_ids !== null && body.contact_ids !== undefined && body.contact_ids?.length !== 0) {
				// const customerRes = await customerDao.findByNameAndCode(body.name, body.code);
				if (custCreateRes.insertId !== null) {
					let contactDao = new ContactDao(conn);
					let contactIdsNotFound: number[] = [];
					let commonGetOneResDto = null;

					await Promise.all(
						body.contact_ids.map(async (id: number) => {
							commonGetOneResDto = await contactDao.getOne(id.toString());
							if (commonGetOneResDto === null) {
								contactIdsNotFound.push(id);
							}
						})
					);

					if (contactIdsNotFound.length !== 0) {
						// conn.commit();
						return {
							isSuccess: false,
							hasException: false,
							errorResDto: {
								timestamp: new Date(),
								code: "contacts_not_found",
								message: `Contacts not found for following ids: ${contactIdsNotFound.join(", ")}`,
								details: `Contacts not found for following ids: ${contactIdsNotFound.join(", ")}`
							}
						};
					}
					else {
						let customerContactReqDto: CustomerContactReqDto = { customer_id: custCreateRes.insertId, contact_id: 0 };
						try {
							let customerContactDao = new CustomerContactDao(conn);
							body.contact_ids.map(async (id: number) => {
								customerContactReqDto.contact_id = id;
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
							code: "customer_not_found",
							message: "Newly created customer not found while creating customer contacts.",
							details: "Newly created customer not found while creating customer contacts."
						}
					};
				}
			}
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New customer created."
			};
		} catch (e) {
			conn.commit();
			console.log(e);
			res = {
				isSuccess: false,
				hasException: true,
				errorResDto: {
					timestamp: new Date(),
					code: "internal_server_error",
					message: "Internal server error occured while creating new customer.",
					details: "Internal server error occured while creating new customer."
				}
			};
		} finally {
			conn.release();
		}
		return res;
	}

	static async updateOne(id: string, body: CustomerReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try {
			conn.beginTransaction();
			let customerDao = new CustomerDao(conn);
			const commonGetOneResDto = await customerDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "customer_not_found",
						message: "Customer not found.",
						details: "Can not find customer for given ID"
					}
				};
			}

			const data = await customerDao.findByNameAndCode(body.name, body.code);
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

			if (data?.code === body.code && data.id.toString() !== id) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "code_already_exists",
						message: "Can not create duplicate entry with same code.",
						details: "Can not create duplicate entry with same code."
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

			if (body.machine_id !== undefined && body.machine_id !== null) {
				let machineDao = new MachineDao(conn);
				const machineRes = await machineDao.getOne(body.machine_id?.toString());
				if (!machineRes) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "machine_not_found",
							message: "Can not find machine from given machine id.",
							details: "Can not find machine from given machine id."
						}
					};
				}
			}

			let competitorDao = new CompetitorDao(conn);
			if (body.competitor1 !== undefined && body.competitor1 !== null) {
				const competitorRes1 = await competitorDao.getOne(body.competitor1?.toString());
				if (!competitorRes1) {
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "competitor_not_found",
							message: "Can not find competitor from given competitor1 id .",
							details: "Can not find competitor from given competitor1 id."
						}
					};
				}
			}

			if (body.competitor2 !== undefined && body.competitor2 !== null) {
				const competitorRes2 = await competitorDao.getOne(body.competitor2.toString());
				if (!competitorRes2) {
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "competitor_not_found",
							message: "Can not find competitor from given competitor2 id.",
							details: "Can not find competitor from given competitor2 id."
						}
					};
				}
			}

			if (body.created_by_user_id) {
				let userDao = new UserDao(conn);
				const userRes = await userDao.getOne(body.created_by_user_id.toString());
				if (!userRes) {
					conn.commit();
					return {
						isSuccess: false,
						hasException: false,
						errorResDto: {
							timestamp: new Date(),
							code: "user_not_found",
							message: "Can not find user from given created by user id.",
							details: "Can not find user from given created by user id."
						}
					};
				}
			}

			await customerDao.updateOne(id, body);

			if (body.contact_ids !== null && body.contact_ids !== undefined && body.contact_ids?.length !== 0) {

				let contactDao = new ContactDao(conn);
				let contactIdsNotFound: number[] = [];
				let commonGetOneResDto = null;

				await Promise.all(
					body.contact_ids.map(async (id: number) => {
						commonGetOneResDto = await contactDao.getOne(id.toString());
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
							code: "contacts_not_found",
							message: `Contacts not found for following ids: ${contactIdsNotFound.join(", ")}`,
							details: `Contacts not found for following ids: ${contactIdsNotFound.join(", ")}`
						}
					};
				}
				else {
					const customerContactDao = new CustomerContactDao(conn);
					await customerContactDao.deleteByCustomerId(id);

					let customerContactReqDto: CustomerContactReqDto = { customer_id: Number(id), contact_id: 0 };
					try {
						let customerContactDao = new CustomerContactDao(conn);
						body.contact_ids.map(async (id: number) => {
							customerContactReqDto.contact_id = id;
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
				message: "Customer Updated."
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
			let customerDao = new CustomerDao(conn);

			const commonGetOneResDto = await customerDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Customer not found.",
						details: "Can not find customer for given ID"
					}
				};
			}

			await customerDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Customer Deleted."
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