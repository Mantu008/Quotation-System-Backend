import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import CategoryResDto from '../dto/res/CategoryResDto';
import connPool from '../config/DbConfig';
import CategoryDao from '../dao/CategoryDao';
import CategoryReqDto from '../dto/req/CategoryReqDto';
import CommonCudType from '../types/CommonCudType';

export default class CategoryService {

	static async getAll(): Promise<CommonGetListType<CategoryResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<CategoryResDto>;

		try {
			conn.beginTransaction();
			let categoryDao = new CategoryDao(conn);
			const rows: CategoryResDto[] = await categoryDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<CategoryResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<CategoryResDto | null>;

		try {
			conn.beginTransaction();
			let categoryDao = new CategoryDao(conn);
			const rows: CategoryResDto | null = await categoryDao.getOne(id);
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

	static async getLdtos(name: string | null): Promise<CommonGetListType<CategoryResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<CategoryResDto>;
		try {
			conn.beginTransaction();
			let categoryDao = new CategoryDao(conn);
			const rows: CategoryResDto[] = await categoryDao.getLdtos(name);
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

	static async create(body: CategoryReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();
			let categoryDao = new CategoryDao(conn);

			const data = await categoryDao.findByName(body.name);

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


			await categoryDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New category created."
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

	static async updateOne(id: string, name: string) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let categoryDao = new CategoryDao(conn);

			const commonGetOneResDto = await categoryDao.getOne(id);
			if(commonGetOneResDto === null){
				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Category not found.",
						details: "Can not find category for given ID"
					}
				};
			}

			const nameRes = await categoryDao.findByName(name);	
			if(nameRes?.name === name && nameRes?.id.toString() !== id){

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

			await categoryDao.updateOne(id, name);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Category Updated."
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
			let categoryDao = new CategoryDao(conn);

			const commonGetOneResDto = await categoryDao.getOne(id);
			if(commonGetOneResDto === null){
				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Category not found.",
						details: "Can not find category for given ID"
					}
				};
			}

			await categoryDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Category Deleted."
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
