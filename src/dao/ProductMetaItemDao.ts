import { PoolConnection } from 'mariadb';
import ProductMetaItemResDto from '../dto/res/ProductMetaItemResDto';
import ProductMetaItemReqDto from '../dto/req/ProductMetaItemReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class ProductMetaItemDao {

	static readonly tableName = 'prod_meta_item';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<ProductMetaItemResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${ProductMetaItemDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<ProductMetaItemResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${ProductMetaItemDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}
	
	async create(body: ProductMetaItemReqDto) {
		await this.conn.query(`INSERT INTO ${ProductMetaItemDao.tableName} (prod_meta_id, name, value) VALUES(?, ?, ?)`, [body.prod_meta_id, body.name, body.value]);
	}

	async updateOne(id: string, body: ProductMetaItemReqDto) {
		await this.conn.query(`UPDATE ${ProductMetaItemDao.tableName} SET prod_meta_id = ?, name = ?, value = ? WHERE id = ?`, [body.prod_meta_id, body.name, body.value, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${ProductMetaItemDao.tableName} WHERE id = ?`, [id]);
	}

}