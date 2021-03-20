const knex = include('helpers/database');
const { dateToString, getOffset, getPageSize } = include('util');
const { dictionaryLinguisticTableName } = include('constants');

class DictionaryLinguisticService {
    static async find(page) {
        const dictionaryLinguistic = await knex.select()
            .from(dictionaryLinguisticTableName)
            .limit(getPageSize())
            .offset(getOffset(page));

        return dictionaryLinguistic.map(dictionary => ({
            originalDescription: dictionary.DESCRIPCION_ORIGINAL,
            typologyDictionaryId: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: dictionary.ID_VARIABLE,
            destination_description: dictionary.DESCRIPCION_DESTINO,
            observation: dictionary.OBSERVACION,
            domain: dictionary.OBSERVACION,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        }));
    }
}

module.exports = DictionaryLinguisticService;
