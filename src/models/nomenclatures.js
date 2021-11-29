const ModelCreate = include('helpers/modelCreate');
const {nomenclaturesAttrib, nomenclaturesTableName} = include('constants');
const name = 'nomenclatures';
const { getOffset, getPageSize } = include('util');
const head = require('lodash/head');

class Nomenclatures extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: nomenclaturesAttrib,
            tableName: nomenclaturesTableName
        });
    }
    fetchByPageAndTerm(page, valueToSearch, filters={}) {
        return this.knex.select(this.selectableProps)
            .from(this.tableName)
            .where('ABREVIATURA', 'like', `${valueToSearch}%`)
            .andWhere(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy([{column: 'ABREVIATURA', order: 'asc'}])
            .timeout(this.timeout);
    }
    async countTotal (filters = {}, search) {
        return head(await this.knex(this.tableName)
            .count({ total: '*' })
            .where('ABREVIATURA', 'like', `${search}%`)
            .andWhere(filters)
            .timeout(this.timeout));
    }
}

module.exports = knex => new Nomenclatures({ knex });
