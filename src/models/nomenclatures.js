const ModelCreate = include('helpers/modelCreate');
const {nomenclaturesAttrib, nomenclaturesTableName} = include('constants');
const name = 'nomenclatures';

class Nomenclatures extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: nomenclaturesAttrib,
            tableName: nomenclaturesTableName
        });
    }
}

module.exports = knex => new Nomenclatures({ knex });
