const ModelCreate = include('helpers/modelCreate');
const {autoPhrasesAttrib, autoPhrasesTableName} = include('constants');
const name = 'autoPhrase';
const { getOffset, getPageSize } = include('util');
const head = require('lodash/head');

class AutoPhrase extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: autoPhrasesAttrib,
            tableName: autoPhrasesTableName
        });
    }
    fetchByPageAndTerm(page, valueToSearch, filters={}) {
        return this.knex.select(this.selectableProps)
            .from(this.tableName)
            .where('FRASE_FINAL', 'like', `${valueToSearch}%`)
            .andWhere(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy([{column: 'FRASE_FINAL', order: 'asc'}])
            .timeout(this.timeout);
    }
    async countTotal (filters = {}, search) {
        return head(await this.knex(this.tableName)
            .count({ total: '*' })
            .where('FRASE_FINAL', 'like', `${search}%`)
            .andWhere(filters)
            .timeout(this.timeout));
    }
}

module.exports = knex => new AutoPhrase({ knex });
