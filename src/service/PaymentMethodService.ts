import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import PaymentMethodResDto from '../dto/res/PaymentMethodResDto';
import PaymentMethodReqDto from '../dto/req/PaymentMethodReqDto';
import connPool from '../config/DbConfig';
import PaymentMethodDao from '../dao/PaymentMethodDao';
import CommonCudType from '../types/CommonCudType';

export default class PaymentMethodService {

	static async getAll(): Promise<CommonGetListType<PaymentMethodResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<PaymentMethodResDto>;

		try {
			conn.beginTransaction();
			let paymentMethodDao = new PaymentMethodDao(conn);
			const rows: PaymentMethodResDto[] = await paymentMethodDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<PaymentMethodResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<PaymentMethodResDto | null>;

		try {
			conn.beginTransaction();
			let paymentMethodDao = new PaymentMethodDao(conn);
			const rows: PaymentMethodResDto | null = await paymentMethodDao.getOne(id);
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

	static async getLdtos(name: string | null): Promise<CommonGetListType<PaymentMethodResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<PaymentMethodResDto>;
		try {
			conn.beginTransaction();
			let paymentMethodDao = new PaymentMethodDao(conn);
			const rows: PaymentMethodResDto[] = await paymentMethodDao.getLdtos(name);
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

	static async create(body: PaymentMethodReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();
			let paymentMethodDao = new PaymentMethodDao(conn);

            const data = await paymentMethodDao.findByName(body.name);

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

			await paymentMethodDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New payment method created."
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

	static async updateOne(id: string, body: PaymentMethodReqDto) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let paymentMethodDao = new PaymentMethodDao(conn);

			const commonGetOneResDto = await paymentMethodDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Payment method not found.",
						details: "Can not find payment method for given ID"
					}
				};
			}

			const nameRes = await paymentMethodDao.findByName(body.name);	
			if(nameRes?.name === body.name && nameRes?.id.toString() !== id){

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

			await paymentMethodDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Payment method Updated."
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
			let paymentMethodDao = new PaymentMethodDao(conn);

			const commonGetOneResDto = await paymentMethodDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Payment method not found.",
						details: "Can not find payment method for given ID"
					}
				};
			}

			await paymentMethodDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Payment method Deleted."
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