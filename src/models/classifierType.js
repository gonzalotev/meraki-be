const ModelCreate = include('helpers/modelCreate');
const {classifierTypeAttrib, classifierTypeTableName} = include('constants');
const name = 'classifierType';

class ClassifierType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: classifierTypeAttrib,
            tableName: classifierTypeTableName
        });
    }
}

module.exports = knex => new ClassifierType({ knex });
