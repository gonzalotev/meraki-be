const ModelCreate = include('helpers/modelCreate');
const {documentsAttrib, documentsTableName} = include('constants');
const name = 'documents';

class Documents extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: documentsAttrib,
            tableName: documentsTableName
        });
    }
}

module.exports = knex => new Documents({ knex });
