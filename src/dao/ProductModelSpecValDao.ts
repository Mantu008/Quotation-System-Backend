import { PoolConnection } from 'mariadb';
import ProductModelSpecValResDto from '../dto/res/ProductModelSpecValResDto';
import ProductModelSpecValReqDto from '../dto/req/ProductModelSpecValReqDto';

export default class ProductModelSpecValDao {

	static readonly tableName = 'prod_mo_no_prod_spec_val';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<ProductModelSpecValResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${ProductModelSpecValDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<ProductModelSpecValResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${ProductModelSpecValDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async create(body: ProductModelSpecValReqDto) {
		await this.conn.query(`INSERT INTO ${ProductModelSpecValDao.tableName} (prod_mo_no_prod_spec_id, spec_value, spec_code) VALUES(?, ?, ?)`, [body.prod_mo_no_prod_spec_id, body.spec_value, body.spec_code]);
	}

	async updateOne(id: string, body: ProductModelSpecValReqDto) {
		await this.conn.query(`UPDATE ${ProductModelSpecValDao.tableName} SET prod_mo_no_prod_spec_id = ?, spec_value = ?, spec_code = ? WHERE id = ?`, [body.prod_mo_no_prod_spec_id, body.spec_value, body.spec_code, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${ProductModelSpecValDao.tableName} WHERE id = ?`, [id]);
	}

	async findByProdIdAndSpecValue(prod_mo_no_prod_spec_id: string, spec_value: string): Promise<ProductModelSpecValResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${ProductModelSpecValDao.tableName} WHERE prod_mo_no_prod_spec_id = ? AND spec_value`, [prod_mo_no_prod_spec_id, spec_value]);
		if (!row || row.length === 0) {
			return null;
		}
		return row as ProductModelSpecValResDto;
	}
}