import { PoolConnection } from 'mariadb';
import StateResDto from '../dto/res/StateResDto';
import StateReqDto from '../dto/req/StateReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class StateDao {

	static readonly tableName = 'state';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<StateResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${StateDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<StateResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${StateDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async getLdtos(
		name: string | null,
		codeName: string | null,
		codeNo: number | null
	): Promise<StateResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${StateDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`);
		}

		if (codeName !== null && codeName !== undefined) {
			conditions.push(`code_name LIKE '${SqlHelper.escape(codeName)}'`);
		}

		if (codeNo !== null && codeNo !== undefined) {
			conditions.push(`code_no = ${codeNo}`);
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as StateResDto[];
	}

	async create(body: StateReqDto) {
		await this.conn.query(`INSERT INTO ${StateDao.tableName} (name, code_name, code_no) VALUES(?, ?, ?)`, [body.name, body.code_name, body.code_no]);
	}

	async updateOne(id: string, body: StateReqDto) {
		await this.conn.query(`UPDATE ${StateDao.tableName} SET name = ?, code_name = ?, code_no = ? WHERE id = ?;`, [body.name, body.code_name, body.code_no, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${StateDao.tableName} WHERE id = ?;`, [id]);
	}

	async findByNameCodeNameCodeNo(name: string, code_name: string, code_no: string
	): Promise<StateResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${StateDao.tableName} WHERE name = ? OR code_name = ? OR code_no = ?; `, [name, code_name, code_no]);
		if (!row)
			return null;
		return row as StateResDto;
	}
}