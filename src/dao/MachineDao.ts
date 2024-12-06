import { PoolConnection } from 'mariadb';
import MachineResDto from '../dto/res/MachineResDto';
import MachineReqDto from '../dto/req/MachineReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class MachineDao {

	static readonly tableName = 'machine';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<MachineResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${MachineDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<MachineResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${MachineDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<MachineResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${MachineDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`)
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as MachineResDto[];
	}

	async create(body: MachineReqDto){
		await this.conn.query(`INSERT INTO ${MachineDao.tableName} (name) VALUES(?)`, [body.name]);
	}

	async updateOne(id: string, body: MachineReqDto) {
		await this.conn.query(`UPDATE ${MachineDao.tableName} SET name = ? WHERE id = ?`, [body.name, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${MachineDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByName(name: string): Promise<MachineResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${MachineDao.tableName} WHERE name = ?`, [name]);
		if(!row)
			return null;
		return row as MachineResDto;
	}
}