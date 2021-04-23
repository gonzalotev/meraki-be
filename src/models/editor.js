const ModelCreate = include('helpers/modelCreate');
const {editorAttrib, editorTableName} = include('constants');
const name = 'editor';

class Editor extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            selectableProps: editorAttrib,
            tableName: editorTableName
        });
    }
}

module.exports = knex => new Editor({ knex });
