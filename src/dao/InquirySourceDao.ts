import { PoolConnection } from 'mariadb';
import InquirySourceResDto from '../dto/res/InquirySourceResDto';
import InquirySourceReqDto from '../dto/req/InquirySourceReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class InquirySourceDao {

	static readonly tableName = 'inq_src';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<InquirySourceResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${InquirySourceDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<InquirySourceResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${InquirySourceDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<InquirySourceResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${InquirySourceDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`)
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as InquirySourceResDto[];
	}

	async create(body: InquirySourceReqDto) {
		await this.conn.query(`INSERT INTO ${InquirySourceDao.tableName} (name) VALUES(?)`, [body.name]);
	}

	async updateOne(id: string, body: InquirySourceReqDto) {
		await this.conn.query(`UPDATE ${InquirySourceDao.tableName} SET name = ? WHERE id = ?`, [body.name, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${InquirySourceDao.tableName} WHERE id = ?`, [id]);
	}

	async findByName(name: string): Promise<InquirySourceResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${InquirySourceDao.tableName} WHERE name = ?`, [name]);
		if (!row)
			return null;
		return row as InquirySourceResDto;
	}
}