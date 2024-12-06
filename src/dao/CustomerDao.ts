import { PoolConnection } from 'mariadb';
import CustomerResDto from '../dto/res/CustomerResDto';
import CustomerReqDto from '../dto/req/CustomerReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class CustomerDao {

	static readonly tableName = 'customer';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<CustomerResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${CustomerDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<CustomerResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${CustomerDao.tableName} WHERE id = ?`, [id]);
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
		shipName: string | null,
		shipAddress: string | null,
		shipCity: string | null,
		shipStateId: number | null,
		shipCountry: string | null,
		shipPin: number | null,
		gstNo: string | null,
		ownerVar: string | null,
		codeVar: string | null,
		contactNo: string | null,
		descVar: string | null,
		contactNatureId: number | null,
		inqSrcId: number | null,
		industryId: number | null,
		machineId: number | null,
		emailVar: string | null,
		competitorId: number | null,
		classUd: string | null
	): Promise<CustomerResDto[]> {
		let sql = `
					SELECT
					id,
					name,
					address,
					city,
					(SELECT name FROM state WHERE state.id = state_id) as 'state_name',
					country,
					pin,
					ship_name,
					ship_add,
					ship_city,
					(SELECT name FROM state WHERE state.id = state_id) as 'ship_state_name',
					ship_country,
					ship_pin,
					gst_no,
					owner,
					code,
					contact_no1,
					contact_no2,
					\`desc\`,
					(SELECT name FROM contact_nature WHERE contact_nature.id = contact_nature_id) as 'contact_nature_name',
					(SELECT name FROM inq_src WHERE inq_src.id = inq_src_id) as 'inq_src_name',
					(SELECT name FROM industry WHERE industry.id = industry_id) as 'industry_name',
					(SELECT name FROM machine WHERE machine.id = machine_id) as 'machine_name',
					consump,
					email,
					(SELECT name FROM competitor WHERE competitor.id = competitor1) as 'competitor_name_1',
					(SELECT name FROM competitor WHERE competitor.id = competitor2) as 'competitor_name_2',
					class_ud,
					created_at,
					(SELECT name FROM user WHERE user.id = created_by_user_id) as 'created_by_user_name',
					(SELECT GROUP_CONCAT(contact.name) FROM contact WHERE contact.id IN (SELECT customer_contact.contact_id FROM customer_contact WHERE customer_contact.customer_id = customer.id)) as 'contacts'
					FROM
					${CustomerDao.tableName}
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

		if (shipName !== null && shipName !== undefined) {
			conditions.push(`ship_name LIKE '${SqlHelper.escape(shipName)}'`);
		}

		if (shipAddress !== null && shipAddress !== undefined) {
			conditions.push(`ship_address LIKE '${SqlHelper.escape(shipAddress)}'`);
		}

		if (shipCity !== null && shipCity !== undefined) {
			conditions.push(`ship_city LIKE '${SqlHelper.escape(shipCity)}'`);
		}

		if (shipStateId !== null && shipStateId !== undefined) {
			conditions.push(`ship_state_id = ${shipStateId}`);
		}

		if (shipCountry !== null && shipCountry !== undefined) {
			conditions.push(`ship_country LIKE '${SqlHelper.escape(shipCountry)}'`);
		}

		if (shipPin !== null && shipPin !== undefined) {
			conditions.push(`ship_pin = ${shipPin}`);
		}

		if (gstNo !== null && gstNo !== undefined) {
			conditions.push(`gst LIKE '${SqlHelper.escape(gstNo)}'`);
		}

		if (ownerVar !== null && ownerVar !== undefined) {
			conditions.push(`owner LIKE '${SqlHelper.escape(ownerVar)}'`);
		}

		if (codeVar !== null && codeVar !== undefined) {
			conditions.push(`code LIKE '${SqlHelper.escape(codeVar)}'`);
		}

		if (contactNo !== null && contactNo !== undefined) {
			let tempOrConditions: string[] = [];
			tempOrConditions.push(`contact_no1 = ${contactNo}`);
			tempOrConditions.push(`contact_no2 = ${contactNo}`);
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

		if (machineId !== null && machineId !== undefined) {
			conditions.push(`machine_id = ${machineId}`);
		}

		if (emailVar !== null && emailVar !== undefined) {
			conditions.push(`email LIKE '${SqlHelper.escape(emailVar)}'`);
		}

		if (competitorId !== null && competitorId !== undefined) {
			let tempOrConditions: string[] = [];
			tempOrConditions.push(`competitor1 = ${competitorId}`);
			tempOrConditions.push(`competitor2 = ${competitorId}`);
			conditions.push(SqlHelper.putOr(tempOrConditions));
		}

		if (classUd !== null && classUd !== undefined) {
			conditions.push(`class_ud LIKE '${SqlHelper.escape(classUd)}'`);
		}

		sql = SqlHelper.putWheres(conditions, sql);
		sql = sql + " ORDER BY name";

		const rows = await this.conn.query(sql);
		return rows as CustomerResDto[];
	}

	async create(body: CustomerReqDto) {
		const res = await this.conn.query(`INSERT INTO ${CustomerDao.tableName} (name, owner, address, city, state_id, country, pin, ship_name, ship_add, ship_city, ship_state_id, ship_country, ship_pin, gst_no, code, contact_no1, contact_no2, \`desc\`, contact_nature_id, inq_src_id, industry_id, machine_id, consump, email, competitor1, competitor2, class_ud, created_by_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [body.name, body.owner, body.address, body.city, body.state_id, body.country, body.pin, body.ship_name, body.ship_add, body.ship_city, body.ship_state_id, body.ship_country, body.ship_pin, body.gst_no, body.code, body.contact_no1, body.contact_no2, body.desc, body.contact_nature_id, body.inq_src_id, body.industry_id, body.machine_id, body.consump, body.email, body.competitor1, body.competitor2, body.class_ud, body.created_by_user_id]);
		return res;
	}

	async updateOne(id: string, body: CustomerReqDto) {
		await this.conn.query(`UPDATE ${CustomerDao.tableName} SET name = ?, owner = ?, address = ?, city = ?, state_id = ?, country = ?, pin = ?, ship_name = ?, ship_add = ?, ship_city = ?, ship_state_id = ?, ship_country = ?, ship_pin = ?, gst_no = ?, code = ?, contact_no1 = ?, contact_no2 = ?, \`desc\` = ?, contact_nature_id = ?, inq_src_id = ?, industry_id = ?, machine_id = ?, consump = ?, email = ?, competitor1 = ?, competitor2 = ?, class_ud = ?, created_by_user_id = ? WHERE id = ?`, [body.name, body.owner, body.address, body.city, body.state_id, body.country, body.pin, body.ship_name, body.ship_add, body.ship_city, body.ship_state_id, body.ship_country, body.ship_pin, body.gst_no, body.code, body.contact_no1, body.contact_no2, body.desc, body.contact_nature_id, body.inq_src_id, body.industry_id, body.machine_id, body.consump, body.email, body.competitor1, body.competitor2, body.class_ud, body.created_by_user_id, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${CustomerDao.tableName} WHERE id = ?;`, [id]);
	}

	async findByNameAndCode(name: string, code: string): Promise<CustomerResDto | null> {
		const [row] = await this.conn.query(`SELECT * FROM ${CustomerDao.tableName} WHERE name = ? OR code = ?; `, [name, code]);
		if (!row)
			return null;
		return row as CustomerResDto;
	}
}