import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import AccessRoleResDto from '../dto/res/AccessRoleResDto';
import AccessRoleReqDto from '../dto/req/AccessRoleReqDto';
import connPool from '../config/DbConfig';
import AccessRoleDao from '../dao/AccessRoleDao';
import CommonCudType from '../types/CommonCudType';

export default class AccessRoleService {

	static async getAll(): Promise<CommonGetListType<AccessRoleResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<AccessRoleResDto>;

		try {
			conn.beginTransaction();
			let accessRoleDao = new AccessRoleDao(conn);
			const rows: AccessRoleResDto[] = await accessRoleDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<AccessRoleResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<AccessRoleResDto | null>;

		try {
			conn.beginTransaction();
			let accessRoleDao = new AccessRoleDao(conn);
			const rows: AccessRoleResDto | null = await accessRoleDao.getOne(id);
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

	static async create(body: AccessRoleReqDto): Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try{
			conn.beginTransaction();
			let accessRoleDao = new AccessRoleDao(conn);

            const data = await accessRoleDao.findByName(body.name);

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

			await accessRoleDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New access role created."
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

	static async updateOne(id: string, body: AccessRoleReqDto) :  Promise<CommonCudType>{
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try{
			conn.beginTransaction();
			let accessRoleDao = new AccessRoleDao(conn);

			const commonGetOneResDto = await accessRoleDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Access role not found.",
						details: "Can not find access role for given ID"
					}
				};
			}

			const nameRes = await accessRoleDao.findByName(body.name);	
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

			await accessRoleDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Access role Updated."
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
			let accessRoleDao = new AccessRoleDao(conn);

			const commonGetOneResDto = await accessRoleDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Access role not found.",
						details: "Can not find access role for given ID"
					}
				};
			}

			await accessRoleDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Access role Deleted."
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