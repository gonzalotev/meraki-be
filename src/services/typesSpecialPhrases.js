const knex = include('helpers/database');
const { dateToString } = include('util');
const {typesSpecialPhrasesTableName} = include('constants');
const {typesSpecialPhrases} = include('models');

class TypeSpecialPhrasesService {
    static async fetch() {
        const typesSpecialPhrases = await knex.select()
            .from(typesSpecialPhrasesTableName);
        return typesSpecialPhrases.map(typeSpecialPrase => ({
            id: typeSpecialPrase.ID_TIPO_FRASE_ESPECIAL,
            description: typeSpecialPrase.DESCRIPCION,
            observation: typeSpecialPrase.OBSERVACION,
            domain: typeSpecialPrase.DOMINIO,
            createdAt: dateToString(typeSpecialPrase.FECHA_ALTA),
            userCreator: typeSpecialPrase.ID_USUARIO_ALTA,
            userDeleted: typeSpecialPrase.ID_USUARIO_BAJA,
            deletedAt: dateToString(typeSpecialPrase.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedTypeSpecialPhrase = {
            ID_TIPO_FRASE_ESPECIAL: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const typeSpecialPrase = await typesSpecialPhrases.insertOne(formattedTypeSpecialPhrase);

        return {
            id: typeSpecialPrase.ID_TIPO_FRASE_ESPECIAL,
            description: typeSpecialPrase.DESCRIPCION,
            observation: typeSpecialPrase.OBSERVACION,
            domain: typeSpecialPrase.DOMINIO,
            userCreator: typeSpecialPrase.ID_USUARIO_ALTA,
            userDelete: typeSpecialPrase.ID_USUARIO_BAJA,
            deletedAt: typeSpecialPrase.FECHA_BAJA,
            createdAt: typeSpecialPrase.FECHA_ALTA
        };
    }
}

module.exports = TypeSpecialPhrasesService;
