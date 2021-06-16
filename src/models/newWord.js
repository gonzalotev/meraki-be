const ModelCreate = include('helpers/modelCreate');
const {newWordAttrib, newWordTableName} = include('constants');
const name = 'newWord';

class NewWord extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: newWordAttrib,
            tableName: newWordTableName
        });
    }
    async getOperatives(){
        const availableOperatives = await this.knex('NUEVAS_PALABRAS')
            .distinct('ID_OPERATIVO')
            .where({CORREGIDA: null})
            .pluck('ID_OPERATIVO');

        return await this.knex.select({
            id: 'ID_OPERATIVO',
            description: 'DESCRIPCION'
        })
            .from('OPERATIVOS')
            .whereIn('ID_OPERATIVO', availableOperatives);
    }
    async getVariables(operative){
        const availableVariables = await this.knex('NUEVAS_PALABRAS')
            .distinct('ID_VARIABLE')
            .where({CORREGIDA: null, ID_OPERATIVO: operative})
            .pluck('ID_VARIABLE');

        return await this.knex.select({
            id: 'ID_VARIABLE',
            name: 'NOMBRE'
        })
            .from('VARIABLES_ESTADISTICAS')
            .whereIn('ID_VARIABLE', availableVariables);
    }
}

module.exports = knex => new NewWord({ knex });
