const toNumber = require('lodash/toNumber');
const get = require('lodash/get');
const {PAGE_SIZE} = process.env;
const ModelCreate = include('/helpers/modelCreate');
const name = 'Operativos';
const tableName = 'OPERATIVOS';
const selectableProps = [
    `${tableName}.ID_OPERATIVO`,
    `${tableName}.ID_FUENTE`,
    `${tableName}.DESCRIPCION`,
    `${tableName}.OBSERVACION`,
    `${tableName}.DOMINIO`,
    `${tableName}.FECHA_LLEGADA_OPERATIVO`,
    `${tableName}.TOTAL_REGISTROS_OPERATIVO`,
    `${tableName}.CONTACTO_OPERATIVO`,
    `${tableName}.MAIL_CONTACTO`,
    `${tableName}.FECHA_INICIO_CODIFICACION`,
    `${tableName}.FECHA_FIN_CODIFICACION`,
    `${tableName}.FECHA_INICIO_ENTREGA`,
    `${tableName}.FECHA_INICIO_BORRADO`,
    `${tableName}.FECHA_FIN_BORRADO`,
    `${tableName}.CALIDAD_TOTAL_OPERATIVO`,
    `${tableName}.NIVEL_ERROR_OPERATIVO`,
    `${tableName}.ID_USUARIO`,
    `${tableName}.FECHA_ALTA`
];

class Operativos extends ModelCreate{
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
            .orderBy([{ column: 'ID_OPERATIVO', order: 'desc' }])
            .offset(PAGE_SIZE * toNumber(skip));
    }
    async countRows (filters = {}) {
        const result = await this.knex(this.tableName).count().where(filters).timeout(this.timeout);
        const count = get(result, '[0].COUNT(*)');
        return count;
    }
}

module.exports = knex => new Operativos({knex});
