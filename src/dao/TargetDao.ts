import { PoolConnection } from 'mariadb';
import TargetResDto from '../dto/res/TargetResDto';
import TargetReqDto from '../dto/req/TargetReqDto';
import { SqlHelper } from '../helper/SqlHelper';

export default class TargetDao {

	static readonly tableName = 'target';

	conn: PoolConnection;

	constructor(conn: PoolConnection) {
		this.conn = conn;
	}

	async getAll(): Promise<TargetResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${TargetDao.tableName}`);
		return rows;
	}

	async getOne(id: string): Promise<TargetResDto | null> {
		const row = await this.conn.query(`SELECT * FROM ${TargetDao.tableName} WHERE id = ?`, [id]);
		if (row.length === 0)
			return null;
		return row;
	}

	async create(body: TargetReqDto) {
		await this.conn.query(`INSERT INTO ${TargetDao.tableName} (user_id, from_month, from_yr, to_month, to_yr, amt, cnt_month, created_by_user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [body.user_id, body.from_month, body.from_yr, body.to_month, body.to_yr, body.amt, body.cnt_month, body.created_by_user_id]);
	}

	async updateOne(id: string, body: TargetReqDto) {
		await this.conn.query(`UPDATE ${TargetDao.tableName} SET user_id = ?, from_month = ?, from_yr = ?, to_month = ?, to_yr = ?, amt = ?, cnt_month = ?, created_by_user_id = ? WHERE id = ?`, [body.user_id, body.from_month, body.from_yr, body.to_month, body.to_yr, body.amt, body.cnt_month, body.created_by_user_id, id]);
	}

	async deleteOne(id: string) {
		await this.conn.query(`DELETE FROM ${TargetDao.tableName} WHERE id = ?`, [id]);
	}

	async getLdtos(
		userId: number | null,
		createdByUserId: number | null
	): Promise<TargetResDto[]> {
		let sql = ` SELECT
						id,
						(SELECT name FROM user WHERE user.id = user_id) as user_name,
						from_month,
						from_yr,
						to_month,
						to_yr,
						cnt_month,
						amt,
						(SELECT name FROM user WHERE user.id = created_by_user_id) as created_by_user_name,
						created_at
					FROM
						${TargetDao.tableName} `;

		let conditions: string[] = [];

		if (userId !== null && userId !== undefined) {
			conditions.push(`user_id = ${userId}`);
		}

		if (createdByUserId !== null && createdByUserId !== undefined){
			conditions.push(`created_by_user_id = ${createdByUserId}`);
		}

		sql = SqlHelper.putWhereTrial(sql, SqlHelper.putAnd(conditions));

		sql = sql + " ORDER BY user_id ASC, from_yr, from_month";

		const rows = await this.conn.query(sql);
		return rows as TargetResDto[];
	}

	async findByUserIdOrCreatedByUserId(user_id: string, created_by_user_id: string): Promise<TargetResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${TargetDao.tableName} WHERE user_id = ? OR created_by_user_id = ?`, [user_id, created_by_user_id]);
		return rows;
	}

	async findByUserIdAndCreatedByUserId(user_id: string, created_by_user_id: string): Promise<TargetResDto[]> {
		const rows = await this.conn.query(`SELECT * FROM ${TargetDao.tableName} WHERE user_id = ? AND created_by_user_id = ?`, [user_id, created_by_user_id]);
		return rows;
	}
}