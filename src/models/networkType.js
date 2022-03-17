const ModelCreate = include('helpers/modelCreate');
const {networkTypeAttrib, networkTypeTableName} = include('constants');
const name = 'networkType';
const { getOffset, getPageSize } = include('util');
const head = require('lodash/head');

class NetworkType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: networkTypeAttrib,
            tableName: networkTypeTableName
        });
    }
    fetchByPageAndTerm(page, valueToSearch, filters={}) {
        return this.knex.select(this.selectableProps)
            .from(this.tableName)
            .where('DESCRIPCION', 'like', `${valueToSearch}%`)
            .andWhere(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy([{column: 'DESCRIPCION', order: 'asc'}])
            .timeout(this.timeout);
    }
    async countTotal (filters = {}, search) {
        return head(await this.knex(this.tableName)
            .count({ total: '*' })
            .where('DESCRIPCION', 'like', `${search}%`)
            .andWhere(filters)
            .timeout(this.timeout));
    }
}

module.exports = knex => new NetworkType({ knex });
