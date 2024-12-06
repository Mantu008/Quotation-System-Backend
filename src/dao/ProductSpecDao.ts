import { PoolConnection } from 'mariadb';
import ProductSpecResDto from '../dto/res/ProductSpecResDto';
import ProductSpecReqDto from '../dto/req/ProductSpecReqDto';

export default class ProductSpecDao {

	static readonly tableName = 'prod_spec';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<ProductSpecResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${ProductSpecDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<ProductSpecResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${ProductSpecDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async create(body: ProductSpecReqDto) {
		await this.conn.query(`INSERT INTO ${ProductSpecDao.tableName} (prod_id, spec_name, spec_val) VALUES(?, ?, ?)`, [body.prod_id, body.spec_name, body.spec_val]);
	}

	async updateOne(id: string, body: ProductSpecReqDto) {
		await this.conn.query(`UPDATE ${ProductSpecDao.tableName} SET prod_id = ?, spec_name = ?, spec_val = ? WHERE id = ?`, [body.prod_id, body.spec_name, body.spec_val, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${ProductSpecDao.tableName} WHERE id = ?`, [id]);
	}

	async findByProdIdAndSpecName(prod_id: number, spec_name: string): Promise<ProductSpecResDto | null> {
		const [rows] = await this.conn.query(
			`SELECT * FROM ${ProductSpecDao.tableName} WHERE prod_id = ? AND spec_name = ?`,
			[prod_id, spec_name]
		);
		
		if (!rows || rows.length === 0) {
			return null;
		}
		
		return rows as ProductSpecResDto;
	}
}