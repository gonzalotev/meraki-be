const { wordsDictionary } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class WordsDictionaryService {
    static async fetch({ page, search }) {
        const orderBy = [{ column: 'PALABRA', order: 'asc' }];
        const filterBy = { FECHA_BAJA: null };
        const columnsToSelect = wordsDictionary.selectableProps;
        let words = [];
        if (page && search) {
            words = await wordsDictionary.findByMatch(
                page,
                search,
                ['PALABRA'],
                filterBy,
                orderBy
            );
        } else if (page) {
            words = await wordsDictionary.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            words = await wordsDictionary.find(filterBy, columnsToSelect, orderBy);
        }

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
            FAMILIA: trim(params.family)
        };
        const wordId = await wordsDictionary.insertOne(formattedWord, ['PALABRA']);
        const word = await WordsDictionaryService.findOne({ word: wordId });
        return word;
    }

    static async findOne(filters) {
        const formattedFilters = { PALABRA: filters.word };
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

    static async findMatching(filters) {
        const formattedFilters = { PALABRA: filters.word, FECHA_BAJA: null };
        const matchWords = await wordsDictionary.findByMatch(formattedFilters);
        return matchWords.map(words => ({
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

    static async update(filters, params) {
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
        const wordId = await wordsDictionary.updateOne({ PALABRA: filters.word }, formattedWord, ['PALABRA']);
        const word = await WordsDictionaryService.findOne({ word: wordId });
        return word;
    }

    static async delete(filters) {
        const success = await wordsDictionary.delete({ PALABRA: filters.word });
        return !!success;
    }

    static async checkIfAllWordsExist(words) {
        const wordsFound = await wordsDictionary.findWords(words);
        return { wordsFound };
    }

    static async getTotal({ search }) {
        const { total } = await wordsDictionary.countTotal({ FECHA_BAJA: null }, search, ['PALABRA']);
        return total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = wordsDictionary.knex.select(columns)
                .from(wordsDictionary.tableName)
                .where({ FECHA_BAJA: null })
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                worksheet.addRow(data);
            });
            stream.on('end', function () {
                resolve(worksheet);
            });
        });
    }

    static getColumns() {
        return [
            {
                original: 'PALABRA',
                modified: 'PALABRA'
            },
            {
                original: 'TRUNCADO',
                modified: 'TRUNCADO'
            },
            {
                original: 'ACRONIMO',
                modified: 'ACRÓNIMO'
            },
            {
                original: 'VERBO',
                modified: 'VERBO'
            },
            {
                original: 'SUSTANTIVO',
                modified: 'SUSTANTIVO'
            },
            {
                original: 'ADJETIVO',
                modified: 'ADJETIVO'
            },
            {
                original: 'ADVERBIO',
                modified: 'ADVERBIO'
            },
            {
                original: 'PRONOMBRE',
                modified: 'PRONOMBRE'
            },
            {
                original: 'ARTICULO',
                modified: 'ARTÍCULO'
            },
            {
                original: 'PREPOSICION',
                modified: 'PREPOSICIÓN'
            },
            {
                original: 'PALABRA_DUDOSA',
                modified: 'PALABRA DUDOSA'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            },
            {
                original: 'ID_GENERO_NUMERO',
                modified: 'ID GENERO Y NÚMERO'
            },
            {
                original: 'ID_NUMERO',
                modified: 'ID NUMERO'
            },
            {
                original: 'FRECUENCIA',
                modified: 'FRECUENCIA'
            },
            {
                original: 'ABC',
                modified: 'CURVA ABC'
            },
            {
                original: 'FAMILIA',
                modified: 'FAMILIA'
            }
        ];
    }
}

module.exports = WordsDictionaryService;
