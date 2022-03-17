const ModelCreate = include('helpers/modelCreate');
const {documentsAttrib, documentsTableName} = include('constants');
const name = 'documents';
const { getOffset, getPageSize } = include('util');
const head = require('lodash/head');

class Documents extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: documentsAttrib,
            tableName: documentsTableName
        });
    }
    fetchByPageAndTerm(page, valueToSearch, filters={}) {
        return this.knex.select(this.selectableProps)
            .from(this.tableName)
            .where('TITULO', 'like', `${valueToSearch}%`)
            .andWhere(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy([{column: 'TITULO', order: 'asc'}])
            .timeout(this.timeout);
    }
    async countTotal (filters = {}, search) {
        return head(await this.knex(this.tableName)
            .count({ total: '*' })
            .where('TITULO', 'like', `${search}%`)
            .andWhere(filters)
            .timeout(this.timeout));
    }
}

module.exports = knex => new Documents({ knex });
