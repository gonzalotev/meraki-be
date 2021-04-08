const ModelCreate = include('helpers/modelCreate');
const {documentTypeTableName, documentTypeAttrib} = include('constants');
const name = 'documentType';

class DocumentType extends ModelCreate{
    constructor(props){
        super({
            ...props,
            name,
            tableName: documentTypeTableName,
            selectableProps: documentTypeAttrib
        });
    }
}

module.exports = knex => new DocumentType({knex});
