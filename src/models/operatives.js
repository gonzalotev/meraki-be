const toNumber = require('lodash/toNumber');
const get = require('lodash/get');
const {PAGE_SIZE} = process.env;
const ModelCreate = include('/helpers/modelCreate');
const {operativesTableName, operativesAttrib} = include('constants');
const name = 'operatives';

class Operatives extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            selectableProps: operativesAttrib,
            tableName: operativesTableName
        });
    }

    find(skip, filter = {}, columns = this.selectableProps) {
        return this.knex.select(columns)
            .from(this.tableName)
            .where(filter)
            .limit(PAGE_SIZE)
            .orderBy([{ column: 'ID_OPERATIVO', order: 'desc' }])
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

module.exports = knex => new Operatives({knex});
