import { PoolConnection } from 'mariadb';
import ContactNatureResDto from '../dto/res/ContactNatureResDto';
import ContactNatureReqDto from '../dto/req/ContactNatureReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class ContactNatureDao {

	static readonly tableName = 'contact_nature';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<ContactNatureResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${ContactNatureDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<ContactNatureResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${ContactNatureDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<ContactNatureResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${ContactNatureDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`)
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as ContactNatureResDto[];
	}

	async create(body: ContactNatureReqDto){
		await this.conn.query(`INSERT INTO ${ContactNatureDao.tableName} (name) VALUES(?)`, [body.name]);
	}

	async updateOne(id: string, body: ContactNatureReqDto) {
		await this.conn.query(`UPDATE ${ContactNatureDao.tableName} SET name = ? WHERE id = ?;`, [body.name, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${ContactNatureDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByName(name: string): Promise<ContactNatureResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${ContactNatureDao.tableName} WHERE name = ?`, [name]);
		if(!row)
			return null;
		return row as ContactNatureResDto;
	}
}