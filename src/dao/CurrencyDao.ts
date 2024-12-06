import { PoolConnection } from 'mariadb';
import CurrencyResDto from '../dto/res/CurrencyResDto';
import CurrencyReqDto from '../dto/req/CurrencyReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class CurrencyDao {

	static readonly tableName = 'currency';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<CurrencyResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${CurrencyDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<CurrencyResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${CurrencyDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<CurrencyResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${CurrencyDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`)
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as CurrencyResDto[];
	}

	async create(body: CurrencyReqDto){
		await this.conn.query(`INSERT INTO ${CurrencyDao.tableName} (name, symbol, is_default) VALUES(?, ?, ?)`, [body.name, body.symbol, body.is_default]);
	}

	async updateOne(id: string, body: CurrencyReqDto) {
		await this.conn.query(`UPDATE ${CurrencyDao.tableName} SET name = ?, symbol = ?, is_default = ? WHERE id = ?`, [body.name, body.symbol, body.is_default, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${CurrencyDao.tableName} WHERE id = ?`, [id]);
	}

}