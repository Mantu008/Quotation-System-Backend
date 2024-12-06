import { PoolConnection } from 'mariadb';
import ProductResDto from '../dto/res/ProductResDto';
import ProductReqDto from '../dto/req/ProductReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class ProductDao {

	static readonly tableName = 'prod';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<ProductResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${ProductDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<ProductResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${ProductDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async getLdtos(
		categoryId: number | null,
		name: string | null,
		modelNo: string | null
	): Promise<ProductResDto[]> {
		let sql = `
						SELECT
							id,
							IF(
								category_id is NULL,
								"",
								(SELECT name FROM category WHERE category.id = category_id)
							) as category_name,
							name,
							model_no,
							hsn_code,
							rate,
							IF(
								gst_rate_id is NULL,
								"",
								(SELECT name FROM gst_rate WHERE gst_rate.id = gst_rate_id)
							) as gst_rate_name
						FROM
							${ProductDao.tableName}
					`;

		let conditions: string[] = [];

		if (categoryId !== null && categoryId !== undefined) {
			conditions.push(`category_id = ${categoryId}`);
		}

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`);
		}

		if (modelNo !== null && modelNo !== undefined) {
			conditions.push(`model_no LIKE '${SqlHelper.escape(modelNo)}'`);
		}

		sql = SqlHelper.putWheres(conditions, sql);

		sql = sql + " ORDER BY (SELECT name FROM category WHERE category.id = category_id), name";

		const rows = await this.conn.query(sql);
		return rows as ProductResDto[];
	}

	async create(body: ProductReqDto) {
		const res = await this.conn.query(`INSERT INTO ${ProductDao.tableName} (category_id, name, model_no, hsn_code, rate, gst_rate_id) VALUES(?, ?, ?, ?, ?, ?)`, [body.category_id, body.name, body.model_no, body.hsn_code, body.rate, body.gst_rate_id]);

		return res;
	}

	async updateOne(id: string, body: ProductReqDto) {
		await this.conn.query(`UPDATE ${ProductDao.tableName} SET category_id=?, name=?, model_no=?, hsn_code=?, rate=?, gst_rate_id=? WHERE id=?`, [body.category_id, body.name, body.model_no, body.hsn_code, body.rate, body.gst_rate_id, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${ProductDao.tableName} WHERE id = ?`, [id]);
	}

	async findByModelNo(model: string): Promise<ProductResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${ProductDao.tableName} WHERE model_no = ?; `, [model]);
		if (!row)
			return null;
		return row as ProductResDto;
	}
}
