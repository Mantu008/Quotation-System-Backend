import { PoolConnection } from 'mariadb';
import BusinessInfoOtherResDto from '../dto/res/BusinessInfoOtherResDto';
import BusinessInfoOtherReqDto from '../dto/req/BusinessInfoOtherReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class BusinessInfoOtherDao {

	static readonly tableName = 'bus_info_custom';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<BusinessInfoOtherResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${BusinessInfoOtherDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<BusinessInfoOtherResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${BusinessInfoOtherDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<BusinessInfoOtherResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${BusinessInfoOtherDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`info_key LIKE '${SqlHelper.escape(name)}'`)
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY info_key";

		const rows = await this.conn.query(sql);
		return rows as BusinessInfoOtherResDto[];
	}

	async create(body: BusinessInfoOtherReqDto){
		await this.conn.query(`INSERT INTO ${BusinessInfoOtherDao.tableName} (no, info_key, info_val, is_in_quo, is_in_pi) VALUES(?, ?, ?, ?, ?)`, [body.no, body.name, body.text, body.is_in_quo, body.is_in_pi]);
	}

	async updateOne(id: string, body: BusinessInfoOtherReqDto) {
		await this.conn.query(`UPDATE ${BusinessInfoOtherDao.tableName} SET no = ?, info_key = ?, info_val = ?, is_in_quo = ?, is_in_pi = ? WHERE id = ?`, [body.no, body.name, body.text, body.is_in_quo, body.is_in_pi, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${BusinessInfoOtherDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByNumber(no: string): Promise<BusinessInfoOtherResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${BusinessInfoOtherDao.tableName} WHERE no = ?`, [no]);
		if(!row)
			return null;
		return row as BusinessInfoOtherResDto;
	}
}