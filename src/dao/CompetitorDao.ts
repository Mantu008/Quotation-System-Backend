import { PoolConnection } from 'mariadb';
import CompetitorResDto from '../dto/res/CompetitorResDto';
import CompetitorReqDto from '../dto/req/CompetitorReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class CompetitorDao {

	static readonly tableName = 'competitor';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<CompetitorResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${CompetitorDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<CompetitorResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${CompetitorDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<CompetitorResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${CompetitorDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`)
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as CompetitorResDto[];
	}

	async create(body: CompetitorReqDto){
		await this.conn.query(`INSERT INTO ${CompetitorDao.tableName} (name) VALUES(?)`, [body.name]);
	}

	async updateOne(id: string, body: CompetitorReqDto) {
		await this.conn.query(`UPDATE ${CompetitorDao.tableName} SET name = ? WHERE id = ?;`, [body.name, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${CompetitorDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByName(name: string): Promise<CompetitorResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${CompetitorDao.tableName} WHERE name = ?; `, [name]);
		if(!row)
			return null;
		return row as CompetitorResDto;
	}
}