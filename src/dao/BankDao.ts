import { PoolConnection } from 'mariadb';
import BankResDto from '../dto/res/BankResDto';
import BankReqDto from '../dto/req/BankReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class BankDao {

	static readonly tableName = 'bank';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<BankResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${BankDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<BankResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${BankDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<BankResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${BankDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`);
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as BankResDto[];
	}

	async create(body: BankReqDto){
		await this.conn.query(`INSERT INTO ${BankDao.tableName} (name, acct_no, ifsc, branch, address) VALUES(?, ?, ?, ?, ?)`, [body.name, body.acct_no, body.ifsc, body.branch, body.address]);
	}

	async updateOne(id: string, body: BankReqDto) {
		await this.conn.query(`UPDATE ${BankDao.tableName} SET name = ?, acct_no = ?, ifsc = ?, branch = ?, address = ? WHERE id = ?`, [body.name, body.acct_no, body.ifsc, body.branch, body.address, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${BankDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByName(name: string): Promise<BankResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${BankDao.tableName} WHERE name = ?`, [name]);
		if(!row)
			return null;
		return row as BankResDto;
	}
}