const ModelCreate = include('helpers/modelCreate');
const {typesSpecialPhrasesTableName, typesSpecialPhrasesAttrib} = include('constants');
const name = 'typesSpecialPhrases';

const handleProps = {
    createdAt: 'FECHA_ALTA',
    deletedAt: 'FECHA_BAJA',
    userCreator: 'ID_USUARIO_ALTA',
    userDestroyer: 'ID_USUARIO_BAJA'
};

class TypesSpecialPhrases extends ModelCreate {
    constructor(props) {
        super({
            ...props,
            name,
            tableName: typesSpecialPhrasesTableName,
            selectableProps: typesSpecialPhrasesAttrib,
            handleProps
        });
    }
}

module.exports = knex => new TypesSpecialPhrases({ knex });
