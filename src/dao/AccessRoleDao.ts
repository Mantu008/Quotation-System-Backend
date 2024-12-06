import { PoolConnection } from 'mariadb';
import AccessRoleResDto from '../dto/res/AccessRoleResDto';
import AccessRoleReqDto from '../dto/req/AccessRoleReqDto';

export default class AccessRoleDao {

	static readonly tableName = 'access_role';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<AccessRoleResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${AccessRoleDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<AccessRoleResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${AccessRoleDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async create(body: AccessRoleReqDto){
		await this.conn.query(`INSERT INTO ${AccessRoleDao.tableName} (name, deleteable) VALUES(?, ?)`, [body.name, body.deleteable]);
	}

	async updateOne(id: string, body: AccessRoleReqDto) {
		await this.conn.query(`UPDATE ${AccessRoleDao.tableName} SET name = ?, deleteable = ? WHERE id = ?`, [body.name, body.deleteable, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${AccessRoleDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByName(name: string): Promise<AccessRoleResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${AccessRoleDao.tableName} WHERE name = ?`, [name]);
		if(!row)
			return null;
		return row as AccessRoleResDto;
	}
}