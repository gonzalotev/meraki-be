const { microprocessesListsIfWords: microprocessesListsIfWordsModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const uniq = require('lodash/uniq');
const find = require('lodash/find');

class MicroprocessesListsIfWordService {
    /* static async fetch() {
        const microprocessesListsIfWords = await microprocessesListsIfWordsModel.find();
        return microprocessesListsIfWords.map(microprocessesListsIfWord => ({
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
    } */

    static async fetch({page, source}) {
        let words=[];
        if(page && source) {
            words = await microprocessesListsIfWordsModel.findByPage(
                page,
                {ID_LISTAS: source},
                microprocessesListsIfWordsModel.selectableProps,
                [{column: 'ID_LISTAS', order: 'asc'}, {column: 'ID_ORDEN ', order: 'asc'}]
            );
        } else if(page){
            words = await microprocessesListsIfWordsModel.findByPage(
                page,
                {},
                microprocessesListsIfWordsModel.selectableProps,
                [{column: 'ID_LISTAS', order: 'asc'}, {column: 'ID_ORDEN ', order: 'asc'}]
            );
        } else {
            words = await microprocessesListsIfWordsModel.find();
        }
        words = words.map(microprocessesListsIfWord => ({
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
        /* await OperativeSourcesService.getSourceData(relations);
        await QuestionsService.getQuestionData(relations);
        await StaticalVariableService.getVariableData(relations);
        await NomenclatorsService.getNomenclatorData(relations);
        await QuestionsTypeService.getQuestionTypeData(relations); */
        return words;
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

        const microprocessId = await microprocessesListsIfWordsModel.insertOne(formattedMicroprocessesListsIfWord, ['ID_LISTAS', 'ID_ORDEN']);
        const microprocess = await MicroprocessesListsIfWordService.findOne({ idLists: microprocessId.ID_LISTAS, idOrder: microprocessId.ID_ORDEN });
        return microprocess;
    }

    static async findOne(filters) {
        const microprocessesListsIfWord = await microprocessesListsIfWordsModel.findById({ ID_LISTAS: filters.idLists, ID_ORDEN: filters.idOrder });
        return {
            idLists: microprocessesListsIfWord.ID_LISTAS,
            idOrder: microprocessesListsIfWord.ID_ORDEN,
            wordOrPhrase: microprocessesListsIfWord.PALABRA_O_FRASE,
            isWordOrPhrase: microprocessesListsIfWord.ES_PALABRA_O_FRASE,
            observation: microprocessesListsIfWord.OBSERVACION,
            domain: microprocessesListsIfWord.DOMINIO,            
            approved: !!microprocessesListsIfWord.SUPERVISADO,
            userCreator: microprocessesListsIfWord.ID_USUARIO_ALTA,
            createdAt: dateToString(microprocessesListsIfWord.FECHA_ALTA),            
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
        const microprocessId = await microprocessesListsIfWordsModel.updateOne({ ID_LISTAS: filters.idLists, ID_ORDEN: filters.idOrder },
            formattedMicroprocessesListsIfWord, ['ID_LISTAS', 'ID_ORDEN']);
        const microprocess = await MicroprocessesListsIfWordService.findOne({ idLists: microprocessId.ID_LISTAS, idOrder: microprocessId.ID_ORDEN });
        return microprocess;
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_LISTAS: filters.idLists, ID_ORDEN: filters.idOrder };
        const success = await microprocessesListsIfWordsModel.deleteOne(formattedFilters, null);
        return !!success;
    }

    /* static async getEncodingProcessesData(resources){
        console.log(resources);
        const encodingProcessIds = uniq(map(resources, resource => resource.encodingProcessId));
        let encodingProcesses = await encodingProcessesModel.knex.select()
            .from(encodingProcessesModel.tableName)
            .whereIn('ID_PROCESO_CODIFICACION', encodingProcessIds);
        encodingProcesses = map(encodingProcesses, encodingProcess => ({
            id: encodingProcess.ID_PROCESO_CODIFICACION,
            name: encodingProcess.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.encodingProcess =
            find(encodingProcesses, source => source.id === resource.encodingProcessId);
            return resource;
        });
    } */
}

module.exports = MicroprocessesListsIfWordService;