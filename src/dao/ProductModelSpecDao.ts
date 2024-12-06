import { PoolConnection } from 'mariadb';
import ProductModelSpecResDto from '../dto/res/ProductModelSpecResDto';
import ProductModelSpecReqDto from '../dto/req/ProductModelSpecReqDto';

export default class ProductModelSpecDao {

	static readonly tableName = 'prod_mo_no_prod_spec';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<ProductModelSpecResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${ProductModelSpecDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<ProductModelSpecResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${ProductModelSpecDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async create(body: ProductModelSpecReqDto) {
		const res = await this.conn.query(`INSERT INTO ${ProductModelSpecDao.tableName} (prod_mo_no_id, spec_name) VALUES(?, ?)`, [body.prod_mo_no_id, body.spec_name]);
		return res;
	}

	async updateOne(id: string, body: ProductModelSpecReqDto) {
		await this.conn.query(`UPDATE ${ProductModelSpecDao.tableName} SET prod_mo_no_id = ?, spec_name = ? WHERE id = ?`, [body.prod_mo_no_id, body.spec_name, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${ProductModelSpecDao.tableName} WHERE id = ?`, [id]);
	}

	async findByProdIdAndSpecName(prod_mo_no_id: string, spec_name: string): Promise<ProductModelSpecResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${ProductModelSpecDao.tableName} WHERE prod_mo_no_id = ? AND spec_name`, [prod_mo_no_id, spec_name]);
		if (!row || row.length === 0) {
			return null;
		}
		return row as ProductModelSpecResDto;
	}
}