import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import CustomerContactResDto from '../dto/res/CustomerContactResDto';
import CustomerContactReqDto from '../dto/req/CustomerContactReqDto';
import connPool from '../config/DbConfig';
import CustomerContactDao from '../dao/CustomerContactDao';
import CommonCudType from '../types/CommonCudType';
import CustomerDao from '../dao/CustomerDao';
import CustomerResDto from '../dto/res/CustomerResDto';
import ContactDao from '../dao/ContactDao';
import ContactResDto from '../dto/res/ContactResDto';

export default class CustomerContactService {

	static async getAll(): Promise<CommonGetListType<CustomerContactResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<CustomerContactResDto>;

		try {
			conn.beginTransaction();
			let customercontactDao = new CustomerContactDao(conn);
			const rows: CustomerContactResDto[] = await customercontactDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<CustomerContactResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<CustomerContactResDto | null>;

		try {
			conn.beginTransaction();
			let customercontactDao = new CustomerContactDao(conn);
			const rows: CustomerContactResDto | null = await customercontactDao.getOne(id);
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
		customerId: number | null,
		contactId: number | null
	): Promise<CommonGetListType<CustomerContactResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<CustomerContactResDto>;
		try {
			conn.beginTransaction();
			let customercontactDao = new CustomerContactDao(conn);
			const rows: CustomerContactResDto[] = await customercontactDao.getLdtos(customerId, contactId);
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

	static async create(body: CustomerContactReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();

			let customerDao = new CustomerDao(conn);
			const customerRes: CustomerResDto | null = await customerDao.getOne(body.customer_id.toString());
			if(customerRes === null){
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

			let contactDao = new ContactDao(conn);
			const contactRes: ContactResDto | null = await contactDao.getOne(body.contact_id.toString());
			if(contactRes === null){
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

			let customercontactDao = new CustomerContactDao(conn);

			const data = await customercontactDao.findByCustomerIdAndContactId(body.customer_id, body.contact_id);
			if(data?.customer_id === body.customer_id && data?.contact_id === body.contact_id){
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "customer_contact_already_exist",
						message: "Customer Contact already exists.",
						details: "Customer Contact already exists."
					}
				};
			}

			await customercontactDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New customer contact created."
			};
		} catch(e){
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
		} finally{
			conn.release();
		}
		return res;
	}

	static async updateOne(id: string, body: CustomerContactReqDto) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let customercontactDao = new CustomerContactDao(conn);
			const commonGetOneResDto = await customercontactDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Customer Contact not found.",
						details: "Can not find customer contact for given ID"
					}
				};
			}

			let customerDao = new CustomerDao(conn);
			const customerRes: CustomerResDto | null = await customerDao.getOne(body.customer_id.toString());
			if(customerRes === null){
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

			let contactDao = new ContactDao(conn);
			const contactRes: ContactResDto | null = await contactDao.getOne(body.contact_id.toString());
			if(contactRes === null){
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
			
			const data = await customercontactDao.findByCustomerIdAndContactId(body.customer_id, body.contact_id);
			if(data?.customer_id === body.customer_id && data?.contact_id === body.contact_id && data?.id !== Number(id)){
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "customer_contact_already_exist",
						message: "Customer Contact already exists.",
						details: "Customer Contact already exists."
					}
				};
			}

			await customercontactDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Customer Contact Updated."
			};
		} catch(e){
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
		} finally{
			conn.release();
		}
		return res;
	}

	static async deleteOne(id: string) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let customercontactDao = new CustomerContactDao(conn);

			const commonGetOneResDto = await customercontactDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Customer Contact not found.",
						details: "Can not find customer contact for given ID"
					}
				};
			}

			await customercontactDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Customer Contact Deleted."
			};
		} catch(e){
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
		} finally{
			conn.release();
		}
		return res;
	}
}