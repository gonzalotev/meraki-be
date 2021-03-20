const ModelCreate = include('/helpers/modelCreate');
const name = 'VariableStadistics';
const tableName = 'VARIABLES_ESTADISTICAS';
const selectableProps = {
    id: 'ID_VARIABLE',
    name: 'NOMBRE',
    abbreviation: 'ABREVIATURA',
    domain: 'DOMINIO',
    observation: 'OBSERVACION'
};
const handleProps = {
    createdAt: 'FECHA_ALTA',
    userCreator: 'ID_USUARIO'
};

class VariableStadistics extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName,
            name,
            selectableProps,
            handleProps
        });
    }
}

module.exports = knex => new VariableStadistics({knex});
