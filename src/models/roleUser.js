const ModelCreate = include('/helpers/modelCreate');
const {datesAttrib, roleSiCITableName, rolesSiCIAttrib} = include('constants');
const name = 'roleUser';

class RoleUser extends ModelCreate{
    constructor(props){
        super({
            ...props,
            tableName: roleSiCITableName,
            name,
            selectableProps: rolesSiCIAttrib,
            handleProps: datesAttrib
        });
    }
}

module.exports = knex => new RoleUser({knex});
