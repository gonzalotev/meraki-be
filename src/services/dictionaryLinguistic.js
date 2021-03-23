const { dictionaryLinguistic } = include('models');
const { dateToString } = include('util');

class DictionaryLinguisticService {
    static async find() {
        const dictionaries = await dictionaryLinguistic.find();

        return dictionaries.map(dictionary => ({
            originalDescription: dictionary.DESCRIPCION_ORIGINAL,
            typologyDictionaryId: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: dictionary.ID_VARIABLE,
            destinationDescription: dictionary.DESCRIPCION_DESTINO,
            observation: dictionary.OBSERVACION,
            domain: dictionary.DOMINIO,
            approved: dictionary.SUPERVISADO,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        }));
    }
    static create(props, userCreator){
        const dictionary = dictionaryLinguistic.insertOne({ ...props, ID_USUARIO_ALTA: userCreator });
        return {
            originalDescription: dictionary.DESCRIPCION_ORIGINAL,
            typologyDictionaryId: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: dictionary.ID_VARIABLE,
            destinationDescription: dictionary.DESCRIPCION_DESTINO,
            observation: dictionary.OBSERVACION,
            domain: dictionary.DOMINIO,
            approved: dictionary.SUPERVISADO,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        };
    }
    static update(props){
        const {
            originalDescription: DESCRIPCION_ORIGINAL,
            typologyDictionaryId: ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: ID_VARIABLE,
            ...propsToSave
        } = props;
        const id = {DESCRIPCION_ORIGINAL, ID_TIPOLOGIA_DE_DICCIONARIO, ID_VARIABLE};
        const dictionary = dictionaryLinguistic.updateOne(id, propsToSave);
        return {
            originalDescription: dictionary.DESCRIPCION_ORIGINAL,
            typologyDictionaryId: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: dictionary.ID_VARIABLE,
            destinationDescription: dictionary.DESCRIPCION_DESTINO,
            observation: dictionary.OBSERVACION,
            domain: dictionary.DOMINIO,
            approved: dictionary.SUPERVISADO,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        };
    }
    static async delete(props, userDestroyer){
        const {
            originalDescription: DESCRIPCION_ORIGINAL,
            typologyDictionaryId: ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: ID_VARIABLE
        } = props;
        const id = {DESCRIPCION_ORIGINAL, ID_TIPOLOGIA_DE_DICCIONARIO, ID_VARIABLE};
        const success = await dictionaryLinguistic.deleteOne(id, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDestroyer
        });
        return success;
    }
}

module.exports = DictionaryLinguisticService;
