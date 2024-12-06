import { PoolConnection } from 'mariadb';
import ContactResDto from '../dto/res/ContactResDto';
import ContactReqDto from '../dto/req/ContactReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class ContactDao {

	static readonly tableName = 'contact';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<ContactResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${ContactDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<ContactResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${ContactDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async getLdtos(
		nameVar: string | null,
		addressVar: string | null,
		cityVar: string | null,
		stateId: number | null,
		countryVar: string | null,
		pinVar: number | null,
		jobTitle: string | null,
		contactNo: string | null,
		emailVar: string | null,
		contactNatureId: number | null,
		inqSrcId: number | null,
		industryId: number | null,
		descVar: string | null
	): Promise<ContactResDto[]> {
		let sql = `
					SELECT
					id,
					name,
					(SELECT GROUP_CONCAT(customer.name) FROM customer WHERE customer.id IN (SELECT customer_contact.customer_id FROM customer_contact WHERE customer_contact.contact_id = contact.id)) as 'customers',
					address,
					city,
					(SELECT name FROM state WHERE state.id = state_id) as 'state_name',
					country,
					pin,
					job_title,
					contact_no1,
					contact_no2,
					contact_no3,
					email1,
					email2,
					(SELECT name FROM contact_nature WHERE contact_nature.id = contact_nature_id) as 'contact_nature_name',
					(SELECT name FROM inq_src WHERE inq_src.id = inq_src_id) as 'inq_src_name',
					(SELECT name FROM industry WHERE industry.id = industry_id) as 'industry_name',
					\`desc\`
					FROM
					${ContactDao.tableName}
				`;

		let conditions: string[] = [];

		if (nameVar !== null && nameVar !== undefined) {
			conditions.push(`name LIKE '${SqlHelper.escape(nameVar)}'`);
		}

		if (addressVar !== null && addressVar !== undefined) {
			conditions.push(`address LIKE '${SqlHelper.escape(addressVar)}'`);
		}

		if (cityVar !== null && cityVar !== undefined) {
			conditions.push(`city LIKE '${SqlHelper.escape(cityVar)}'`);
		}

		if (stateId !== null && stateId !== undefined) {
			conditions.push(`state_id = ${stateId}`);
		}

		if (countryVar !== null && countryVar !== undefined) {
			conditions.push(`country LIKE '${SqlHelper.escape(countryVar)}'`);
		}

		if (pinVar !== null && pinVar !== undefined) {
			conditions.push(`pin LIKE '${pinVar}'`);
		}

		if (jobTitle !== null && jobTitle !== undefined) {
			conditions.push(`job_title LIKE '${SqlHelper.escape(jobTitle)}'`);
		}

		if (contactNo !== null && contactNo !== undefined) {
			let tempOrConditions: string[] = [];
			tempOrConditions.push(`contact_no1 = ${contactNo}`);
			tempOrConditions.push(`contact_no2 = ${contactNo}`);
			tempOrConditions.push(`contact_no3 = ${contactNo}`);
			conditions.push(SqlHelper.putOr(tempOrConditions));
		}

		if (descVar !== null && descVar !== undefined) {
			conditions.push(`\`desc\` LIKE '${SqlHelper.escape(descVar)}'`);
		}

		if (contactNatureId !== null && contactNatureId !== undefined) {
			conditions.push(`contact_nature_id = ${contactNatureId}`);
		}

		if (inqSrcId !== null && inqSrcId !== undefined) {
			conditions.push(`inq_src_id = ${inqSrcId}`);
		}

		if (industryId !== null && industryId !== undefined) {
			conditions.push(`industry_id = ${industryId}`);
		}

		if (emailVar !== null && emailVar !== undefined) {
			let tempOrConditions: string[] = [];
			tempOrConditions.push(`email1 LIKE '${SqlHelper.escape(emailVar)}'`);
			tempOrConditions.push(`email2 LIKE '${SqlHelper.escape(emailVar)}'`);
			conditions.push(SqlHelper.putOr(tempOrConditions));
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as ContactResDto[];
	}

	async create(body: ContactReqDto) {
		const res = await this.conn.query(`INSERT INTO ${ContactDao.tableName} (name, address, city, state_id, country, pin, job_title, contact_no1, contact_no2, contact_no3, email1, email2, contact_nature_id, inq_src_id, industry_id, \`desc\`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [body.name, body.address, body.city, body.state_id, body.country, body.pin, body.job_title, body.contact_no1, body.contact_no2, body.contact_no3, body.email1, body.email2, body.contact_nature_id, body.inq_src_id, body.industry_id, body.desc]);
		return res;
	}

	async updateOne(id: string, body: ContactReqDto) {
		await this.conn.query(`UPDATE ${ContactDao.tableName} SET name = ?, address = ?, city = ?, state_id = ?, country = ?, pin = ?, job_title = ?, contact_no1 = ?, contact_no2 = ?, contact_no3 = ?, email1 = ?, email2 = ?, contact_nature_id = ?, inq_src_id = ?, industry_id = ?, \`desc\` = ? WHERE id = ?`, [body.name, body.address, body.city, body.state_id, body.country, body.pin, body.job_title, body.contact_no1, body.contact_no2, body.contact_no3, body.email1, body.email2, body.contact_nature_id, body.inq_src_id, body.industry_id, body.desc, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${ContactDao.tableName} WHERE id = ?;`, [id]);
	}

	async findByName(name: string): Promise<ContactResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${ContactDao.tableName} WHERE name = ?; `, [name]);
		if (!row)
			return null;
		return row as ContactResDto;
	}
}