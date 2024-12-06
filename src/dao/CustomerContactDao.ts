import { PoolConnection } from 'mariadb';
import CustomerContactResDto from '../dto/res/CustomerContactResDto';
import CustomerContactReqDto from '../dto/req/CustomerContactReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class CustomerContactDao {

	static readonly tableName = 'customer_contact';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<CustomerContactResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${CustomerContactDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<CustomerContactResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${CustomerContactDao.tableName} WHERE id = ?`, [id]);
		if(row.length === 0 )
			return null;
		return row;
	}

	async getLdtos(
		customerId: number | null,
		contactId: number | null
	): Promise<CustomerContactResDto[]> {
		let sql = `
						SELECT
							*
						FROM
							${CustomerContactDao.tableName}
					`;

		let conditions: string[] = [];

		if (customerId !== null && customerId !== undefined) {
			conditions.push(`customer_id = ${customerId}`);
		}

		if (contactId !== null && contactId !== undefined) {
			conditions.push(`contact_id = ${contactId}`);
		}

		sql = SqlHelper.putWheres(conditions, sql);

		const rows = await this.conn.query(sql);
		return rows as CustomerContactResDto[];
	}

	async create(body: CustomerContactReqDto){
		await this.conn.query(`INSERT INTO ${CustomerContactDao.tableName} (customer_id, contact_id) VALUES(?, ?)`, [body.customer_id, body.contact_id]);
	}

	async updateOne(id: string, body: CustomerContactReqDto) {
		await this.conn.query(`UPDATE ${CustomerContactDao.tableName} SET customer_id = ?, contact_id = ? WHERE id = ?`, [body.customer_id, body.contact_id, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${CustomerContactDao.tableName} WHERE id = ?;`, [id]);
	}

	async deleteByCustomerId(id: string) {
		await this.conn.query(`DELETE FROM ${CustomerContactDao.tableName} WHERE customer_id = ?;`, [id]);
	}

	async deleteByContactId(id: string) {
		await this.conn.query(`DELETE FROM ${CustomerContactDao.tableName} WHERE contact_id = ?;`, [id]);
	}

	async findByCustomerIdAndContactId(customer_id: number, contact_id: number): Promise<CustomerContactResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${CustomerContactDao.tableName} WHERE customer_id = ? AND contact_id = ?; `, [customer_id, contact_id]);
		if (!row)
			return null;
		return row as CustomerContactResDto;
	}
}