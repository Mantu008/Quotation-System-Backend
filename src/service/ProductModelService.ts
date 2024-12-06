import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import ProductModelResDto from '../dto/res/ProductModelResDto';
import ProductModelReqDto from '../dto/req/ProductModelReqDto';
import connPool from '../config/DbConfig';
import ProductModelDao from '../dao/ProductModelDao';
import CommonCudType from '../types/CommonCudType';
import CategoryDao from '../dao/CategoryDao';
import ProductModelSpecDao from '../dao/ProductModelSpecDao';
import ProductModelSpecReqDto from '../dto/req/ProductModelSpecReqDto';
import ProductModelSpecValDao from '../dao/ProductModelSpecValDao';
import ProductModelSpecValReqDto from '../dto/req/ProductModelSpecValReqDto';

export default class ProductModelService {

	static async getAll(): Promise<CommonGetListType<ProductModelResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<ProductModelResDto>;

		try {
			conn.beginTransaction();
			let productModelDao = new ProductModelDao(conn);
			const rows: ProductModelResDto[] = await productModelDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<ProductModelResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<ProductModelResDto | null>;

		try {
			conn.beginTransaction();
			let productModelDao = new ProductModelDao(conn);
			const rows: ProductModelResDto | null = await productModelDao.getOne(id);
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

	static async getLdtos(categoryId: number | null, name: string | null): Promise<CommonGetListType<ProductModelResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<ProductModelResDto>;
		try {
			conn.beginTransaction();
			let productModelDao = new ProductModelDao(conn);
			const rows: ProductModelResDto[] = await productModelDao.getLdtos(categoryId, name);
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

	static async create(body: ProductModelReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try {
			conn.beginTransaction();
			let productModelDao = new ProductModelDao(conn);

			const data = await productModelDao.findByName(body.name);

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

			let categoryDao = new CategoryDao(conn);
			const categoryData = categoryDao.getOne(body.category_id.toString());
			if (categoryData === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Category not found.",
						details: "Can not find Category for given ID"
					}
				};
			}

			const productModelCreateRes = await productModelDao.create(body);

			// {
			//   "category_id": 0,
			//   "name": "string",
			//   "prefix": "string",
			//   "postfix": "string",
			//   "hsn_code": "string",
			//   "rate": 0,
			//   "specs": [
			//     {
			//       "name": "string",
			//       "values": [
			//         {
			//           "spec_val": "string",
			//           "spec_val_code": "string"
			//         }
			//       ]
			//     }
			//   ]
			// }

			if (body.specs !== null && body.specs !== undefined && body.specs.length !== 0) {
				if (productModelCreateRes.insertId !== null) {
					try {
						let productModelSpecDao = new ProductModelSpecDao(conn);

						let productModelSpecReqDto: ProductModelSpecReqDto = {
							prod_mo_no_id: productModelCreateRes.insertId,
							spec_name: "",
						};

						for (const data of body.specs) {
							if (data.name === undefined || data.name === null || data.name.length === 0) {
								return {
									isSuccess: false,
									hasException: false,
									errorResDto: {
										timestamp: new Date(),
										code: "bad_request",
										message: "Please enter specification name.",
										details: "Can not leave specification name blank."
									}
								};
							}
							if (data.values === undefined || data.values === null || data.values.length === 0) {
								return {
									isSuccess: false,
									hasException: false,
									errorResDto: {
										timestamp: new Date(),
										code: "bad_request",
										message: "Please enter specification value for specification name: " + data.name,
										details: "Can not leave specification value blank."
									}
								};
							}
							productModelSpecReqDto.spec_name = data.name;

							const isDuplicate = await productModelSpecDao.findByProdIdAndSpecName(productModelSpecReqDto.prod_mo_no_id?.toString(), productModelSpecReqDto.spec_name);

							let productModelSpecCreateRes;

							if (isDuplicate === null) {
								productModelSpecCreateRes = await productModelSpecDao.create(productModelSpecReqDto);
							}

							if(productModelSpecCreateRes.insertId){
								let productModelSpecValDao = new ProductModelSpecValDao(conn);

								let productModelSpecValReqDto: ProductModelSpecValReqDto = {
									prod_mo_no_prod_spec_id: productModelSpecCreateRes?.insertId,
									spec_value: "",
									spec_code: ""
								};

								for(const valData of data.values){
									if (valData.spec_val === undefined || valData.spec_val === null || valData.spec_val.length === 0) {
										return {
											isSuccess: false,
											hasException: false,
											errorResDto: {
												timestamp: new Date(),
												code: "bad_request",
												message: "Please enter specification spec_val.",
												details: "Can not leave specification spec_val blank."
											}
										};
									}
									if (valData.spec_val_code === undefined || valData.spec_val_code === null || valData.spec_val_code.length === 0) {
										return {
											isSuccess: false,
											hasException: false,
											errorResDto: {
												timestamp: new Date(),
												code: "bad_request",
												message: "Please enter specification value code for specification value: " + valData.spec_val,
												details: "Can not leave specification value code blank."
											}
										};
									}
									productModelSpecValReqDto.spec_value = valData.spec_val;
									productModelSpecValReqDto.spec_code = valData.spec_val_code;

									const isDuplicate = await productModelSpecValDao.findByProdIdAndSpecValue(productModelSpecValReqDto.prod_mo_no_prod_spec_id?.toString(), productModelSpecValReqDto.spec_value);

									if (isDuplicate === null) {
										await productModelSpecValDao.create(productModelSpecValReqDto);
									}
								}
							}
							else{
								return {
									isSuccess: false,
									hasException: false,
									errorResDto: {
										timestamp: new Date(),
										code: "internal_server_error",
										message: "Can not find id of newly created product model spec while creating new entry for product model spec val.",
										details: "Can not find id of newly created product model spec while creating new entry for product model spec val."
									}
								};
							}

						}
					} catch (error) {
						console.log(error);
						return {
							isSuccess: false,
							hasException: true,
							errorResDto: {
								timestamp: new Date(),
								code: "internal_server_error",
								message: "Internal server error occured while creating product spec.",
								details: "Internal server error occured while creating product spec."
							}
						};
					}
				}
			}


			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New product model created."
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

	static async updateOne(id: string, body: ProductModelReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try {
			conn.beginTransaction();
			let productModelDao = new ProductModelDao(conn);

			const commonGetOneResDto = await productModelDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Product model not found.",
						details: "Can not find product model for given ID"
					}
				};
			}

			const nameRes = await productModelDao.findByName(body.name);
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

			let categoryDao = new CategoryDao(conn);
			const categoryData = categoryDao.getOne(body.category_id.toString());
			if (categoryData === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Category not found.",
						details: "Can not find Category for given ID"
					}
				};
			}

			await productModelDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Product model Updated."
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
			let productModelDao = new ProductModelDao(conn);

			const commonGetOneResDto = await productModelDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Product model not found.",
						details: "Can not find product model for given ID"
					}
				};
			}

			await productModelDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Product model Deleted."
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