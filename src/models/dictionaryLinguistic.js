const ModelCreate = include('helpers/modelCreate');
const {dictionaryLinguisticAttrib, dictionaryLinguisticTableName} = include('constants');
const name = 'dictionaryLinguistic';
const toNumber = require('lodash/toNumber');
const get = require('lodash/get');
const {PAGE_SIZE} = process.env;

class DictionaryLinguistic extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: dictionaryLinguisticAttrib,
            tableName: dictionaryLinguisticTableName
        });
    }

    find(skip, filter = {}, columns = this.selectableProps) {
        return this.knex
            .select(columns)
            .from(this.tableName)
            .where(filter)
            .limit(PAGE_SIZE)
            .orderBy([{ column: 'FECHA_ALTA', order: 'desc' }])
            .offset(PAGE_SIZE * toNumber(skip));
    }

    async countRows (filters = {}) {
        const result = await this.knex(this.tableName)
            .count()
            .where(filters)
            .timeout(this.timeout);
        return get(result, '[0].COUNT(*)');
    }
}

module.exports = knex => new DictionaryLinguistic({ knex });
