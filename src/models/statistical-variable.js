const ModelCreate = include('/helpers/modelCreate');
const name = 'StatisticalVariable';
const tableName = 'VARIABLES_ESTADISTICAS';
const selectableProps = {
    userCreator: 'ID_USUARIO',
    varibleId: 'ID_VARIABLE',
    name: 'NOMBRE',
    domain: 'DOMINIO',
    observation: 'OBSERVACION',
    createdAt: 'FECHA_ALTA'
};

class StatisticalsVariables extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName,
            name,
            selectableProps
        });
    }
}

module.exports = knex => new StatisticalsVariables({knex});
