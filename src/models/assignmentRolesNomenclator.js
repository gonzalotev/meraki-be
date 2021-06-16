const ModelCreate = include('helpers/modelCreate');
const {assignmentRoleNomenclatorsAttrib, assignmentRoleNomenclatorsTableName} = include('constants');
const name = 'assignmentRolesNomenclator';

class AssignmentRolesNomenclator extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: assignmentRoleNomenclatorsAttrib,
            tableName: assignmentRoleNomenclatorsTableName
        });
    }
}

module.exports = knex => new AssignmentRolesNomenclator({ knex });
