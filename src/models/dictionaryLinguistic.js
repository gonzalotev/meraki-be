const ModelCreate = include('helpers/modelCreate');
const {dictionaryLinguisticAttrib, dictionaryLinguisticTableName} = include('constants');
const name = 'dictionaryLinguistic';
const {getOffset, getPageSize} = include('util');
const head = require('lodash/head');

class DictionaryLinguistic extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: dictionaryLinguisticAttrib,
            tableName: dictionaryLinguisticTableName
        });
    }
    fetchByPageAndTerm(page, valueToSearch, filters={}) {
        return this.knex.select(this.selectableProps)
            .from(this.tableName)
            .where('DESCRIPCION_ORIGINAL', 'like', `${valueToSearch}%`)
            .andWhere(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy([{column: 'DESCRIPCION_ORIGINAL', order: 'asc'}])
            .timeout(this.timeout);
    }
    async countTotal (filters = {}, search) {
        return head(await this.knex(this.tableName)
            .count({ total: '*' })
            .where('DESCRIPCION_ORIGINAL', 'like', `${search}%`)
            .andWhere(filters)
            .timeout(this.timeout));
    }
}

module.exports = knex => new DictionaryLinguistic({ knex });
