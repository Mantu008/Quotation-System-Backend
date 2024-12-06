import { PoolConnection } from 'mariadb';
import ProductMetaResDto from '../dto/res/ProductMetaResDto';
import ProductMetaReqDto from '../dto/req/ProductMetaReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class ProductMetaDao {

	static readonly tableName = 'prod_meta';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<ProductMetaResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${ProductMetaDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<ProductMetaResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${ProductMetaDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async create(body: ProductMetaReqDto) {
		const res = await this.conn.query(`INSERT INTO ${ProductMetaDao.tableName} (prod_id, heading) VALUES(?, ?)`, [body.prod_id, body.heading]);
		return res;
	}

	async updateOne(id: string, body: ProductMetaReqDto) {
		await this.conn.query(`UPDATE ${ProductMetaDao.tableName} SET prod_id = ?, heading = ? WHERE id = ?`, [body.prod_id, body.heading, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${ProductMetaDao.tableName} WHERE id = ?`, [id]);
	}

}