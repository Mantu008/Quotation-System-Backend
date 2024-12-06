import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import TargetResDto from '../dto/res/TargetResDto';
import TargetReqDto from '../dto/req/TargetReqDto';
import connPool from '../config/DbConfig';
import TargetDao from '../dao/TargetDao';
import CommonCudType from '../types/CommonCudType';
import UserDao from '../dao/UserDao';

export default class TargetService {

	static async getAll(): Promise<CommonGetListType<TargetResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<TargetResDto>;

		try {
			conn.beginTransaction();
			let targetDao = new TargetDao(conn);
			const rows: TargetResDto[] = await targetDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<TargetResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<TargetResDto | null>;

		try {
			conn.beginTransaction();
			let targetDao = new TargetDao(conn);
			const rows: TargetResDto | null = await targetDao.getOne(id);
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

	static async create(body: TargetReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try {
			conn.beginTransaction();
			let targetDao = new TargetDao(conn);

			let userDao = new UserDao(conn);
			const userData = await userDao.getOne(body.user_id.toString());
			if (userData === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "User not found.",
						details: "Can not find user for given ID in User Id field."
					}
				};
			}

			const createdByUserData = await userDao.getOne(body.created_by_user_id.toString());
			if (createdByUserData === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "User not found.",
						details: "Can not find user for given ID in Created By User Id field."
					}
				};
			}

			await targetDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New target created."
			};
		} catch (e) {
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
		} finally {
			conn.release();
		}
		return res;
	}

	static async updateOne(id: string, body: TargetReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try {
			conn.beginTransaction();
			let targetDao = new TargetDao(conn);

			const commonGetOneResDto = await targetDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Target not found.",
						details: "Can not find target for given ID"
					}
				};
			}

			await targetDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Target Updated."
			};
		} catch (e) {
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
		} finally {
			conn.release();
		}
		return res;
	}

	static async deleteOne(id: string): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try {
			conn.beginTransaction();
			let targetDao = new TargetDao(conn);

			const commonGetOneResDto = await targetDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Target not found.",
						details: "Can not find target for given ID"
					}
				};
			}

			await targetDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Target Deleted."
			};
		} catch (e) {
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
		} finally {
			conn.release();
		}
		return res;
	}

	static async getLdtos(userId: number | null, createdByUserId: number | null): Promise<CommonGetListType<TargetResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<TargetResDto>;
		try {
			conn.beginTransaction();
			let targetDao = new TargetDao(conn);
			const rows: TargetResDto[] = await targetDao.getLdtos(userId, createdByUserId);
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

	static async findByUserIdOrCreatedByUserId(user_id: string, created_by_user_id: string): Promise<CommonGetListType<TargetResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<TargetResDto>;

		try {
			conn.beginTransaction();
			let targetDao = new TargetDao(conn);
			const rows: TargetResDto[] = await targetDao.findByUserIdOrCreatedByUserId(user_id, created_by_user_id);
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

	static async findByUserIdAndCreatedByUserId(user_id: string, created_by_user_id: string): Promise<CommonGetListType<TargetResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<TargetResDto>;

		try {
			conn.beginTransaction();
			let targetDao = new TargetDao(conn);
			const rows: TargetResDto[] = await targetDao.findByUserIdAndCreatedByUserId(user_id, created_by_user_id);
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

}