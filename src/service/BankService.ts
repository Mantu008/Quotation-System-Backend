import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import BankResDto from '../dto/res/BankResDto';
import BankReqDto from '../dto/req/BankReqDto';
import connPool from '../config/DbConfig';
import BankDao from '../dao/BankDao';
import CommonCudType from '../types/CommonCudType';

export default class BankService {

	static async getAll(): Promise<CommonGetListType<BankResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<BankResDto>;

		try {
			conn.beginTransaction();
			let bankDao = new BankDao(conn);
			const rows: BankResDto[] = await bankDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<BankResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<BankResDto | null>;

		try {
			conn.beginTransaction();
			let bankDao = new BankDao(conn);
			const rows: BankResDto | null = await bankDao.getOne(id);
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

	static async getLdtos(name: string | null): Promise<CommonGetListType<BankResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<BankResDto>;
		try {
			conn.beginTransaction();
			let bankDao = new BankDao(conn);
			const rows: BankResDto[] = await bankDao.getLdtos(name);
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

	static async create(body: BankReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();
			let bankDao = new BankDao(conn);

            const data = await bankDao.findByName(body.name);
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

			await bankDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New bank created."
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

	static async updateOne(id: string, body: BankReqDto) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let bankDao = new BankDao(conn);

			const commonGetOneResDto = await bankDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Bank not found.",
						details: "Can not find bank for given ID"
					}
				};
			}

			const nameRes = await bankDao.findByName(body.name);	
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

			await bankDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Bank Updated."
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
			let bankDao = new BankDao(conn);

			const commonGetOneResDto = await bankDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Bank not found.",
						details: "Can not find bank for given ID"
					}
				};
			}

			await bankDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Bank Deleted."
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