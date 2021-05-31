const { wordsDictionary } = include('models');
const { dateToString } = include('util');

class WordsDictionaryService {
    static async fetch() {
        const words = await wordsDictionary.find({FECHA_BAJA: null});
        return words.map(words => ({
            word: words.PALABRA,
            truncate: words.TRUNCADO,
            acronim: words.ACRONIMO,
            verb: !!words.VERBO,
            noun: !!words.SUSTANTIVO,
            adjective: !!words.ADJETIVO,
            adverb: !!words.ADVERBIO,
            pronoun: !!words.PRONOMBRE,
            article: !!words.ARTICULO,
            preposition: !!words.PREPOSICION,
            doubtWord: !!words.PALABRA_DUDOSA,
            observation: words.OBSERVACION,
            domain: words.DOMINIO,
            supervised: !!words.SUPERVISADO,
            hashFunction: words.FUNCION_DE_HASH,
            hash: words.HASH,
            createdAt: dateToString(words.FECHA_ALTA),
            userCreator: words.ID_USUARIO_ALTA,
            userDeleted: words.ID_USUARIO_BAJA,
            deletedAt: dateToString(words.FECHA_BAJA),
            genderId: words.ID_GENERO_NUMERO,
            numberId: words.ID_NUMERO,
            frequency: words.FRECUENCIA,
            abc: words.ABC,
            family: words.FAMILIA
        }));
    }

    static async create(params, userCreator) {
        const formattedWord = {
            PALABRA: params.word,
            TRUNCADO: params.truncate,
            ACRONIMO: params.acronim,
            VERBO: params.verb,
            SUSTANTIVO: params.noun,
            ADJETIVO: params.adjective,
            ADVERBIO: params.adverb,
            PRONOMBRE: params.pronoun,
            ARTICULO: params.article,
            PREPOSICION: params.preposition,
            PALABRA_DUDOSA: params.doubtWord,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised,
            FUNCION_DE_HASH: params.hashFunction,
            HASH: params.hash,
            FECHA_ALTA: new Date(),
            ID_USUARIO_ALTA: 1 || userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            ID_GENERO_NUMERO: params.genderId,
            ID_NUMERO: params.numberId,
            FRECUENCIA: params.frequency,
            ABC: params.abc,
            FAMILIA: params.family
        };
        const word = await wordsDictionary.insertOne(formattedWord);

        return {
            word: word.PALABRA,
            truncate: word.TRUNCADO,
            acronim: word.ACRONIMO,
            verb: !!word.VERBO,
            noun: !!word.SUSTANTIVO,
            adjective: !!word.ADJETIVO,
            adverb: !!word.ADVERBIO,
            pronoun: !!word.PRONOMBRE,
            article: !!word.ARTICULO,
            preposition: !!word.PREPOSICION,
            doubtWord: !!word.PALABRA_DUDOSA,
            observation: word.OBSERVACION,
            domain: word.DOMINIO,
            supervised: !!word.SUPERVISADO,
            hashFunction: word.FUNCION_DE_HASH,
            hash: word.HASH,
            createdAt: dateToString(word.FECHA_ALTA),
            userCreator: word.ID_USUARIO_ALTA,
            userDeleted: word.ID_USUARIO_BAJA,
            deletedAt: dateToString(word.FECHA_BAJA),
            genderId: word.ID_GENERO_NUMERO,
            numberId: word.ID_NUMERO,
            frequency: word.FRECUENCIA,
            abc: word.ABC,
            family: word.FAMILIA
        };
    }

    static async findOne(filters){
        const formattedFilters = {PALABRA: filters.word};
        const word = await wordsDictionary.findById(formattedFilters);
        return {
            word: word.PALABRA,
            truncate: word.TRUNCADO,
            acronim: word.ACRONIMO,
            verb: !!word.VERBO,
            noun: !!word.SUSTANTIVO,
            adjective: !!word.ADJETIVO,
            adverb: !!word.ADVERBIO,
            pronoun: !!word.PRONOMBRE,
            article: !!word.ARTICULO,
            preposition: !!word.PREPOSICION,
            doubtWord: !!word.PALABRA_DUDOSA,
            observation: word.OBSERVACION,
            domain: word.DOMINIO,
            supervised: !!word.SUPERVISADO,
            hashFunction: word.FUNCION_DE_HASH,
            hash: word.HASH,
            createdAt: dateToString(word.FECHA_ALTA),
            userCreator: word.ID_USUARIO_ALTA,
            userDeleted: word.ID_USUARIO_BAJA,
            deletedAt: dateToString(word.FECHA_BAJA),
            genderId: word.ID_GENERO_NUMERO,
            numberId: word.ID_NUMERO,
            frequency: word.FRECUENCIA,
            abc: word.ABC,
            family: word.FAMILIA
        };
    }

    static async findMatching(filters){
        const formattedFilters = {PALABRA: filters.word};
        const words = await wordsDictionary.findByMatch(formattedFilters);
        return words.map(words => ({
            word: words.PALABRA,
            truncate: words.TRUNCADO,
            acronim: words.ACRONIMO,
            verb: !!words.VERBO,
            noun: !!words.SUSTANTIVO,
            adjective: !!words.ADJETIVO,
            adverb: !!words.ADVERBIO,
            pronoun: !!words.PRONOMBRE,
            article: !!words.ARTICULO,
            preposition: !!words.PREPOSICION,
            doubtWord: !!words.PALABRA_DUDOSA,
            observation: words.OBSERVACION,
            domain: words.DOMINIO,
            supervised: !!words.SUPERVISADO,
            hashFunction: words.FUNCION_DE_HASH,
            hash: words.HASH,
            createdAt: dateToString(words.FECHA_ALTA),
            userCreator: words.ID_USUARIO_ALTA,
            userDeleted: words.ID_USUARIO_BAJA,
            deletedAt: dateToString(words.FECHA_BAJA),
            genderId: words.ID_GENERO_NUMERO,
            numberId: words.ID_NUMERO,
            frequency: words.FRECUENCIA,
            abc: words.ABC,
            family: words.FAMILIA
        }));
    }

    static async update(filters, params){
        const formattedWord = {
            PALABRA: params.word,
            TRUNCADO: params.truncate,
            ACRONIMO: params.acronim,
            VERBO: params.verb,
            SUSTANTIVO: params.noun,
            ADJETIVO: params.adjective,
            ADVERBIO: params.adverb,
            PRONOMBRE: params.pronoun,
            ARTICULO: params.article,
            PREPOSICION: params.preposition,
            PALABRA_DUDOSA: params.doubtWord,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.supervised,
            FUNCION_DE_HASH: params.hashFunction,
            HASH: params.hash,
            ID_GENERO_NUMERO: params.genderId,
            ID_NUMERO: params.numberId,
            FRECUENCIA: params.frequency,
            ABC: params.abc,
            FAMILIA: params.family
        };
        const formattedFilters = {PALABRA: filters.word};
        const word = await wordsDictionary.updateOne(formattedFilters, formattedWord);
        return {
            word: word.PALABRA,
            truncate: word.TRUNCADO,
            acronim: word.ACRONIMO,
            verb: !!word.VERBO,
            noun: !!word.SUSTANTIVO,
            adjective: !!word.ADJETIVO,
            adverb: !!word.ADVERBIO,
            pronoun: !!word.PRONOMBRE,
            article: !!word.ARTICULO,
            preposition: !!word.PREPOSICION,
            doubtWord: !!word.PALABRA_DUDOSA,
            observation: word.OBSERVACION,
            domain: word.DOMINIO,
            supervised: !!word.SUPERVISADO,
            hashFunction: word.FUNCION_DE_HASH,
            hash: word.HASH,
            createdAt: dateToString(word.FECHA_ALTA),
            userCreator: word.ID_USUARIO_ALTA,
            userDeleted: word.ID_USUARIO_BAJA,
            deletedAt: dateToString(word.FECHA_BAJA),
            genderId: word.ID_GENERO_NUMERO,
            numberId: word.ID_NUMERO,
            frequency: word.FRECUENCIA,
            abc: word.ABC,
            family: word.FAMILIA
        };
    }

    static async delete(filters, userDeleted){
        const success = await wordsDictionary.deleteOne({PALABRA: filters.word}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = WordsDictionaryService;
