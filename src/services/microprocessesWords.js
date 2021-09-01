const { microprocessesWords: microprocessesWordsModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const map = require('lodash/map');
const trim = require('lodash/trim');

class MicroprocessesWordService {
    static async fetch({ page, search }) {
        const orderBy = [{ column: 'ID_MICROPROCESO', order: 'asc' }, { column: 'ID_ORDEN ', order: 'asc' }];
        const filterBy = {};
        const columnsToSelect = microprocessesWordsModel.selectableProps;
        let microprocessesWordss = [];
        console.log(microprocessesWordss);
        if (page && search) {
            microprocessesWordss = await microprocessesWordsModel.findByMatch(
                page,
                search,
                ['ID_MICROPROCESO'],
                filterBy,
                orderBy
            );
        } else if (page) {
            microprocessesWordss = await microprocessesWordsModel.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            microprocessesWordss = await microprocessesWordsModel.find(
                filterBy, columnsToSelect, orderBy);
        }
        microprocessesWordss = microprocessesWordss.map(microprocessesWord => ({
            idMicroprocess: microprocessesWord.ID_MICROPROCESO,
            idOrder: microprocessesWord.ID_ORDEN,
            wordOrPhrase: microprocessesWord.PALABRA_O_FRASE,
            isWordOrPhrase: microprocessesWord.ES_PALABRA_O_FRASE,
            observation: microprocessesWord.OBSERVACION,
            domain: microprocessesWord.DOMINIO,
            approved: microprocessesWord.SUPERVISADO,
            userCreator: microprocessesWord.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesWord.FECHA_ALTA)

        }));

        return microprocessesWordss;
    }

    static async create(params, userCreator) {
        const formattedMicroprocessesWord = {
            ID_MICROPROCESO: params.idMicroprocess,
            ID_ORDEN: params.idOrder,
            PALABRA_O_FRASE: trim(params.wordOrPhrase),
            ES_PALABRA_O_FRASE: params.isWordOrPhrase,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };

        const microprocessId = await microprocessesWordsModel.insertOne(
            formattedMicroprocessesWord, ['ID_MICROPROCESO', 'ID_ORDEN']);
        const microprocess = await MicroprocessesWordService.findOne(
            { idMicroprocess: microprocessId.ID_MICROPROCESO, idOrder: microprocessId.ID_ORDEN });
        return microprocess;
    }

    static async findOne(filters) {
        const microprocessesWord = await microprocessesWordsModel.findById(
            { ID_MICROPROCESO: filters.idMicroprocess, ID_ORDEN: filters.idOrder });
        return {
            idMicroprocess: microprocessesWord.ID_MICROPROCESO,
            idOrder: microprocessesWord.ID_ORDEN,
            wordOrPhrase: microprocessesWord.PALABRA_O_FRASE,
            isWordOrPhrase: microprocessesWord.ES_PALABRA_O_FRASE,
            observation: microprocessesWord.OBSERVACION,
            domain: microprocessesWord.DOMINIO,
            approved: !!microprocessesWord.SUPERVISADO,
            userCreator: microprocessesWord.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesWord.FECHA_ALTA)
        };
    }

    static async update(filters, params, userCreator) {
        const formattedMicroprocessesWord = {
            ID_MICROPROCESO: params.idMicroprocess,
            ID_ORDEN: params.idOrder,
            PALABRA_O_FRASE: trim(params.wordOrPhrase),
            ES_PALABRA_O_FRASE: params.isWordOrPhrase,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const microprocessId = await microprocessesWordsModel.updateOne(
            { ID_MICROPROCESO: filters.idMicroprocess, ID_ORDEN: filters.idOrder },
            formattedMicroprocessesWord, ['ID_MICROPROCESO', 'ID_ORDEN']);
        const microprocess = await MicroprocessesWordService.findOne(
            { idMicroprocess: microprocessId.ID_MICROPROCESO, idOrder: microprocessId.ID_ORDEN });
        return microprocess;
    }

    static async delete(filters) {
        const formattedFilters = { ID_MICROPROCESO: filters.idMicroprocess, ID_ORDEN: filters.idOrder };
        const success = await microprocessesWordsModel.deleteOne(formattedFilters, null);
        return !!success;
    }

    static async getTotal({ microprocessesWord }) {
        let result;
        if (microprocessesWord) {
            result = await microprocessesWordsModel.countTotal({ ID_MICROPROCESO: microprocessesWord });
        } else {
            result = await microprocessesWordsModel.countTotal();
        }
        return result.total;
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_MICROPROCESO',
                    nameInFile: 'ID MICROPROCESO'
                },
                {
                    nameInTable: 'ID_ORDEN',
                    nameInFile: 'ORDEN'
                },
                {
                    nameInTable: 'PALABRA_O_FRASE',
                    nameInFile: 'PALABRA/FRASE'
                },
                {
                    nameInTable: 'ES_PALABRA_O_FRASE',
                    nameInFile: 'Es PALABRA O FRASE'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACION'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                },
                {
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
                }
            ];
            const tableHeaders = map(fieldNames, field => field.nameInTable);
            const fileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = microprocessesWordsModel.knex.select(tableHeaders)
                .from(microprocessesWordsModel.tableName)
                .orderBy([{column: 'ID_MICROPROCESO', order: 'asc'}])
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                csvString += arrayToCsvFormat(data);
            });
            stream.on('end', function() {
                resolve(csvString);
            });
        });
    }
}

module.exports = MicroprocessesWordService;