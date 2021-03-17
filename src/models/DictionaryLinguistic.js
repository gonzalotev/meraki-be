const ModelCreate = include('helpers/modelCreate');
const name = 'DictionaryLinguistic';
const tableName = 'DICCIONARIO_LINGUISTICO';
const selectableProps = [
    'DESCRIPCION_ORIGINAL',
    'ID_TIPOLOGIA_DE_DICCIONARIO',
    'ID_VARIABLE',
    'DESCRIPCION_DESTINO',
    'OBSERVACION',
    'DOMINIO',
    'SUPERVISADO',
    'ID_USUARIO_ALTA',
    'FECHA_ALTA',
    'FECHA_BAJA',
    'ID_USUARIO_BAJA'
];

class DictionaryLinguistic extends ModelCreate {
    constructor(props) {
        super({ ...props, name, tableName, selectableProps });
    }
}

module.exports = knex => new DictionaryLinguistic({ knex });
