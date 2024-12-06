import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import BusinessInfoOtherResDto from '../dto/res/BusinessInfoOtherResDto';
import BusinessInfoOtherReqDto from '../dto/req/BusinessInfoOtherReqDto';
import connPool from '../config/DbConfig';
import BusinessInfoOtherDao from '../dao/BusinessInfoOtherDao';
import CommonCudType from '../types/CommonCudType';

export default class BusinessInfoOtherService {

	static async getAll(): Promise<CommonGetListType<BusinessInfoOtherResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<BusinessInfoOtherResDto>;

		try {
			conn.beginTransaction();
			let businessInfoOtherDao = new BusinessInfoOtherDao(conn);
			const rows: BusinessInfoOtherResDto[] = await businessInfoOtherDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<BusinessInfoOtherResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<BusinessInfoOtherResDto | null>;

		try {
			conn.beginTransaction();
			let businessInfoOtherDao = new BusinessInfoOtherDao(conn);
			const rows: BusinessInfoOtherResDto | null = await businessInfoOtherDao.getOne(id);
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

	static async getLdtos(name: string | null): Promise<CommonGetListType<BusinessInfoOtherResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<BusinessInfoOtherResDto>;
		try {
			conn.beginTransaction();
			let businessinfootherDao = new BusinessInfoOtherDao(conn);
			const rows: BusinessInfoOtherResDto[] = await businessinfootherDao.getLdtos(name);
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

	static async create(body: BusinessInfoOtherReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();
			let businessInfoOtherDao = new BusinessInfoOtherDao(conn);

            const data = await businessInfoOtherDao.findByNumber(body.no.toString());
			if (data?.no === body.no) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "number_already_exists",
						message: "Can not create duplicate entry with same Number (no).",
						details: "Can not create duplicate entry with same Number (no)."
					}
				};
			}

			await businessInfoOtherDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New business information other created."
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

	static async updateOne(id: string, body: BusinessInfoOtherReqDto) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let businessInfoOtherDao = new BusinessInfoOtherDao(conn);

			const commonGetOneResDto = await businessInfoOtherDao.getOne(id);
			if (commonGetOneResDto === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Business Information Other not found.",
						details: "Can not find business information other for given ID"
					}
				};
			}

			const numberRes = await businessInfoOtherDao.findByNumber(body.no.toString());	
			if(numberRes?.no === body.no && numberRes?.id.toString() !== id){
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "number_already_exists",
						message: "Can not create duplicate entry with same Number (no).",
						details: "Can not create duplicate entry with same Number (no)."
					}
				};
			}

			await businessInfoOtherDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Business Information Other Updated."
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
			let businessInfoOtherDao = new BusinessInfoOtherDao(conn);

			const commonGetOneResDto = await businessInfoOtherDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Business Information Other not found.",
						details: "Can not find business information other for given ID"
					}
				};
			}

			await businessInfoOtherDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Business Information Other Deleted."
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