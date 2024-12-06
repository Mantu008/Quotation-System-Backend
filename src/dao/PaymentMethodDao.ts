import { PoolConnection } from 'mariadb';
import PaymentMethodResDto from '../dto/res/PaymentMethodResDto';
import PaymentMethodReqDto from '../dto/req/PaymentMethodReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class PaymentMethodDao {

	static readonly tableName = 'payment_method';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<PaymentMethodResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${PaymentMethodDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<PaymentMethodResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${PaymentMethodDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		name: string | null
	): Promise<PaymentMethodResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${PaymentMethodDao.tableName}
					`;

		let conditions: string[] = [];

		if (name !== null && name !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(name)}'`);
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as PaymentMethodResDto[];
	}

	async create(body: PaymentMethodReqDto){
		await this.conn.query(`INSERT INTO ${PaymentMethodDao.tableName} (name) VALUES(?)`, [body.name]);
	}

	async updateOne(id: string, body: PaymentMethodReqDto) {
		await this.conn.query(`UPDATE ${PaymentMethodDao.tableName} SET name = ? WHERE id = ?`, [body.name, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${PaymentMethodDao.tableName} WHERE id = ?`, [id]);
	}

	async  findByName(name: string): Promise<PaymentMethodResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${PaymentMethodDao.tableName} WHERE name = ?`, [name]);
		if(!row)
			return null;
		return row as PaymentMethodResDto;
	}
}