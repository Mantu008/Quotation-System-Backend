import CommonGetListType from '../types/CommonGetListType';
import CommonGetOneType from '../types/CommonGetOneType';
import ProductResDto from '../dto/res/ProductResDto';
import connPool from '../config/DbConfig';
import ProductDao from '../dao/ProductDao';
import ProductReqDto from '../dto/req/ProductReqDto';
import CommonCudType from '../types/CommonCudType';
import CategoryDao from '../dao/CategoryDao';
import GstRateDao from '../dao/GstRateDao';
import ProductSpecDao from '../dao/ProductSpecDao';
import ProductSpecReqDto from '../dto/req/ProductSpecReqDto';
import ProductMetaReqDto from '../dto/req/ProductMetaReqDto';
import ProductMetaDao from '../dao/ProductMetaDao';
import ProductMetaItemDao from '../dao/ProductMetaItemDao';
import ProductMetaItemReqDto from '../dto/req/ProductMetaItemReqDto';

export default class ProductSer {

	static async getAll(): Promise<CommonGetListType<ProductResDto>> {

		let conn = await connPool.getConnection();
		let res: CommonGetListType<ProductResDto>;

		try {
			conn.beginTransaction();
			let productDao = new ProductDao(conn);
			const rows: ProductResDto[] = await productDao.getAll();
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

	static async getOne(id: string): Promise<CommonGetOneType<ProductResDto | null>> {

		let conn = await connPool.getConnection();
		let res: CommonGetOneType<ProductResDto | null>;

		try {
			conn.beginTransaction();
			let productDao = new ProductDao(conn);
			const rows: ProductResDto | null = await productDao.getOne(id);
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

	static async getLdtos(categoryId: number | null, name: string | null, modelNo: string | null): Promise<CommonGetListType<ProductResDto>> {
		let conn = await connPool.getConnection();
		let res: CommonGetListType<ProductResDto>;
		try {
			conn.beginTransaction();
			let productDao = new ProductDao(conn);
			const rows: ProductResDto[] = await productDao.getLdtos(categoryId, name, modelNo);
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

	static async create(body: ProductReqDto): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try {
			conn.beginTransaction();
			let productDao = new ProductDao(conn);

			const modelData = await productDao.findByModelNo(body.model_no);

			if (modelData?.model_no === body.model_no) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "bad_request",
						message: "Please enter new Model Number.",
						details: "Can not create duplicate entry with same Model Number."
					}
				};
			}

			let categoryDao = new CategoryDao(conn);
			const categoryRes = await categoryDao.getOne(body.category_id.toString());
			if (categoryRes === null) {
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

			let gstRateDao = new GstRateDao(conn);
			const gstRateRes = await gstRateDao.getOne(body.gst_rate_id.toString());
			if (gstRateRes === null) {
				conn.commit();
				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Gst Rate not found.",
						details: "Can not find Gst Rate for given ID"
					}
				};
			}

			// {
			// 	"category_id": 79,
			// 	"name": "string",
			// 	"model_no": "string",
			// 	"hsn_code": "string",
			// 	"rate": 0.00,
			// 	"gst_rate_id": 1,
			// 	"specs": [
			// 		{
			// 			"spec_name": "",
			// 			"spec_value": ""
			// 		},
			// 		{
			// 			"spec_name": "",
			// 			"spec_value": ""
			// 		}
			// 	],
			// 	"meta": [
			// 		{
			// 			"heading": "",
			// 			"info": [
			// 				{
			// 					"name": "",
			// 					"value": ""
			// 				},
			// 				{
			// 					"name": "",
			// 					"value": ""
			// 				}
			// 			]
			// 		}
			// 	]
			// }

			const productCreateRes = await productDao.create(body);

			if (body.specs !== null && body.specs !== undefined && body.specs?.length !== 0) {
				if (productCreateRes.insertId !== null) {
					try {
						let productSpecDao = new ProductSpecDao(conn);

						let productSpecReqDto: ProductSpecReqDto = {
							prod_id: productCreateRes.insertId,
							spec_name: "",
							spec_val: ""
						};

						for (const data of body.specs) {
							if(data.spec_name === undefined || data.spec_name === null || data.spec_name.length === 0){
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
							if(data.spec_value === undefined || data.spec_value === null || data.spec_value.length === 0){
								return {
									isSuccess: false,
									hasException: false,
									errorResDto: {
										timestamp: new Date(),
										code: "bad_request",
										message: "Please enter specification value. for spec_name: " + data.spec_name,
										details: "Can not leave specification value blank."
									}
								};
							}
							productSpecReqDto.spec_name = data.spec_name;
							productSpecReqDto.spec_val = data.spec_value;

							const isDuplicate = await productSpecDao.findByProdIdAndSpecName(productSpecReqDto.prod_id, productSpecReqDto.spec_name);

							if (isDuplicate === null) {
								await productSpecDao.create(productSpecReqDto);
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

			if (body.meta !== null && body.meta !== undefined && body.meta?.length !== 0) {
				if (productCreateRes.insertId !== null) {
					try {
						let productMetaDao = new ProductMetaDao(conn);
						let productMetaItemDao = new ProductMetaItemDao(conn);

						let productMetaReqDto: ProductMetaReqDto = {
							prod_id: productCreateRes.insertId,
							heading: ""
						};

						let productMetaItemReqDto: ProductMetaItemReqDto = {
							prod_meta_id: 0,
							name: "",
							value: ""
						};

						try {
							for (const data of body.meta) {
								productMetaReqDto.heading = data.heading;
								const prodMetaCreateRes = await productMetaDao.create(productMetaReqDto);

								productMetaItemReqDto.prod_meta_id = prodMetaCreateRes.insertId;

								for (const infoData of data.info) {
									productMetaItemReqDto.name = infoData.name;
									productMetaItemReqDto.value = infoData.value;

									await productMetaItemDao.create(productMetaItemReqDto);
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
								message: "Internal server error occured while creating product meta item.",
								details: "Internal server error occured while creating product meta item."
							}
						};
						}

					} catch (error) {
						console.log(error);
						return {
							isSuccess: false,
							hasException: true,
							errorResDto: {
								timestamp: new Date(),
								code: "internal_server_error",
								message: "Internal server error occured while creating product meta.",
								details: "Internal server error occured while creating product meta."
							}
						};
					}
				}
			}

			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "New product created."
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

	static async updateOne(id: string, body: ProductReqDto): Promise<CommonCudType> {

		let conn = await connPool.getConnection();
		let res: CommonCudType;

		try {
			conn.beginTransaction();
			let productDao = new ProductDao(conn);

			const commonGetOneResDto = await productDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Product not found.",
						details: "Can not find Product for given ID"
					}
				};
			}

			const modelRes = await productDao.findByModelNo(body.model_no);
			if (modelRes?.model_no === body.model_no && modelRes?.id.toString() !== id) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "model_no_already_exists",
						message: "Can not create duplicate entry with same model number.",
						details: "Can not create duplicate entry with same model number."
					}
				};
			}

			const categoryDao = new CategoryDao(conn);
			const categoryRes = await categoryDao.getOne(body.category_id.toString());
			if (categoryRes === null) {

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

			const gstRateDao = new GstRateDao(conn);
			const gstRateRes = await gstRateDao.getOne(body.gst_rate_id.toString());
			if (gstRateRes === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Gst Rate not found.",
						details: "Can not find gst rate for given ID"
					}
				};
			}


			await productDao.updateOne(id, body);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Product Updated."
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

	static async deleteOne(id: string): Promise<CommonCudType> {
		let conn = await connPool.getConnection();
		let res: CommonCudType;
		try {
			conn.beginTransaction();
			let productDao = new ProductDao(conn);

			const commonGetOneResDto = await productDao.getOne(id);
			if (commonGetOneResDto === null) {

				conn.commit();

				return {
					isSuccess: false,
					hasException: false,
					errorResDto: {
						timestamp: new Date(),
						code: "not_found",
						message: "Product not found.",
						details: "Can not find Product for given ID"
					}
				};
			}

			await productDao.deleteOne(id);
			conn.commit();
			res = {
				isSuccess: true,
				hasException: false,
				message: "Product Deleted."
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