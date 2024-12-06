export class SqlHelper {

    public static putSelects(wheres: string[]): string {
        let sql = "SELECT";
        for (let i = 0; i < wheres.length; i++) {
            if (i === 0) {
                sql += " " + wheres[i];
            } else {
                sql += ", " + wheres[i];
            }
        }
        return sql;
    }

    public static putOrderBys(orderBys: string[]): string {
        if (!orderBys || orderBys.length === 0) {
            return "";
        }

        let sql = " ORDER BY ";
        for (let i = 0; i < orderBys.length; i++) {
            if (i === 0) {
                sql += " " + orderBys[i];
            } else {
                sql += ", " + orderBys[i];
            }
        }
        return sql;
    }

    public static putFrom(from: string, sql: string): string {
        return sql.trim() + " FROM " + from.trim();
    }

    public static putGroupBys(groupBys: string[], sql: string): string {
        let index = 0;
        while (index < groupBys.length) {
            const groupBy = groupBys[index];

            if (index === 0) {
                sql += " GROUP BY " + groupBy;
            } else {
                sql += " , " + groupBy;
            }

            index++;
        }
        return sql;
    }

    public static putWheres(wheres: string[], sql: string): string {
        let index = 0;
        while (index < wheres.length) {
            const where = wheres[index];

            if (index === 0) {
                sql += " WHERE " + where;
            } else {
                sql += " AND " + where;
            }

            index++;
        }
        return sql;
    }

    public static putHavings(havings: string[], sql: string): string {
        let index = 0;
        while (index < havings.length) {
            const having = havings[index];

            if (index === 0) {
                sql += " HAVING " + having;
            } else {
                sql += " AND " + having;
            }

            index++;
        }
        return sql;
    }

    public static putOrderBysWithSql(orderBys: string[], sql: string): string {
        let index = 0;
        while (index < orderBys.length) {
            const orderBy = orderBys[index];

            if (index === 0) {
                sql += " ORDER BY " + orderBy;
            } else {
                sql += ", " + orderBy;
            }

            index++;
        }
        return sql;
    }

    public static putWhereTrial(sql: string, wheresString: string | null): string {
        if (!wheresString || wheresString.trim() === "") {
            return sql;
        } else {
            return sql + " WHERE " + wheresString;
        }
    }

    public static putAnd(conditions: string[]): string {
        let sql = "";
        let index = 0;
        while (index < conditions.length) {
            const condition = conditions[index];

            if (index === 0) {
                sql = condition;
            } else {
                sql += " AND " + condition;
            }

            index++;
        }
        return sql === "" ? "" : "(" + sql + ")";
    }

    public static putOr(conditions: string[]): string {
        let sql = "";
        let index = 0;
        while (index < conditions.length) {
            const condition = conditions[index];

            if (index === 0) {
                sql = condition;
            } else {
                sql += " OR " + condition;
            }

            index++;
        }
        return sql === "" ? "" : "(" + sql + ")";
    }

    public static getCsv(integers: number[]): string {
        let csv = "";
        let count = 0;
        for (const integer of integers) {
            if (count === 0) {
                csv += String(integer);
            } else {
                csv += ", " + String(integer);
            }
            count++;
        }

        return csv;
    }

    public static escape(str: string): string {
        str = str.replace(/'/g, "''");
        str = str.replace(/\\/g, "\\\\");
        return str;
    }
}  