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
    async findWords(words) {
        return await this.knex.select(['DESCRIPCION'])
            .from(this.tableName)
            .whereIn('DESCRIPCION', words)
            .pluck('DESCRIPCION')
            .timeout(this.timeout);
    }
}

module.exports = knex => new Operatives({knex});
