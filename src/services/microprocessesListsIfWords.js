const { microprocessesListsIfWords: microprocessesListsIfWordsModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class MicroprocessesListsIfWordService {
    static async fetch({ page, search }) {
        const orderBy = [{ column: 'ID_LISTAS', order: 'asc' }, { column: 'ID_ORDEN ', order: 'asc' }];
        const filterBy = {};
        const columnsToSelect = microprocessesListsIfWordsModel.selectableProps;
        let microprocessesListsIfWordss = [];
        console.log(microprocessesListsIfWordss);
        if (page && search) {
            microprocessesListsIfWordss = await microprocessesListsIfWordsModel.findByMatch(
                page,
                search,
                ['ID_LISTAS'],
                filterBy,
                orderBy
            );
        } else if (page) {
            microprocessesListsIfWordss = await microprocessesListsIfWordsModel.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            microprocessesListsIfWordss = await microprocessesListsIfWordsModel.find(
                filterBy, columnsToSelect, orderBy);
        }
        microprocessesListsIfWordss = microprocessesListsIfWordss.map(microprocessesListsIfWord => ({
            idLists: microprocessesListsIfWord.ID_LISTAS,
            idOrder: microprocessesListsIfWord.ID_ORDEN,
            wordOrPhrase: microprocessesListsIfWord.PALABRA_O_FRASE,
            isWordOrPhrase: microprocessesListsIfWord.ES_PALABRA_O_FRASE,
            observation: microprocessesListsIfWord.OBSERVACION,
            domain: microprocessesListsIfWord.DOMINIO,
            approved: microprocessesListsIfWord.SUPERVISADO,
            userCreator: microprocessesListsIfWord.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesListsIfWord.FECHA_ALTA)

        }));

        return microprocessesListsIfWordss;
    }

    static async create(params, userCreator) {
        const formattedMicroprocessesListsIfWord = {
            ID_LISTAS: params.idLists,
            ID_ORDEN: params.idOrder,
            PALABRA_O_FRASE: trim(params.wordOrPhrase),
            ES_PALABRA_O_FRASE: params.isWordOrPhrase,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };

        const microprocessId = await microprocessesListsIfWordsModel.insertOne(
            formattedMicroprocessesListsIfWord, ['ID_LISTAS', 'ID_ORDEN']);
        const microprocess = await MicroprocessesListsIfWordService.findOne(
            { idLists: microprocessId.ID_LISTAS, idOrder: microprocessId.ID_ORDEN });
        return microprocess;
    }

    static async findOne(filters) {
        const microprocessesListsIfWord = await microprocessesListsIfWordsModel.findById(
            { ID_LISTAS: filters.idLists, ID_ORDEN: filters.idOrder });
        return {
            idLists: microprocessesListsIfWord.ID_LISTAS,
            idOrder: microprocessesListsIfWord.ID_ORDEN,
            wordOrPhrase: microprocessesListsIfWord.PALABRA_O_FRASE,
            isWordOrPhrase: microprocessesListsIfWord.ES_PALABRA_O_FRASE,
            observation: microprocessesListsIfWord.OBSERVACION,
            domain: microprocessesListsIfWord.DOMINIO,
            approved: !!microprocessesListsIfWord.SUPERVISADO,
            userCreator: microprocessesListsIfWord.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesListsIfWord.FECHA_ALTA)
        };
    }

    static async update(filters, params, userCreator) {
        const formattedMicroprocessesListsIfWord = {
            ID_LISTAS: params.idLists,
            ID_ORDEN: params.idOrder,
            PALABRA_O_FRASE: trim(params.wordOrPhrase),
            ES_PALABRA_O_FRASE: params.isWordOrPhrase,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const microprocessId = await microprocessesListsIfWordsModel.updateOne(
            { ID_LISTAS: filters.idLists, ID_ORDEN: filters.idOrder },
            formattedMicroprocessesListsIfWord, ['ID_LISTAS', 'ID_ORDEN']);
        const microprocess = await MicroprocessesListsIfWordService.findOne(
            { idLists: microprocessId.ID_LISTAS, idOrder: microprocessId.ID_ORDEN });
        return microprocess;
    }

    static async delete(filters) {
        const formattedFilters = { ID_LISTAS: filters.idLists, ID_ORDEN: filters.idOrder };
        const success = await microprocessesListsIfWordsModel.deleteOne(formattedFilters, null);
        return !!success;
    }

    static async getTotal({ microprocessesListsIfWord }) {
        let result;
        if (microprocessesListsIfWord) {
            result = await microprocessesListsIfWordsModel.countTotal({ ID_LISTAS: microprocessesListsIfWord });
        } else {
            result = await microprocessesListsIfWordsModel.countTotal();
        }
        return result.total;
    }
}

module.exports = MicroprocessesListsIfWordService;
