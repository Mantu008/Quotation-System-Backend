import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import UserResDto from '../dto/res/UserResDto';
import connPool from '../config/DbConfig';
import UserDao from '../dao/UserDao';
import UserReqDto from '../dto/req/UserReqDto';
import CommonCudType from '../types/CommonCudType';
import AccessRoleDao from '../dao/AccessRoleDao';

export default class UserService {

	static async getAll(): Promise<CommonGetListType<UserResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<UserResDto>;

		try {
			conn.beginTransaction();
			let userDao = new UserDao(conn);
			const rows: UserResDto[] = await userDao.getAll();
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

	static async getOne(username: string): Promise<CommonGetOneType<UserResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<UserResDto | null>;

		try {
			conn.beginTransaction();
			let userDao = new UserDao(conn);
			const rows: UserResDto | null = await userDao.getOne(username);
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

	static async create(body: UserReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try {
			conn.beginTransaction();
			let userDao = new UserDao(conn);

			const data = await userDao.findByName(body.name);
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

			const usernameData = await userDao.findByUserName(body.username);

			if (usernameData?.username === body.username) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "username_already_exists",
						message: "Can not create duplicate entry with same Username.",
						details: "Can not create duplicate entry with same Username."
					}
				};
			}

			let accessRoleDao = new AccessRoleDao(conn);

			const commonGetOneResDto = await accessRoleDao.getOne(body.access_role_id.toString());
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

			await userDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New user created."
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

	static async updateOne(id: string, body: UserReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try {
			conn.beginTransaction();
			let userDao = new UserDao(conn);

			const commonGetOneResDto = await userDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "User not found.",
						details: "Can not find user for given ID"
					}
				};
			}

			const data = await userDao.findByName(body.name);
			if (data?.name === body.name && data?.id.toString() !== id) {
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

			const usernameData = await userDao.findByUserName(body.username);
			if (usernameData?.username === body.username && usernameData?.id.toString() !== id) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "username_already_exists",
						message: "Can not create duplicate entry with same Username.",
						details: "Can not create duplicate entry with same Username."
					}
				};
			}

			let accessRoleDao = new AccessRoleDao(conn);
			const accessRoleRes = await accessRoleDao.getOne(body.access_role_id.toString());
			if (accessRoleRes === null) {
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

			await userDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "User Updated."
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
			let userDao = new UserDao(conn);

			const commonGetOneResDto = await userDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "User not found.",
						details: "Can not find user for given ID"
					}
				};
			}

			await userDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "User Deleted."
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

	static async findByUsername(username: string): Promise<CommonGetOneType<UserResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<UserResDto | null>;

		try {
			conn.beginTransaction();
			let userDao = new UserDao(conn);
			const rows: UserResDto | null = await userDao.findByUserName(username);
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
}