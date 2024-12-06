import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import CurrencyResDto from '../dto/res/CurrencyResDto';
import CurrencyReqDto from '../dto/req/CurrencyReqDto';
import connPool from '../config/DbConfig';
import CurrencyDao from '../dao/CurrencyDao';
import CommonCudType from '../types/CommonCudType';

export default class CurrrencyService {

	static async getAll(): Promise<CommonGetListType<CurrencyResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<CurrencyResDto>;

		try {
			conn.beginTransaction();
			let currencyDao = new CurrencyDao(conn);
			const rows: CurrencyResDto[] = await currencyDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<CurrencyResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<CurrencyResDto | null>;

		try {
			conn.beginTransaction();
			let currencyDao = new CurrencyDao(conn);
			const rows: CurrencyResDto | null = await currencyDao.getOne(id);
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

	static async getLdtos(name: string | null): Promise<CommonGetListType<CurrencyResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<CurrencyResDto>;
		try {
			conn.beginTransaction();
			let industryDao = new CurrencyDao(conn);
			const rows: CurrencyResDto[] = await industryDao.getLdtos(name);
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

	static async create(body: CurrencyReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();
			let currencyDao = new CurrencyDao(conn);
			await currencyDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New currrency created."
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

	static async updateOne(id: string, body: CurrencyReqDto) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let currencyDao = new CurrencyDao(conn);
			const commonGetOneResDto = await currencyDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Currrency not found.",
						details: "Can not find currrency for given ID"
					}
				};
			}
			await currencyDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Currrency Updated."
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
			let currencyDao = new CurrencyDao(conn);

			const commonGetOneResDto = await currencyDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Currrency not found.",
						details: "Can not find currrency for given ID"
					}
				};
			}

			await currencyDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Currrency Deleted."
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