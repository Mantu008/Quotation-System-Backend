import { PoolConnection } from 'mariadb';
import GstRateResDto from '../dto/res/GstRateResDto';
import GstRateReqDto from '../dto/req/GstRateReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class GstRateDao {

	static readonly tableName = 'gst_rate';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<GstRateResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${GstRateDao.tableName};`);
		return rows;
	}

	async getOne(id: string): Promise<GstRateResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${GstRateDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<GstRateResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${GstRateDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`)
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as GstRateResDto[];
	}

	async create(body: GstRateReqDto){
		await this.conn.query(`INSERT INTO ${GstRateDao.tableName} (name, cgst, sgst, igst) VALUES(?, ?, ?, ?);`, [body.name, body.cgst, body.sgst, body.igst]);
	}

	async updateOne(id: string, body: GstRateReqDto) {
		await this.conn.query(`UPDATE ${GstRateDao.tableName} SET name = ?, cgst = ?, sgst = ?, igst = ? WHERE id = ?;`, [body.name, body.cgst, body.sgst, body.igst, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${GstRateDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByName(name: string): Promise<GstRateResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${GstRateDao.tableName} WHERE name = ?`, [name]);
		if(!row)
			return null;
		return row as GstRateResDto;
	}
}