import { PoolConnection } from 'mariadb';
import ProductModelResDto from '../dto/res/ProductModelResDto';
import ProductModelReqDto from '../dto/req/ProductModelReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class ProductModelDao {

	static readonly tableName = 'prod_mo_no';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<ProductModelResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${ProductModelDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<ProductModelResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${ProductModelDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async getLdtos(
		categoryId: number | null,
		name: string | null
	): Promise<ProductModelResDto[]> {
		let sql = 	`SELECT
					id,
					(SELECT name FROM category WHERE category.id = category_id) as 'category_name',
					name,
					prefix,
					postfix,
					hsn_code,
					rate
					FROM
					${ProductModelDao.tableName}`;

		let conditions: string[] = [];

		if (categoryId !== null && categoryId !== undefined) {
			conditions.push(`category_id = ${categoryId}`);
		}

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`);
		}

		sql = SqlHelper.putWheres(conditions, sql);

		sql = sql + " ORDER BY (SELECT name FROM category WHERE category.id = category_id), name";

		const rows = await this.conn.query(sql);
		return rows as ProductModelResDto[];
	}

	async create(body: ProductModelReqDto) {
		const res = await this.conn.query(`INSERT INTO ${ProductModelDao.tableName} (category_id, name, prefix, postfix, hsn_code, rate) VALUES(?, ?, ?, ?, ?, ?)`, [body.category_id, body.name, body.prefix, body.postfix, body.hsn_code, body.rate]);
		return res;
	}

	async updateOne(id: string, body: ProductModelReqDto) {
		await this.conn.query(`UPDATE ${ProductModelDao.tableName} SET category_id = ?, name = ?, prefix = ?, postfix = ?, hsn_code = ?, rate = ? WHERE id = ?`, [body.category_id, body.name, body.prefix, body.postfix, body.hsn_code, body.rate, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${ProductModelDao.tableName} WHERE id = ?`, [id]);
	}

	async findByName(name: string): Promise<ProductModelResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${ProductModelDao.tableName} WHERE name = ?`, [name]);
		if (!row)
			return null;
		return row as ProductModelResDto;
	}

	
}