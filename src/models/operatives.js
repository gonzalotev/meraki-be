const ModelCreate = include('helpers/modelCreate');
const {operativesTableName, operativesAttrib} = include('constants');
const name = 'operatives';

class Operatives extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: operativesTableName,
            selectableProps: operativesAttrib
        });
    }
    async findWords(operatives) {
        return await this.knex.select(['DESCRIPCION'])
            .from(this.tableName)
            .whereIn('DESCRIPCION', operatives)
            .pluck('DESCRIPCION')
            .timeout(this.timeout);
    }
}

module.exports = knex => new Operatives({knex});
