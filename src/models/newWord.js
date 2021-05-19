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
        return await this.knex.select({
            id: 'ID_OPERATIVO',
            description: 'DESCRIPCION'
        })
            .from('OPERATIVOS')
            .whereExists(function() {
                this.select('*').from('NUEVAS_PALABRAS')
                    .whereRaw('operativos.id_operativo = nuevas_palabras.id_operativo');
            });
    }
    async getVariables(operative){
        return await this.knex.select({
            id: 'ID_VARIABLE',
            name: 'NOMBRE'
        })
            .from('VARIABLES_ESTADISTICAS')
            .whereExists(function() {
                this.select('*').from('NUEVAS_PALABRAS')
                    .whereRaw('NUEVAS_PALABRAS.ID_VARIABLE = VARIABLES_ESTADISTICAS.ID_VARIABLE')
                    .andWhere('ID_OPERATIVO', operative);
            });
    }
}

module.exports = knex => new NewWord({ knex });
