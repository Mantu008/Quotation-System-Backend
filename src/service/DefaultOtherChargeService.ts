import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import DefaultOtherChargeResDto from '../dto/res/DefaultOtherChargeResDto';
import DefaultOtherChargeReqDto from '../dto/req/DefaultOtherChargeReqDto';
import connPool from '../config/DbConfig';
import DefaultOtherChargeDao from '../dao/DefaultOtherChargeDao';
import CommonCudType from '../types/CommonCudType';

export default class DefaultOtherChargeService {

	static async getAll(): Promise<CommonGetListType<DefaultOtherChargeResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<DefaultOtherChargeResDto>;

		try {
			conn.beginTransaction();
			let defaultOtherChargeDao = new DefaultOtherChargeDao(conn);
			const rows: DefaultOtherChargeResDto[] = await defaultOtherChargeDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<DefaultOtherChargeResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<DefaultOtherChargeResDto | null>;

		try {
			conn.beginTransaction();
			let defaultOtherChargeDao = new DefaultOtherChargeDao(conn);
			const rows: DefaultOtherChargeResDto | null = await defaultOtherChargeDao.getOne(id);
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

	static async getLdtos(name: string | null): Promise<CommonGetListType<DefaultOtherChargeResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<DefaultOtherChargeResDto>;
		try {
			conn.beginTransaction();
			let industryDao = new DefaultOtherChargeDao(conn);
			const rows: DefaultOtherChargeResDto[] = await industryDao.getLdtos(name);
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

	static async create(body: DefaultOtherChargeReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();
			let defaultOtherChargeDao = new DefaultOtherChargeDao(conn);

            const data = await defaultOtherChargeDao.findByName(body.name);

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

			await defaultOtherChargeDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New default other charge created."
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

	static async updateOne(id: string, body: DefaultOtherChargeReqDto) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let defaultOtherChargeDao = new DefaultOtherChargeDao(conn);

			const commonGetOneResDto = await defaultOtherChargeDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Default Other Charge not found.",
						details: "Can not find default other charge for given ID"
					}
				};
			}

			const nameRes = await defaultOtherChargeDao.findByName(body.name);	
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

			await defaultOtherChargeDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Default Other Charge Updated."
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
			let defaultOtherChargeDao = new DefaultOtherChargeDao(conn);

			const commonGetOneResDto = await defaultOtherChargeDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Default Other Charge not found.",
						details: "Can not find default other charge for given ID"
					}
				};
			}

			await defaultOtherChargeDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Default Other Charge Deleted."
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