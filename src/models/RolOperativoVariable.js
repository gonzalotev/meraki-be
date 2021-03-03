const toNumber = require('lodash/toNumber');
const get = require('lodash/get');
const {PAGE_SIZE} = process.env;
const ModelCreate = include('/helpers/modelCreate');
const name = 'RolOperativoVariable';
const tableName = 'RELACION_ROLES_OPERATIVOS_VARIABLES';
const selectableProps = [
    `${tableName}.ID_USUARIO`,
    `${tableName}.ID_ROL_USUARIO`,
    `${tableName}.ID_OPERATIVO`,
    `${tableName}.ID_LOTE`,
    `${tableName}.ID_VARIABLE`,
    `${tableName}.OBSERVACION`,
    `${tableName}.DOMINIO`,
    `${tableName}.SI_NO`,
    `${tableName}.FECHA_ALTA`,
    `${tableName}.FECHA_BAJA`
];

class RolOperativoVariable extends ModelCreate{
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

module.exports = knex => new RolOperativoVariable({knex});
