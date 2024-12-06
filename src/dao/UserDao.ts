import { PoolConnection } from 'mariadb';
import UserResDto from '../dto/res/UserResDto';
import UserReqDto from '../dto/req/UserReqDto';

export default class UserDao {

	static readonly tableName = 'user';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<UserResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${UserDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<UserResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${UserDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async create(body: UserReqDto) {
		await this.conn.query(`INSERT INTO user (name, username, password, contact_no, email, access_role_id) VALUES(?, ?, ?, ?, ?, ?)`, [body.name, body.username, body.password, body.contact_no, body.email, body.access_role_id]);
	}

	async updateOne(id: string, body: UserReqDto) {
		await this.conn.query(`UPDATE ${UserDao.tableName} SET name = ?, username = ?, password = ?, contact_no = ?, email = ?, access_role_id = ? WHERE id = ?`, [body.name, body.username, body.password, body.contact_no, body.email, body.access_role_id, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${UserDao.tableName} WHERE id = ?`, [id]);
	}

	async findByName(name: string): Promise<UserResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${UserDao.tableName} WHERE name = ?`, [name]);
		if (!row)
			return null;
		return row as UserResDto;
	}

	async findByUserName(username: string): Promise<UserResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${UserDao.tableName} WHERE username = ?`, [username]);
		if (!row)
			return null;
		return row as UserResDto;
	}
}