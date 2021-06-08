const ModelCreate = include('helpers/modelCreate');
const {wordCorrectorAttrib, wordCorrectorTableName} = include('constants');
const name = 'wordCorrector';
const { getOffset, getPageSize } = include('util');
const head = require('lodash/head');

class WordCorrector extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: wordCorrectorAttrib,
            tableName: wordCorrectorTableName
        });
    }
    fetchByPageAndTerm(page, valueToSearch, filters={}) {
        return this.knex.select(this.selectableProps)
            .from(this.tableName)
            .where('CORRECTA', 'like', `${valueToSearch}%`)
            .andWhere(filters)
            .limit(getPageSize())
            .offset(getOffset(page))
            .orderBy([{column: 'CORRECTA', order: 'asc'}])
            .timeout(this.timeout);
    }
    async countTotal (filters = {}, search) {
        return head(await this.knex(this.tableName)
            .count({ total: '*' })
            .where('CORRECTA', 'like', `${search}%`)
            .andWhere(filters)
            .timeout(this.timeout));
    }
}

module.exports = knex => new WordCorrector({ knex });
