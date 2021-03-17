const knex = include('helpers/database');
const { dateToString, getOffset, getPageSize } = include('util');
const tableName = 'DICCIONARIO_LINGUISTICO';

class DictionaryLinguisticService {
    static async find(page) {
        const dictionaryLinguistic = await knex.select()
            .from(tableName)
            .limit(getPageSize())
            .offset(getOffset(page));

        return dictionaryLinguistic.map(dictionary => ({
            original_description: dictionary.DESCRIPCION_ORIGINAL,
            id_tipology_dictionary: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            id_variable: dictionary.ID_VARIABLE,
            destination_description: dictionary.DESCRIPCION_DESTINO,
            observation: dictionary.OBSERVACION,
            domain: dictionary.OBSERVACION,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        }));
    }
}

module.exports = DictionaryLinguisticService;
