import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import InquirySourceResDto from '../dto/res/InquirySourceResDto';
import InquirySourceReqDto from '../dto/req/InquirySourceReqDto';
import connPool from '../config/DbConfig';
import InquirySourceDao from '../dao/InquirySourceDao';
import CommonCudType from '../types/CommonCudType';

export default class InquirySourceService {

	static async getAll(): Promise<CommonGetListType<InquirySourceResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<InquirySourceResDto>;

		try {
			conn.beginTransaction();
			let inquirySourceDao = new InquirySourceDao(conn);
			const rows: InquirySourceResDto[] = await inquirySourceDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<InquirySourceResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<InquirySourceResDto | null>;

		try {
			conn.beginTransaction();
			let inquirySourceDao = new InquirySourceDao(conn);
			const rows: InquirySourceResDto | null = await inquirySourceDao.getOne(id);
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

	static async getLdtos(name: string | null): Promise<CommonGetListType<InquirySourceResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<InquirySourceResDto>;
		try {
			conn.beginTransaction();
			let industryDao = new InquirySourceDao(conn);
			const rows: InquirySourceResDto[] = await industryDao.getLdtos(name);
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

	static async create(body: InquirySourceReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();
			let inquirySourceDao = new InquirySourceDao(conn);

            const data = await inquirySourceDao.findByName(body.name);

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

			await inquirySourceDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New inquiry source created."
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

	static async updateOne(id: string, body: InquirySourceReqDto) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let inquirySourceDao = new InquirySourceDao(conn);

			const commonGetOneResDto = await inquirySourceDao.getOne(id);
			if (commonGetOneResDto === null) {

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

			const nameRes = await inquirySourceDao.findByName(body.name);	
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

			await inquirySourceDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Inquiry Source Updated."
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
			let inquirySourceDao = new InquirySourceDao(conn);

			const commonGetOneResDto = await inquirySourceDao.getOne(id);
			if (commonGetOneResDto === null) {
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

			await inquirySourceDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Inquiry Source Deleted."
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