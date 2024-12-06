import { PoolConnection } from 'mariadb';
import IndustryResDto from '../dto/res/IndustryResDto';
import IndustryReqDto from '../dto/req/IndustryReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class IndustryDao {

	static readonly tableName = 'industry';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<IndustryResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${IndustryDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<IndustryResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${IndustryDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<IndustryResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${IndustryDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`)
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as IndustryResDto[];
	}

	async create(body: IndustryReqDto){
		await this.conn.query(`INSERT INTO ${IndustryDao.tableName} (name) VALUES(?)`, [body.name]);
	}

	async updateOne(id: string, body: IndustryReqDto) {
		await this.conn.query(`UPDATE ${IndustryDao.tableName} SET name = ? WHERE id = ?`, [body.name, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${IndustryDao.tableName} WHERE id = ?;`, [id]);
	}

	async  findByName(name: string): Promise<IndustryResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${IndustryDao.tableName} WHERE name = ?; `, [name]);
		if(!row)
			return null;
		return row as IndustryResDto;
	}
}