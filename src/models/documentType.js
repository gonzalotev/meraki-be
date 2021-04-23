const ModelCreate = include('helpers/modelCreate');
const {documentTypeAttrib, documentTypeTableName} = include('constants');
const name = 'documentType';

class DocumentType extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: documentTypeAttrib,
            tableName: documentTypeTableName
        });
    }
}

module.exports = knex => new DocumentType({ knex });
