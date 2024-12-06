import { PoolConnection } from 'mariadb';
import CategoryResDto from '../dto/res/CategoryResDto';
import CategoryReqDto from '../dto/req/CategoryReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class CategoryDao {

	static readonly tableName = 'category';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<CategoryResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${CategoryDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<CategoryResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${CategoryDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<CategoryResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${CategoryDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`);
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as CategoryResDto[];
	}

	async create(body: CategoryReqDto){
		await this.conn.query(`INSERT INTO category (name) VALUES(?)`, [body.name]);
	}

	async updateOne(id: string, name: string){
		await this.conn.query(`UPDATE ${CategoryDao.tableName} SET name = ? WHERE id = ?`, [name, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${CategoryDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByName(name: string): Promise<CategoryResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${CategoryDao.tableName} WHERE name = ?`, [name]);
		if(!row)
			return null;
		return row as CategoryResDto;
	}

	async isReferenced(id: number): Promise<boolean> {
		const [row] = await this.conn.query(`SELECT p.* FROM ${CategoryDao.tableName} p JOIN product c ON p.id = c.id WHERE p.id = ?`, [id]);
		if(row)
			return true;
		return false;
	}
}
