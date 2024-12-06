import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import CompetitorResDto from '../dto/res/CompetitorResDto';
import CompetitorReqDto from '../dto/req/CompetitorReqDto';
import connPool from '../config/DbConfig';
import CompetitorDao from '../dao/CompetitorDao';
import CommonCudType from '../types/CommonCudType';

export default class CompetitorService {

	static async getAll(): Promise<CommonGetListType<CompetitorResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<CompetitorResDto>;

		try {
			conn.beginTransaction();
			let competitorDao = new CompetitorDao(conn);
			const rows: CompetitorResDto[] = await competitorDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<CompetitorResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<CompetitorResDto | null>;

		try {
			conn.beginTransaction();
			let competitorDao = new CompetitorDao(conn);
			const rows: CompetitorResDto | null = await competitorDao.getOne(id);
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

	static async getLdtos(name: string | null): Promise<CommonGetListType<CompetitorResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<CompetitorResDto>;
		try {
			conn.beginTransaction();
			let competitorDao = new CompetitorDao(conn);
			const rows: CompetitorResDto[] = await competitorDao.getLdtos(name);
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

	static async create(body: CompetitorReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();
			let competitorDao = new CompetitorDao(conn);

            const data = await competitorDao.findByName(body.name);

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

			await competitorDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New competitor created."
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

	static async updateOne(id: string, body: CompetitorReqDto) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let competitorDao = new CompetitorDao(conn);

			const commonGetOneResDto = await competitorDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Competitor not found.",
						details: "Can not find competitor for given ID"
					}
				};
			}

			const nameRes = await competitorDao.findByName(body.name);	
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

			await competitorDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Competitor Updated."
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
			let competitorDao = new CompetitorDao(conn);

			const commonGetOneResDto = await competitorDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Competitor not found.",
						details: "Can not find competitor for given ID"
					}
				};
			}

			await competitorDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Competitor Deleted."
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