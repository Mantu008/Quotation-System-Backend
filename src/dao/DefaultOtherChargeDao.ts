import { PoolConnection } from 'mariadb';
import DefaultOtherChargeResDto from '../dto/res/DefaultOtherChargeResDto';
import DefaultOtherChargeReqDto from '../dto/req/DefaultOtherChargeReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class DefaultOtherChargeDao {

	static readonly tableName = 'default_oth_charge';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<DefaultOtherChargeResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${DefaultOtherChargeDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<DefaultOtherChargeResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${DefaultOtherChargeDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<DefaultOtherChargeResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${DefaultOtherChargeDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`)
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as DefaultOtherChargeResDto[];
	}

	async create(body: DefaultOtherChargeReqDto){
		await this.conn.query(`INSERT INTO ${DefaultOtherChargeDao.tableName} (name, amt) VALUES(?, ?)`, [body.name, body.amt]);
	}

	async updateOne(id: string, body: DefaultOtherChargeReqDto) {
		await this.conn.query(`UPDATE ${DefaultOtherChargeDao.tableName} SET name = ?, amt = ? WHERE id = ?`, [body.name, body.amt, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${DefaultOtherChargeDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByName(name: string): Promise<DefaultOtherChargeResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${DefaultOtherChargeDao.tableName} WHERE name = ?`, [name]);
		if(!row)
			return null;
		return row as DefaultOtherChargeResDto;
	}
}