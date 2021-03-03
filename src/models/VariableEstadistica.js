const toNumber = require('lodash/toNumber');
const get = require('lodash/get');
const {PAGE_SIZE} = process.env;
const ModelCreate = include('/helpers/modelCreate');
const name = 'VariableEstadistica';
const tableName = 'VARIABLES_ESTADISTICAS';
const selectableProps = [
    `${tableName}.ID_VARIABLE`,
    `${tableName}.NOMBRE`,
    `${tableName}.ABREVIATURA`,
    `${tableName}.DIGITOS`,
    `${tableName}.SUPERVISADO`,
    `${tableName}.DOMINIO`,
    `${tableName}.OBSERVACION`,
    `${tableName}.ID_PADRE`,
    `${tableName}.ID_USUARIO`,
    `${tableName}.FECHA_ALTA`
];

class VariableEstadistica extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName,
            name,
            selectableProps
        });
    }

    find(skip, filter = {}, columns = this.selectableProps) {
        return this.knex.select(columns)
            .from(this.tableName)
            .where(filter)
            .limit(PAGE_SIZE)
            .orderBy([{ column: 'FECHA_ALTA', order: 'desc' }])
            .offset(PAGE_SIZE * toNumber(skip));
    }
    async countRows (filters = {}) {
        const result = await this.knex(this.tableName).count().where(filters).timeout(this.timeout);
        const count = get(result, '[0].COUNT(*)');
        return count;
    }
}

module.exports = knex => new VariableEstadistica({knex});
