import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import StateResDto from '../dto/res/StateResDto';
import StateReqDto from '../dto/req/StateReqDto';
import connPool from '../config/DbConfig';
import StateDao from '../dao/StateDao';
import CommonCudType from '../types/CommonCudType';

export default class StateService {

	static async getAll(): Promise<CommonGetListType<StateResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<StateResDto>;

		try {
			conn.beginTransaction();
			let stateDao = new StateDao(conn);
			const rows: StateResDto[] = await stateDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<StateResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<StateResDto | null>;

		try {
			conn.beginTransaction();
			let stateDao = new StateDao(conn);
			const rows: StateResDto | null = await stateDao.getOne(id);
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

	static async getLdtos(
		name: string | null,
		codeName: string | null,
		codeNo: number | null
	): Promise<CommonGetListType<StateResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<StateResDto>;
		try {
			conn.beginTransaction();
			let stateDao = new StateDao(conn);
			const rows: StateResDto[] = await stateDao.getLdtos(name, codeName, codeNo);
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

	static async create(body: StateReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try {
			conn.beginTransaction();
			let stateDao = new StateDao(conn);

			const data = await stateDao.findByNameCodeNameCodeNo(body.name, body.code_name, body.code_no.toString());

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

			if (data?.code_no === body.code_no) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "code_no_already_exists",
						message: "Can not create duplicate entry with same code_no.",
						details: "Can not create duplicate entry with same code_no."
					}
				};
			}

			if (data?.code_name === body.code_name) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "code_name_already_exists",
						message: "Can not create duplicate entry with same code_name.",
						details: "Can not create duplicate entry with same code_name."
					}
				};
			}

			await stateDao.create(body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New state created."
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

	static async updateOne(id: string, body: StateReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try {
			conn.beginTransaction();
			let stateDao = new StateDao(conn);

			const commonGetOneResDto = await stateDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "State not found.",
						details: "Can not find state for given ID"
					}
				};
			}

			const nameRes = await stateDao.findByNameCodeNameCodeNo(body.name, body.code_name, body.code_no.toString());
			if (nameRes?.name === body.name && nameRes?.id.toString() !== id) {

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

			if (nameRes?.code_no === body.code_no && nameRes?.id.toString() !== id) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "code_no_already_exists",
						message: "Can not create duplicate entry with same code_no.",
						details: "Can not create duplicate entry with same code_no."
					}
				};
			}

			if (nameRes?.code_name === body.code_name && nameRes?.id.toString() !== id) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "code_name_already_exists",
						message: "Can not create duplicate entry with same code_name.",
						details: "Can not create duplicate entry with same code_name."
					}
				};
			}

			await stateDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "State Updated."
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
			let stateDao = new StateDao(conn);

			const commonGetOneResDto = await stateDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "State not found.",
						details: "Can not find state for given ID"
					}
				};
			}

			await stateDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "State Deleted."
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
}