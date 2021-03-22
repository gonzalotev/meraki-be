const ModelCreate = include('/helpers/modelCreate');
const {datesAttrib, assignmentRoleNomenclatorsTableName, assignmentRoleNomenclatorsAttrib} = include('constants');
const name = 'roleNomenclator';

class RoleNomenclator extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName: assignmentRoleNomenclatorsTableName,
            name,
            selectableProps: assignmentRoleNomenclatorsAttrib,
            handleProps: datesAttrib
        });
    }
}

module.exports = knex => new RoleNomenclator({knex});
